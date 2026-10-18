import { NextRequest, NextResponse } from "next/server";
import { isIP } from "node:net";

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

// NOTE: This in-memory rate limiter is per-instance. On Vercel, each serverless
// invocation gets its own Map, so the limit is not strictly enforced across
// concurrent instances. For stricter enforcement, use Redis or Vercel KV.
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  // Test IP header only allowed in non-production (for Playwright tests)
  const isProduction = process.env.VERCEL_ENV === "production";
  if (!isProduction) {
    const testIp = request.headers.get("x-test-client-ip");
    if (testIp) {
      return testIp;
    }
  }
  // Use Vercel's trusted client IP headers
  // x-real-ip is the client IP from Vercel's edge
  // x-forwarded-for first entry is also trusted when behind Vercel
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return ip;
}

interface ClientIpResult {
  ip: string | null;
  error?: string;
}

function getClientIp(request: NextRequest): ClientIpResult {
  // Test IP header only allowed in non-production (for Playwright tests)
  const isProduction = process.env.VERCEL_ENV === "production";
  if (!isProduction) {
    // Check if x-test-client-ip header is present (even if empty)
    const testIpHeader = request.headers.get("x-test-client-ip");
    if (testIpHeader !== null) {
      const trimmedTestIp = testIpHeader.trim();
      if (trimmedTestIp && isIP(trimmedTestIp)) {
        return { ip: trimmedTestIp };
      }
      return { ip: null, error: "Invalid test client IP" };
    }
  }

  // x-real-ip is set by Vercel to the true client IP
  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    const trimmedRealIp = realIp.trim();
    if (isIP(trimmedRealIp)) {
      return { ip: trimmedRealIp };
    }
  }

  // Fallback to first entry in x-forwarded-for (set by Vercel's edge)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const firstIp = forwarded.split(",")[0]?.trim();
    if (firstIp && isIP(firstIp)) {
      return { ip: firstIp };
    }
  }

  return { ip: null, error: "No valid client IP header found" };
}

function checkRateLimit(key: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

// Cleanup old rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 60000);

const DISPOSABLE_DOMAINS = new Set([
  "tempmail.com", "guerrillamail.com", "10minutemail.com", "mailinator.com",
  "throwaway.email", "fakeinbox.com", "temp-mail.org", "getnada.com",
  "maildrop.cc", "trashmail.com", "yopmail.com", "sharklasers.com",
  "guerrillamailblock.com", "spam4.me", "grr.la", "dispostable.com",
  "mintemail.com", "tempinbox.com", "throwawaymail.com", "mailnesia.com"
]);

interface WaitlistSubmission {
  email: string;
  role?: string;
  organization?: string;
  region?: string;
  headache?: string;
  website?: string; // honeypot field
  source_page?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  consent?: boolean;
  consent_text_version?: string;
}

interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: WaitlistSubmission;
  isHoneypot?: boolean;
}

function stripDisallowedControlChars(value: string): string {
  return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "");
}

function validateSubmission(data: unknown): ValidationResult {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const submission = data as Record<string, unknown>;

  // Honeypot check - if website field is filled, it's likely a bot
  // Return success to not tip off the bot, but flag it
  if (submission.website && typeof submission.website === "string" && submission.website.trim()) {
    return { valid: true, isHoneypot: true };
  }

  // Email validation
  const email = submission.email;
  if (!email || typeof email !== "string") {
    return { valid: false, error: "Email is required" };
  }

  const trimmedEmail = email.trim().toLowerCase();
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!emailRegex.test(trimmedEmail)) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  if (trimmedEmail.length > 254) {
    return { valid: false, error: "Email address is too long" };
  }

  const domain = trimmedEmail.split("@")[1];
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return { valid: false, error: "Please use a permanent email address" };
  }

  // Validate and sanitize optional fields
  // Strip disallowed control characters (U+0000-U+0008, U+000B, U+000C, U+000E-U+001F) before trim/truncate
  // Tab, LF, and CR are allowed
  // Limits aligned with backend contract: role/region 100, organization/UTM 200, source_page 500, headache 2000
  const role = typeof submission.role === "string" ? stripDisallowedControlChars(submission.role).trim().slice(0, 100) : undefined;
  const organization = typeof submission.organization === "string" ? stripDisallowedControlChars(submission.organization).trim().slice(0, 200) : undefined;
  const region = typeof submission.region === "string" ? stripDisallowedControlChars(submission.region).trim().slice(0, 100) : undefined;
  const headache = typeof submission.headache === "string" ? stripDisallowedControlChars(submission.headache).trim().slice(0, 2000) : undefined;
  const source_page = typeof submission.source_page === "string" ? stripDisallowedControlChars(submission.source_page).trim().slice(0, 500) : undefined;
  const utm_source = typeof submission.utm_source === "string" ? stripDisallowedControlChars(submission.utm_source).trim().slice(0, 200) : undefined;
  const utm_medium = typeof submission.utm_medium === "string" ? stripDisallowedControlChars(submission.utm_medium).trim().slice(0, 200) : undefined;
  const utm_campaign = typeof submission.utm_campaign === "string" ? stripDisallowedControlChars(submission.utm_campaign).trim().slice(0, 200) : undefined;
  // Phase 1: No marketing consent checkbox on form, so consent is always false
  // Do not send consent=true without an approved consent_text_version
  const consent = false;
  const consent_text_version = undefined;

  return {
    valid: true,
    sanitized: {
      email: trimmedEmail,
      role: role || undefined,
      organization: organization || undefined,
      region: region || undefined,
      headache: headache || undefined,
      source_page: source_page || undefined,
      utm_source: utm_source || undefined,
      utm_medium: utm_medium || undefined,
      utm_campaign: utm_campaign || undefined,
      consent: consent,
      consent_text_version: consent_text_version || undefined,
    },
  };
}

type ProviderResult = 
  | { success: true } 
  | { success: false; error: string; statusCode?: number; retryAfter?: number };

async function sendToResend(data: WaitlistSubmission): Promise<ProviderResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return { success: false, error: "Resend not configured" };
  }

  try {
    const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        first_name: data.organization || "",
        unsubscribed: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.message || "Failed to add to Resend" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Resend request failed" };
  }
}

async function sendToMailchimp(data: WaitlistSubmission): Promise<ProviderResult> {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_LIST_ID;
  const dc = process.env.MAILCHIMP_DC || apiKey?.split("-").pop();

  if (!apiKey || !listId || !dc) {
    return { success: false, error: "Mailchimp not configured" };
  }

  try {
    const response = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${listId}/members`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${Buffer.from(`anystring:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: data.email,
        status: "subscribed",
        merge_fields: {
          ROLE: data.role || "",
          ORG: data.organization || "",
          REGION: data.region || "",
        },
        tags: ["eternaguard-waitlist"],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (errorData.title === "Member Exists") {
        return { success: true }; // Already subscribed is fine
      }
      return { success: false, error: errorData.detail || "Failed to add to Mailchimp" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Mailchimp request failed" };
  }
}

async function sendToConvertKit(data: WaitlistSubmission): Promise<ProviderResult> {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const formId = process.env.CONVERTKIT_FORM_ID;

  if (!apiKey || !formId) {
    return { success: false, error: "ConvertKit not configured" };
  }

  try {
    const response = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        email: data.email,
        fields: {
          role: data.role || "",
          organization: data.organization || "",
          region: data.region || "",
        },
      }),
    });

    if (!response.ok) {
      return { success: false, error: "Failed to add to ConvertKit" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "ConvertKit request failed" };
  }
}

async function sendToWebhook(data: WaitlistSubmission): Promise<ProviderResult> {
  const webhookUrl = process.env.WAITLIST_WEBHOOK_URL;

  if (!webhookUrl) {
    return { success: false, error: "Webhook not configured" };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        role: data.role,
        organization: data.organization,
        region: data.region,
        headache: data.headache,
        source: "eternaguard_waitlist",
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      return { success: false, error: "Webhook delivery failed" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Webhook request failed" };
  }
}

async function sendToAws(data: WaitlistSubmission, request: NextRequest): Promise<ProviderResult> {
  const awsUrl = process.env.WAITLIST_AWS_URL;
  const awsSecret = process.env.WAITLIST_AWS_SECRET;

  if (!awsUrl || !awsSecret) {
    return { success: false, error: "AWS not configured" };
  }

  // Get trusted client IP from hosting platform headers
  const clientIpResult = getClientIp(request);
  if (!clientIpResult.ip) {
    console.error("[WAITLIST] Missing or invalid client IP:", clientIpResult.error);
    return { success: false, error: "Missing or invalid client IP", statusCode: 400 };
  }

  try {
    // Truncate user-agent to 512 characters per backend contract
    const rawUserAgent = request.headers.get("user-agent") || "";
    const userAgent = rawUserAgent.slice(0, 512);

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "x-waitlist-secret": awsSecret,
      "X-Waitlist-Client-IP": clientIpResult.ip,
    };

    // Only add user-agent header if present
    if (userAgent) {
      headers["X-Waitlist-User-Agent"] = userAgent;
    }

    const response = await fetch(awsUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: data.email,
        role: data.role,
        organization: data.organization,
        region: data.region,
        headache: data.headache,
        source_page: data.source_page,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        consent: data.consent,
        consent_text_version: data.consent_text_version,
      }),
    });

    // Parse response body to verify { ok: true }
    let responseBody: { ok?: boolean; error?: string; message?: string } = {};
    try {
      responseBody = await response.json();
    } catch {
      // Response body might not be JSON
    }

    // Handle error responses with meaningful propagation
    if (!response.ok) {
      const retryAfterHeader = response.headers.get("Retry-After");
      const retryAfter = retryAfterHeader ? parseInt(retryAfterHeader, 10) : undefined;
      const errorMessage = responseBody.error || responseBody.message || `AWS backend returned ${response.status}`;
      
      // Propagate 400 (bad request), 429 (rate limit), 503 (unavailable)
      if (response.status === 400 || response.status === 429 || response.status === 503) {
        return { 
          success: false, 
          error: errorMessage,
          statusCode: response.status,
          retryAfter: response.status === 429 ? retryAfter : undefined,
        };
      }
      
      return { success: false, error: errorMessage, statusCode: response.status };
    }

    // Verify backend returned { ok: true }
    if (responseBody.ok !== true) {
      return { success: false, error: "Backend did not confirm success" };
    }

    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "AWS request failed" };
  }
}

function hasProviderConfigured(): boolean {
  const provider = process.env.EMAIL_PROVIDER?.toLowerCase();
  
  // Explicit provider set
  if (provider === "resend" || provider === "mailchimp" || provider === "convertkit" || provider === "webhook" || provider === "aws") {
    return true;
  }
  
  // Auto-detect from credentials
  if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) return true;
  if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) return true;
  if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) return true;
  if (process.env.WAITLIST_WEBHOOK_URL) return true;
  if (process.env.WAITLIST_AWS_URL && process.env.WAITLIST_AWS_SECRET) return true;
  
  return false;
}

async function submitToProvider(data: WaitlistSubmission, request: NextRequest): Promise<ProviderResult> {
  const provider = process.env.EMAIL_PROVIDER?.toLowerCase();

  switch (provider) {
    case "resend":
      return sendToResend(data);
    case "mailchimp":
      return sendToMailchimp(data);
    case "convertkit":
      return sendToConvertKit(data);
    case "webhook":
      return sendToWebhook(data);
    case "aws":
      return sendToAws(data, request);
    default:
      // Try providers in order of preference (AWS first when configured)
      if (process.env.WAITLIST_AWS_URL && process.env.WAITLIST_AWS_SECRET) {
        return sendToAws(data, request);
      }
      if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
        return sendToResend(data);
      }
      if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
        return sendToMailchimp(data);
      }
      if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
        return sendToConvertKit(data);
      }
      if (process.env.WAITLIST_WEBHOOK_URL) {
        return sendToWebhook(data);
      }

      // No provider configured
      const isProduction = process.env.VERCEL_ENV === "production";
      
      if (isProduction) {
        // In production, fail clearly - don't pretend signup worked
        return { success: false, error: "No email provider configured" };
      }
      
      // In development/preview, log submission without email for debugging
      console.log("[WAITLIST] No email provider configured. Submission received:", {
        hasEmail: !!data.email,
        role: data.role,
        organization: data.organization,
        region: data.region,
        hasHeadache: !!data.headache,
        timestamp: new Date().toISOString(),
      });

      return { success: true };
  }
}

export async function POST(request: NextRequest) {
  // In production without a provider, fail fast with 503
  const isProduction = process.env.VERCEL_ENV === "production";
  if (isProduction && !hasProviderConfigured()) {
    return NextResponse.json(
      { error: "Signups are temporarily unavailable. Please email contact@eternaguard.com" },
      { status: 503 }
    );
  }

  // Rate limiting
  const rateLimitKey = getRateLimitKey(request);
  const rateLimit = checkRateLimit(rateLimitKey);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfter) },
      }
    );
  }

  // Parse and validate request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const validation = validateSubmission(body);
  
  // Honeypot triggered - return success to not tip off the bot
  if (validation.isHoneypot) {
    return NextResponse.json({
      success: true,
      message: "You're on the list! We'll be in touch soon.",
    });
  }
  
  if (!validation.valid || !validation.sanitized) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Submit to email provider
  const result = await submitToProvider(validation.sanitized, request);

  if (!result.success) {
    console.error("[WAITLIST] Provider error:", result.error);
    
    // In production with no provider, give a specific message
    if (isProduction && result.error === "No email provider configured") {
      return NextResponse.json(
        { error: "Signups are temporarily unavailable. Please email contact@eternaguard.com" },
        { status: 503 }
      );
    }
    
    // Propagate meaningful backend errors instead of collapsing to generic 500
    if (result.statusCode === 400) {
      return NextResponse.json(
        { error: result.error || "Invalid request" },
        { status: 400 }
      );
    }
    
    if (result.statusCode === 429) {
      const headers: Record<string, string> = {};
      if (result.retryAfter) {
        headers["Retry-After"] = String(result.retryAfter);
      }
      return NextResponse.json(
        { error: result.error || "Too many requests. Please try again later." },
        { status: 429, headers }
      );
    }
    
    if (result.statusCode === 503) {
      return NextResponse.json(
        { error: result.error || "Service temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { error: "We couldn't process your signup right now. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    message: "You're on the list! We'll be in touch soon.",
  });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
