import "server-only";

import { createNeonAuth } from "@neondatabase/auth/next/server";

const baseUrl = process.env.NEON_AUTH_BASE_URL;
const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

if (!baseUrl) {
  throw new Error("NEON_AUTH_BASE_URL is not configured.");
}

if (!cookieSecret) {
  throw new Error("NEON_AUTH_COOKIE_SECRET is not configured.");
}

// Routes, session handling, and UI are intentionally not configured yet.
export const auth = createNeonAuth({
  baseUrl,
  cookies: { secret: cookieSecret },
});
