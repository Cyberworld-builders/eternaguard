import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: "npx tsx tests/start-mock-server.ts",
      url: "http://localhost:3099/__control/get-requests",
      reuseExistingServer: !process.env.CI,
      timeout: 10000,
    },
    {
      command: "npm run start",
      url: "http://localhost:3000",
      reuseExistingServer: !process.env.CI,
      timeout: 120000,
      env: {
        WAITLIST_AWS_URL: "http://localhost:3099/waitlist",
        WAITLIST_AWS_SECRET: "test-secret-for-playwright",
      },
    },
  ],
  outputDir: "test-results",
});
