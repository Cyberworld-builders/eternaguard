import { test, expect } from "@playwright/test";

const PAGES = [
  { path: "/", title: "EternaGuard - Cemetery Contract Management Software", hasWaitlist: true },
  { path: "/contracts", title: "Cemetery Contract & Pre-Need Management Software | EternaGuard", hasWaitlist: true },
  { path: "/work-orders", title: "Cemetery Work Orders & Maintenance Software | EternaGuard", hasWaitlist: true },
  { path: "/mapping", title: "Cemetery Mapping & Grave Finding Software | EternaGuard", hasWaitlist: true },
  { path: "/ai-cemetery", title: "AI-Powered Cemetery Management Software | EternaGuard", hasWaitlist: true },
];

// Generate unique test IP to avoid rate limiting across tests
let testIpCounter = 0;
function getUniqueTestIp(): string {
  testIpCounter++;
  return `test-${Date.now()}-${testIpCounter}`;
}

test.describe("Landing Pages", () => {
  for (const page of PAGES) {
    test(`${page.path} renders correctly`, async ({ page: p }) => {
      await p.goto(page.path);
      await expect(p).toHaveTitle(page.title);
      
      // Check navigation
      await expect(p.locator("header")).toBeVisible();
      await expect(p.locator("footer")).toBeVisible();
      
      // Check CTA
      if (page.hasWaitlist) {
        await expect(p.locator("#waitlist")).toBeVisible();
      }
    });
  }
});

test.describe("SEO & Meta Tags", () => {
  for (const page of PAGES) {
    test(`${page.path} has correct meta tags`, async ({ page: p }) => {
      await p.goto(page.path);
      
      // Check title
      const title = await p.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);
      
      // Check meta description
      const description = await p.locator('meta[name="description"]').getAttribute("content");
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(50);
      
      // Check canonical URL
      const canonical = await p.locator('link[rel="canonical"]').getAttribute("href");
      expect(canonical).toContain("eternaguard.cyberworldbuilders.com");
      
      // Check Open Graph tags
      const ogTitle = await p.locator('meta[property="og:title"]').getAttribute("content");
      expect(ogTitle).toBeTruthy();
      
      const ogDescription = await p.locator('meta[property="og:description"]').getAttribute("content");
      expect(ogDescription).toBeTruthy();
      
      const ogUrl = await p.locator('meta[property="og:url"]').getAttribute("content");
      expect(ogUrl).toBeTruthy();
    });
    
    test(`${page.path} has JSON-LD structured data`, async ({ page: p }) => {
      await p.goto(page.path);
      
      const jsonLdScripts = await p.locator('script[type="application/ld+json"]').all();
      expect(jsonLdScripts.length).toBeGreaterThan(0);
      
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        const data = JSON.parse(content!);
        expect(data["@context"]).toBe("https://schema.org");
        expect(data["@type"]).toBeTruthy();
      }
    });
  }
});

test.describe("Sitemap & Robots", () => {
  test("sitemap.xml is accessible", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
    
    const content = await page.content();
    expect(content).toContain("urlset");
    expect(content).toContain("eternaguard.cyberworldbuilders.com");
    
    // Check all main pages are in sitemap
    for (const p of PAGES) {
      expect(content).toContain(p.path === "/" ? "eternaguard.cyberworldbuilders.com</loc>" : p.path);
    }
  });
  
  test("robots.txt is accessible", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
    
    const content = await page.content();
    expect(content).toContain("User-Agent");
    expect(content).toContain("Sitemap");
    expect(content).toContain("/demo/");
  });
});

test.describe("Demo Pages (noindex)", () => {
  const DEMO_PAGES = ["/demo", "/demo/mockups", "/demo/cms-dashboard", "/demo/crm-dashboard"];
  
  for (const path of DEMO_PAGES) {
    test(`${path} has noindex`, async ({ page }) => {
      await page.goto(path);
      
      const robots = await page.locator('meta[name="robots"]').getAttribute("content");
      expect(robots).toContain("noindex");
    });
  }
});

test.describe("Waitlist Form", () => {
  test("validates email correctly", async ({ page }) => {
    await page.goto("/");
    await page.locator("#waitlist").scrollIntoViewIfNeeded();
    
    // Find email input
    const emailInput = page.locator('#waitlist-email');
    const submitButton = page.locator('#waitlist button[type="submit"]');
    
    // Empty submission should fail (HTML5 validation)
    await expect(emailInput).toBeVisible();
    
    // Invalid email
    await emailInput.fill("notanemail");
    await submitButton.click();
    
    // Check for error or HTML5 validation
    const hasError = await page.locator('#waitlist').getByText(/valid email|Please enter/).isVisible().catch(() => false);
    const hasValidationMessage = await emailInput.evaluate((el) => {
      return (el as HTMLInputElement).validationMessage.length > 0;
    });
    expect(hasError || hasValidationMessage).toBe(true);
  });
  
  test("honeypot field exists for spam protection", async ({ page }) => {
    await page.goto("/");
    await page.locator("#waitlist").scrollIntoViewIfNeeded();
    
    // Honeypot should exist in the DOM but be invisible via CSS
    const honeypot = page.locator('input[name="website"]');
    await expect(honeypot).toHaveCount(1);
    
    // It should be hidden from view (positioned off-screen)
    const box = await honeypot.boundingBox();
    expect(box === null || box.x < 0).toBe(true);
  });
  
  test("form submits with valid data", async ({ page }) => {
    await page.goto("/");
    await page.locator("#waitlist").scrollIntoViewIfNeeded();
    
    // Fill form with a unique email to avoid rate limits
    const uniqueEmail = `test-${Date.now()}@example.com`;
    await page.locator('#waitlist-email').fill(uniqueEmail);
    await page.locator('#waitlist-role').selectOption("cemetery_manager");
    await page.locator('#waitlist-org').fill("Test Cemetery");
    await page.locator('#waitlist-region').fill("Texas");
    await page.locator('#waitlist-headache').fill("Tracking pre-need payments");
    
    // Submit
    await page.locator('#waitlist button[type="submit"]').click();
    
    // Wait for success message (dev mode logs but returns success)
    const success = await page.getByText("on the list").waitFor({ timeout: 5000 }).then(() => true).catch(() => false);
    expect(success).toBe(true);
  });
});

test.describe("API", () => {
  test("waitlist API validates input", async ({ request }) => {
    const testIp = getUniqueTestIp();
    const headers = { "x-test-client-ip": testIp };
    
    // Missing email
    const noEmail = await request.post("/api/waitlist", {
      data: { role: "cemetery_manager" },
      headers,
    });
    expect(noEmail.status()).toBe(400);
    
    // Invalid email
    const invalidEmail = await request.post("/api/waitlist", {
      data: { email: "notanemail" },
      headers,
    });
    expect(invalidEmail.status()).toBe(400);
    
    // Honeypot filled (bot) - should return 200 (fake success to not tip off bot)
    const honeypot = await request.post("/api/waitlist", {
      data: { email: "test@example.com", website: "http://spam.com" },
      headers,
    });
    expect(honeypot.status()).toBe(200);
    const honeypotBody = await honeypot.json();
    expect(honeypotBody.success).toBe(true);
  });
  
  test("waitlist API accepts valid submission", async ({ request }) => {
    const testIp = getUniqueTestIp();
    
    const response = await request.post("/api/waitlist", {
      data: {
        email: `api-test-${Date.now()}@example.com`,
        role: "cemetery_manager",
        organization: "Test Cemetery",
        region: "Texas",
        headache: "Tracking pre-need payments"
      },
      headers: { "x-test-client-ip": testIp },
    });
    
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.success).toBe(true);
  });
  
  test("waitlist API rate limits repeated requests", async ({ request }) => {
    const testIp = getUniqueTestIp();
    const headers = { "x-test-client-ip": testIp };
    
    // Make multiple requests quickly from the same "IP"
    const requests = [];
    for (let i = 0; i < 10; i++) {
      requests.push(
        request.post("/api/waitlist", {
          data: { email: `ratelimit-test-${i}@example.com` },
          headers,
        })
      );
    }
    
    const responses = await Promise.all(requests);
    const rateLimited = responses.filter((r) => r.status() === 429);
    expect(rateLimited.length).toBeGreaterThan(0);
  });
});

test.describe("Screenshots", () => {
  test("capture desktop screenshots", async ({ page }) => {
    for (const p of PAGES) {
      await page.goto(p.path);
      await page.waitForLoadState("networkidle");
      
      const name = p.path === "/" ? "home" : p.path.replace(/\//g, "-").slice(1);
      await page.screenshot({
        path: `screenshots/desktop-${name}.png`,
        fullPage: true
      });
    }
  });
});

test.describe("Mobile Screenshots", () => {
  test("capture mobile screenshots", async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 812 }
    });
    const page = await context.newPage();
    
    for (const p of PAGES) {
      await page.goto(p.path);
      await page.waitForLoadState("networkidle");
      
      const name = p.path === "/" ? "home" : p.path.replace(/\//g, "-").slice(1);
      await page.screenshot({
        path: `screenshots/mobile-${name}.png`,
        fullPage: true
      });
    }
    
    await context.close();
  });
});
