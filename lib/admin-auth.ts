import { NextRequest } from "next/server";

export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
export const AUTH_COOKIE_NAME = "ug_admin_auth";
export const AUTH_SECRET_TOKEN = Buffer.from(DEFAULT_ADMIN_PASSWORD).toString("base64");

export function isAuthorized(req: NextRequest): boolean {
  const cookieVal = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (cookieVal === AUTH_SECRET_TOKEN) return true;

  const authHeader = req.headers.get("x-admin-key") || req.headers.get("authorization");
  if (authHeader) {
    const key = authHeader.replace(/^Bearer\s+/i, "");
    if (key === DEFAULT_ADMIN_PASSWORD || key === AUTH_SECRET_TOKEN) return true;
  }

  return false;
}

