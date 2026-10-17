import { NextRequest, NextResponse } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return ip;
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
}

interface ValidationResult {
  valid: boolean;
  error?: string;
  sanitized?: WaitlistSubmission;
}

function validateSubmission(data: unknown): ValidationResult {
  if (!data || typeof data !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  const submission = data as Record<string, unknown>;

  // Honeypot check - if website field is filled, it's likely a bot
  if (submission.website && typeof submission.website === "string" && submission.website.trim()) {
    return { valid: false, error: "Submission rejected" };
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

  // Validate optional fields
  const role = typeof submission.role === "string" ? submission.role.trim().slice(0, 100) : undefined;
  const organization = typeof submission.organization === "string" ? submission.organization.trim().slice(0, 200) : undefined;
  const region = typeof submission.region === "string" ? submission.region.trim().slice(0, 100) : undefined;
  const headache = typeof submission.headache === "string" ? submission.headache.trim().slice(0, 1000) : undefined;

  return {
    valid: true,
    sanitized: {
      email: trimmedEmail,
      role: role || undefined,
      organization: organization || undefined,
      region: region || undefined,
      headache: headache || undefined,
    },
  };
}

type ProviderResult = { success: true } | { success: false; error: string };

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

async function submitToProvider(data: WaitlistSubmission): Promise<ProviderResult> {
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
    default:
      // Try providers in order of preference
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

      // No provider configured - log locally and return success
      console.log("[WAITLIST] No email provider configured. Submission logged:", {
        email: data.email,
        role: data.role,
        organization: data.organization,
        region: data.region,
        headache: data.headache ? `${data.headache.slice(0, 50)}...` : undefined,
        timestamp: new Date().toISOString(),
      });

      return { success: true };
  }
}

export async function POST(request: NextRequest) {
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
  if (!validation.valid || !validation.sanitized) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  // Submit to email provider
  const result = await submitToProvider(validation.sanitized);

  if (!result.success) {
    console.error("[WAITLIST] Provider error:", result.error);
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
