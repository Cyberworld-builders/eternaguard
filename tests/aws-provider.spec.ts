import { test, expect } from "@playwright/test";
import { setMockResponse, resetMockResponse, clearMockRequests, getMockLastRequest } from "./aws-mock-server";

const MOCK_SECRET = "test-secret-for-playwright";

// Run tests serially to avoid mock server state conflicts
test.describe.configure({ mode: "serial" });

test.beforeEach(async () => {
  await clearMockRequests();
  await resetMockResponse();
});

test.describe("AWS Provider Integration", () => {
  test.describe("Request Headers", () => {
    test("sends X-Waitlist-Client-IP header from server-generated IP", async ({ request }) => {
      const response = await request.post("/api/waitlist", {
        data: {
          email: `headers-test-${Date.now()}@example.com`,
        },
        headers: {
          "x-test-client-ip": `test-ip-${Date.now()}`,
          "x-real-ip": "203.0.113.42",
        },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect(lastRequest).toBeDefined();
      expect(lastRequest?.headers["x-waitlist-client-ip"]).toBeDefined();
    });

    test("sends X-Waitlist-User-Agent header when browser provides user-agent", async ({ request }) => {
      const response = await request.post("/api/waitlist", {
        data: {
          email: `ua-test-${Date.now()}@example.com`,
        },
        headers: {
          "x-test-client-ip": `test-ip-${Date.now()}`,
        },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect(lastRequest).toBeDefined();
      // Playwright's request API sends its own user-agent; verify it's forwarded
      expect(lastRequest?.headers["x-waitlist-user-agent"]).toBeDefined();
      expect(typeof lastRequest?.headers["x-waitlist-user-agent"]).toBe("string");
      expect((lastRequest?.headers["x-waitlist-user-agent"] as string).length).toBeGreaterThan(0);
    });

    test("sends x-waitlist-secret authentication header", async ({ request }) => {
      const response = await request.post("/api/waitlist", {
        data: {
          email: `secret-test-${Date.now()}@example.com`,
        },
        headers: {
          "x-test-client-ip": `test-ip-${Date.now()}`,
        },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect(lastRequest).toBeDefined();
      expect(lastRequest?.headers["x-waitlist-secret"]).toBe(MOCK_SECRET);
    });
  });

  test.describe("Response Handling", () => {
    test("treats { ok: true } response as success", async ({ request }) => {
      await setMockResponse(200, { ok: true });

      const response = await request.post("/api/waitlist", {
        data: {
          email: `ok-true-${Date.now()}@example.com`,
        },
        headers: { "x-test-client-ip": `test-ip-${Date.now()}` },
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
    });

    test("treats 200 without { ok: true } as failure", async ({ request }) => {
      await setMockResponse(200, { status: "pending" }); // No ok: true

      const response = await request.post("/api/waitlist", {
        data: {
          email: `no-ok-${Date.now()}@example.com`,
        },
        headers: { "x-test-client-ip": `test-ip-${Date.now()}` },
      });

      expect(response.status()).toBe(500);
      const body = await response.json();
      expect(body.success).toBeUndefined();
      expect(body.error).toBeDefined();
    });
  });

  test.describe("Error Propagation", () => {
    test("propagates 400 Bad Request with error message", async ({ request }) => {
      await setMockResponse(400, { error: "Invalid email format" });

      const response = await request.post("/api/waitlist", {
        data: {
          email: `bad-request-${Date.now()}@example.com`,
        },
        headers: { "x-test-client-ip": `test-ip-${Date.now()}` },
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.error).toBe("Invalid email format");
    });

    test("propagates 429 Too Many Requests with Retry-After", async ({ request }) => {
      await setMockResponse(429, { error: "Rate limit exceeded" }, 60);

      const response = await request.post("/api/waitlist", {
        data: {
          email: `rate-limit-${Date.now()}@example.com`,
        },
        headers: { "x-test-client-ip": `test-ip-${Date.now()}` },
      });

      expect(response.status()).toBe(429);
      expect(response.headers()["retry-after"]).toBe("60");
      const body = await response.json();
      expect(body.error).toBe("Rate limit exceeded");
    });

    test("propagates 503 Service Unavailable", async ({ request }) => {
      await setMockResponse(503, { error: "DynamoDB throttling" });

      const response = await request.post("/api/waitlist", {
        data: {
          email: `unavailable-${Date.now()}@example.com`,
        },
        headers: { "x-test-client-ip": `test-ip-${Date.now()}` },
      });

      expect(response.status()).toBe(503);
      const body = await response.json();
      expect(body.error).toBe("DynamoDB throttling");
    });

    test("429 response is never treated as success", async ({ request }) => {
      await setMockResponse(429, { error: "Rate limit exceeded" });

      const response = await request.post("/api/waitlist", {
        data: {
          email: `rate-not-success-${Date.now()}@example.com`,
        },
        headers: { "x-test-client-ip": `test-ip-${Date.now()}` },
      });

      // Must be 429, not 200
      expect(response.status()).toBe(429);
      const body = await response.json();
      // Must have error, not success
      expect(body.success).toBeUndefined();
      expect(body.error).toBeDefined();
    });
  });

  test.describe("Consent Handling", () => {
    test("never sends consent: true (no checkbox on form)", async ({ request }) => {
      const response = await request.post("/api/waitlist", {
        data: {
          email: `consent-false-${Date.now()}@example.com`,
          consent: true, // Client sends true, but server should override
          consent_text_version: "v1",
        },
        headers: { "x-test-client-ip": `test-ip-${Date.now()}` },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect(lastRequest).toBeDefined();
      // Server must enforce consent is falsy (false or absent) regardless of client input
      // Per contract: "send consent false/absent"
      expect(lastRequest?.body.consent).not.toBe(true);
      // consent_text_version should not be sent when consent is falsy
      expect(lastRequest?.body.consent_text_version).toBeFalsy();
    });
  });

  test.describe("Duplicate Submission Handling", () => {
    test("handles duplicate email submission based on backend response", async ({ request }) => {
      const duplicateEmail = `duplicate-${Date.now()}@example.com`;

      // First submission succeeds
      await setMockResponse(200, { ok: true });
      const first = await request.post("/api/waitlist", {
        data: { email: duplicateEmail },
        headers: { "x-test-client-ip": `test-ip-first-${Date.now()}` },
      });
      expect(first.status()).toBe(200);

      // Second submission - backend returns 400 for duplicate
      await setMockResponse(400, { error: "Email already registered" });
      const second = await request.post("/api/waitlist", {
        data: { email: duplicateEmail },
        headers: { "x-test-client-ip": `test-ip-second-${Date.now()}` },
      });
      expect(second.status()).toBe(400);
      const body = await second.json();
      expect(body.error).toBe("Email already registered");
    });
  });

  test.describe("Field Limits", () => {
    test("accepts headache up to 2000 characters", async ({ request }) => {
      const longHeadache = "x".repeat(2000);

      const response = await request.post("/api/waitlist", {
        data: {
          email: `headache-limit-${Date.now()}@example.com`,
          headache: longHeadache,
        },
        headers: { "x-test-client-ip": `test-ip-${Date.now()}` },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect(lastRequest?.body.headache).toBe(longHeadache);
    });

    test("truncates headache beyond 2000 characters", async ({ request }) => {
      const extraLongHeadache = "x".repeat(2500);

      const response = await request.post("/api/waitlist", {
        data: {
          email: `headache-truncate-${Date.now()}@example.com`,
          headache: extraLongHeadache,
        },
        headers: { "x-test-client-ip": `test-ip-${Date.now()}` },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect((lastRequest?.body.headache as string)?.length).toBe(2000);
    });

    test("accepts UTM values up to 200 characters", async ({ request }) => {
      const longUtm = "y".repeat(200);

      const response = await request.post("/api/waitlist", {
        data: {
          email: `utm-limit-${Date.now()}@example.com`,
          utm_source: longUtm,
          utm_medium: longUtm,
          utm_campaign: longUtm,
        },
        headers: { "x-test-client-ip": `test-ip-${Date.now()}` },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect(lastRequest?.body.utm_source).toBe(longUtm);
      expect(lastRequest?.body.utm_medium).toBe(longUtm);
      expect(lastRequest?.body.utm_campaign).toBe(longUtm);
    });

    test("truncates UTM values beyond 200 characters", async ({ request }) => {
      const extraLongUtm = "y".repeat(300);

      const response = await request.post("/api/waitlist", {
        data: {
          email: `utm-truncate-${Date.now()}@example.com`,
          utm_source: extraLongUtm,
        },
        headers: { "x-test-client-ip": `test-ip-${Date.now()}` },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect((lastRequest?.body.utm_source as string)?.length).toBe(200);
    });
  });

  test.describe("Metadata Fields", () => {
    test("forwards all metadata fields to backend", async ({ request }) => {
      const response = await request.post("/api/waitlist", {
        data: {
          email: `metadata-${Date.now()}@example.com`,
          role: "cemetery_manager",
          organization: "Test Cemetery Inc.",
          region: "Texas",
          headache: "Tracking pre-need payments",
          source_page: "/contracts",
          utm_source: "google",
          utm_medium: "cpc",
          utm_campaign: "cemetery-software",
        },
        headers: { "x-test-client-ip": `test-ip-${Date.now()}` },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect(lastRequest?.body.role).toBe("cemetery_manager");
      expect(lastRequest?.body.organization).toBe("Test Cemetery Inc.");
      expect(lastRequest?.body.region).toBe("Texas");
      expect(lastRequest?.body.headache).toBe("Tracking pre-need payments");
      expect(lastRequest?.body.source_page).toBe("/contracts");
      expect(lastRequest?.body.utm_source).toBe("google");
      expect(lastRequest?.body.utm_medium).toBe("cpc");
      expect(lastRequest?.body.utm_campaign).toBe("cemetery-software");
    });
  });
});
