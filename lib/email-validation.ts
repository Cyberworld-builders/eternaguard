const DISPOSABLE_DOMAINS = new Set([
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
]);

export interface EmailValidationResult {
  valid: boolean;
  error?: string;
}

export function validateEmail(email: string): EmailValidationResult {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: "Please enter a valid email address" };
  }

  const domain = email.split("@")[1]?.toLowerCase();
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      valid: false,
      error: "Please use a permanent email address",
    };
  }

  if (email.length > 254) {
    return { valid: false, error: "Email address is too long" };
  }

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
