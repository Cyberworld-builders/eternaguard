import { createServer, IncomingMessage, ServerResponse } from "http";
import { isIP } from "node:net";

interface CapturedRequest {
  method: string;
  url: string;
  headers: Record<string, string | string[] | undefined>;
  body: Record<string, unknown>;
  timestamp: number;
}

function hasDisallowedControlChars(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return /[\x00-\x08\x0B\x0C\x0E-\x1F]/.test(value);
}

export class AwsMockServer {
  private server: ReturnType<typeof createServer> | null = null;
  private port: number;
  private requests: CapturedRequest[] = [];
  private responseStatus = 200;
  private responseBody: Record<string, unknown> = { ok: true };
  private retryAfter: number | null = null;

  constructor(port = 3099) {
    this.port = port;
  }

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", () => {
          // Handle control endpoints
          if (req.url === "/__control/set-response" && req.method === "POST") {
            try {
              const config = JSON.parse(body);
              this.responseStatus = config.status ?? 200;
              this.responseBody = config.body ?? { ok: true };
              this.retryAfter = config.retryAfter ?? null;
              res.statusCode = 200;
              res.end(JSON.stringify({ ok: true }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
            return;
          }

          if (req.url === "/__control/reset" && req.method === "POST") {
            this.responseStatus = 200;
            this.responseBody = { ok: true };
            this.retryAfter = null;
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true }));
            return;
          }

          if (req.url === "/__control/clear-requests" && req.method === "POST") {
            this.requests = [];
            res.statusCode = 200;
            res.end(JSON.stringify({ ok: true }));
            return;
          }

          if (req.url === "/__control/get-requests" && req.method === "GET") {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(this.requests));
            return;
          }

          if (req.url === "/__control/get-last-request" && req.method === "GET") {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(this.requests[this.requests.length - 1] ?? null));
            return;
          }

          // Handle waitlist endpoint
          let parsedBody: Record<string, unknown> = {};
          try {
            parsedBody = JSON.parse(body);
          } catch {
            // Body might not be JSON
          }

          // Validate X-Waitlist-Client-IP header (required and must be valid IP)
          const clientIpHeader = req.headers["x-waitlist-client-ip"];
          const clientIp = Array.isArray(clientIpHeader) ? clientIpHeader[0] : clientIpHeader;
          if (!clientIp || !isIP(clientIp)) {
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Missing or invalid client IP" }));
            return;
          }

          // Validate that fields don't contain disallowed control characters
          const fieldsToValidate = ["role", "organization", "region", "headache", "source_page", "utm_source", "utm_medium", "utm_campaign"];
          for (const field of fieldsToValidate) {
            if (hasDisallowedControlChars(parsedBody[field])) {
              res.setHeader("Content-Type", "application/json");
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "Invalid signup" }));
              return;
            }
          }

          this.requests.push({
            method: req.method || "UNKNOWN",
            url: req.url || "/",
            headers: req.headers as Record<string, string | string[] | undefined>,
            body: parsedBody,
            timestamp: Date.now(),
          });

          if (this.retryAfter !== null && this.responseStatus === 429) {
            res.setHeader("Retry-After", String(this.retryAfter));
          }
          res.setHeader("Content-Type", "application/json");
          res.statusCode = this.responseStatus;
          res.end(JSON.stringify(this.responseBody));
        });
      });

      this.server.on("error", reject);
      this.server.listen(this.port, () => {
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve) => {
      if (this.server) {
        this.server.close(() => {
          this.server = null;
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  setResponse(status: number, body: Record<string, unknown>, retryAfter?: number): void {
    this.responseStatus = status;
    this.responseBody = body;
    this.retryAfter = retryAfter ?? null;
  }

  resetResponse(): void {
    this.responseStatus = 200;
    this.responseBody = { ok: true };
    this.retryAfter = null;
  }

  getRequests(): CapturedRequest[] {
    return [...this.requests];
  }

  getLastRequest(): CapturedRequest | undefined {
    return this.requests[this.requests.length - 1];
  }

  clearRequests(): void {
    this.requests = [];
  }

  getUrl(): string {
    return `http://localhost:${this.port}/waitlist`;
  }
}

// Helper functions to control mock server via HTTP from tests
export async function setMockResponse(status: number, body: Record<string, unknown>, retryAfter?: number): Promise<void> {
  await fetch("http://localhost:3099/__control/set-response", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status, body, retryAfter }),
  });
}

export async function resetMockResponse(): Promise<void> {
  await fetch("http://localhost:3099/__control/reset", { method: "POST" });
}

export async function clearMockRequests(): Promise<void> {
  await fetch("http://localhost:3099/__control/clear-requests", { method: "POST" });
}

export async function getMockLastRequest(): Promise<CapturedRequest | null> {
  const response = await fetch("http://localhost:3099/__control/get-last-request");
  return response.json();
}
