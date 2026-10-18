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
      const testIp = "203.0.113.42";
      const response = await request.post("/api/waitlist", {
        data: {
          email: `headers-test-${Date.now()}@example.com`,
        },
        headers: {
          "x-test-client-ip": testIp,
        },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect(lastRequest).toBeDefined();
      expect(lastRequest?.headers["x-waitlist-client-ip"]).toBe(testIp);
    });

    test("sends X-Waitlist-User-Agent header when browser provides user-agent", async ({ request }) => {
      const response = await request.post("/api/waitlist", {
        data: {
          email: `ua-test-${Date.now()}@example.com`,
        },
        headers: {
          "x-test-client-ip": "203.0.113.43",
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
          "x-test-client-ip": "203.0.113.50",
        },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect(lastRequest).toBeDefined();
      expect(lastRequest?.headers["x-waitlist-secret"]).toBe(MOCK_SECRET);
    });

    test("accepts valid IPv4 address", async ({ request }) => {
      const response = await request.post("/api/waitlist", {
        data: {
          email: `ipv4-test-${Date.now()}@example.com`,
        },
        headers: {
          "x-test-client-ip": "192.168.1.100",
        },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect(lastRequest?.headers["x-waitlist-client-ip"]).toBe("192.168.1.100");
    });

    test("accepts valid IPv6 address", async ({ request }) => {
      const response = await request.post("/api/waitlist", {
        data: {
          email: `ipv6-test-${Date.now()}@example.com`,
        },
        headers: {
          "x-test-client-ip": "2001:db8::1",
        },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect(lastRequest?.headers["x-waitlist-client-ip"]).toBe("2001:db8::1");
    });

    test("returns 400 for invalid client IP", async ({ request }) => {
      const response = await request.post("/api/waitlist", {
        data: {
          email: `invalid-ip-test-${Date.now()}@example.com`,
        },
        headers: {
          "x-test-client-ip": "not-an-ip",
        },
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.error).toBe("Missing or invalid client IP");
    });

    test("returns 400 when client IP header is empty", async ({ request }) => {
      // Pass empty x-test-client-ip to simulate missing IP
      const response = await request.post("/api/waitlist", {
        data: {
          email: `missing-ip-test-${Date.now()}@example.com`,
        },
        headers: {
          "x-test-client-ip": "",
        },
      });

      expect(response.status()).toBe(400);
      const body = await response.json();
      expect(body.error).toBe("Missing or invalid client IP");
    });
  });

  test.describe("Response Handling", () => {
    test("treats { ok: true } response as success", async ({ request }) => {
      await setMockResponse(200, { ok: true });

      const response = await request.post("/api/waitlist", {
        data: {
          email: `ok-true-${Date.now()}@example.com`,
        },
        headers: { "x-test-client-ip": "203.0.113.44" },
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
        headers: { "x-test-client-ip": "203.0.113.45" },
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
        headers: { "x-test-client-ip": "203.0.113.46" },
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
        headers: { "x-test-client-ip": "203.0.113.47" },
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
        headers: { "x-test-client-ip": "203.0.113.48" },
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
        headers: { "x-test-client-ip": "203.0.113.49" },
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
        headers: { "x-test-client-ip": "203.0.113.51" },
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
    test("handles duplicate email submission - backend returns 200 ok:true", async ({ request }) => {
      const duplicateEmail = `duplicate-${Date.now()}@example.com`;

      // First submission succeeds
      await setMockResponse(200, { ok: true });
      const first = await request.post("/api/waitlist", {
        data: { email: duplicateEmail },
        headers: { "x-test-client-ip": "203.0.113.10" },
      });
      expect(first.status()).toBe(200);
      const firstBody = await first.json();
      expect(firstBody.success).toBe(true);

      // Second submission - backend returns 200 ok:true for duplicate (updates existing record)
      await setMockResponse(200, { ok: true });
      const second = await request.post("/api/waitlist", {
        data: { email: duplicateEmail },
        headers: { "x-test-client-ip": "203.0.113.11" },
      });
      expect(second.status()).toBe(200);
      const secondBody = await second.json();
      expect(secondBody.success).toBe(true);
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
        headers: { "x-test-client-ip": "203.0.113.52" },
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
        headers: { "x-test-client-ip": "203.0.113.53" },
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
        headers: { "x-test-client-ip": "203.0.113.54" },
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
        headers: { "x-test-client-ip": "203.0.113.55" },
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
        headers: { "x-test-client-ip": "203.0.113.56" },
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

  test.describe("Control Character Handling", () => {
    test("strips disallowed control characters from fields before sending", async ({ request }) => {
      const response = await request.post("/api/waitlist", {
        data: {
          email: `control-chars-${Date.now()}@example.com`,
          role: "manager\x00with\x08nulls",
          headache: "Test\x0Bwith\x0Ccontrol\x1Fchars",
        },
        headers: { "x-test-client-ip": "203.0.113.60" },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect(lastRequest?.body.role).toBe("managerwithnulls");
      expect(lastRequest?.body.headache).toBe("Testwithcontrolchars");
    });

    test("allows tab, LF, and CR in fields", async ({ request }) => {
      const headacheWithAllowedChars = "Line 1\tTab\nLine 2\rCarriage return";
      const response = await request.post("/api/waitlist", {
        data: {
          email: `allowed-chars-${Date.now()}@example.com`,
          headache: headacheWithAllowedChars,
        },
        headers: { "x-test-client-ip": "203.0.113.61" },
      });

      expect(response.status()).toBe(200);

      const lastRequest = await getMockLastRequest();
      expect(lastRequest?.body.headache).toBe(headacheWithAllowedChars);
    });
  });
});
