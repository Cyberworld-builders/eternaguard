// List of disposable email domains to block
const DISPOSABLE_DOMAINS = [
  "tempmail.com",
  "guerrillamail.com",
  "10minutemail.com",
  "mailinator.com",
  "throwaway.email",
  "fakeinbox.com",
  "temp-mail.org",
  "getnada.com",
  "maildrop.cc",
  "trashmail.com",
  "yopmail.com",
  "sharklasers.com",
  "guerrillamailblock.com",
  "spam4.me",
  "grr.la",
  "dispostable.com",
  "mintemail.com",
];

export interface EmailValidationResult {
  valid: boolean;
  error?: string;
}

export function validateEmail(email: string): EmailValidationResult {
  // Basic format validation
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  // Check for disposable email domains
  const domain = email.split("@")[1]?.toLowerCase();
  if (DISPOSABLE_DOMAINS.includes(domain)) {
    return {
      valid: false,
      error: "Temporary email addresses are not allowed. Please use a permanent email.",
    };
  }

  // Additional checks
  if (email.length > 254) {
    return { valid: false, error: "Email address is too long" };
  }

  // Check for common typos in popular domains
  const commonTypos: Record<string, string> = {
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "gmil.com": "gmail.com",
    "yahooo.com": "yahoo.com",
    "yaho.com": "yahoo.com",
    "hotmial.com": "hotmail.com",
    "hotmai.com": "hotmail.com",
  };

  if (commonTypos[domain]) {
    return {
      valid: false,
      error: `Did you mean ${email.split("@")[0]}@${commonTypos[domain]}?`,
    };
  }

  return { valid: true };
}

export async function submitLead(
  email: string,
  product: string,
  metadata?: Record<string, unknown>
): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    // Get the gateway API URL from environment or use localhost for development
    const apiUrl =
      process.env.NEXT_PUBLIC_GATEWAY_API_URL || "http://localhost:3000";

    const response = await fetch(`${apiUrl}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        product,
        metadata,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || "Failed to subscribe. Please try again.",
      };
    }

    return {
      success: true,
      message: data.message || "Successfully subscribed!",
    };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return {
      success: false,
      error: "Network error. Please check your connection and try again.",
    };
  }
}

