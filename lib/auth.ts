/**
 * CyberWorld OAuth Authentication Helper
 */

const GATEWAY_URL = process.env.NEXT_PUBLIC_GATEWAY_API_URL || "http://localhost:3000";
const CLIENT_ID = "eternaguard";

/**
 * Get the current origin for redirect URI
 */
function getRedirectUri(): string {
  if (typeof window === "undefined") {
    return "http://localhost:3001/auth/callback";
  }
  return `${window.location.origin}/auth/callback`;
}

/**
 * Generate a random state for CSRF protection
 */
function generateState(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Initiate OAuth login flow
 */
export function loginWithCyberWorld() {
  const state = generateState();
  
  // Store state in sessionStorage for verification
  if (typeof window !== "undefined") {
    sessionStorage.setItem("oauth_state", state);
  }

  const redirectUri = getRedirectUri();
  
  const authUrl = new URL(`${GATEWAY_URL}/auth/authorize`);
  authUrl.searchParams.set("client_id", CLIENT_ID);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("response_type", "code");

  console.log("Redirecting to gateway for authentication:", authUrl.toString());

  // Redirect to gateway for authentication
  if (typeof window !== "undefined") {
    window.location.href = authUrl.toString();
  }
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  
  const token = localStorage.getItem("cyberworld_access_token");
  return !!token;
}

/**
 * Get current user data
 */
export function getCurrentUser() {
  if (typeof window === "undefined") return null;
  
  const userStr = localStorage.getItem("cyberworld_user");
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

/**
 * Logout user
 */
export function logout() {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem("cyberworld_access_token");
  localStorage.removeItem("cyberworld_user");
  
  // Redirect to home
  window.location.href = "/";
}

/**
 * Get access token
 */
export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  
  return localStorage.getItem("cyberworld_access_token");
}

