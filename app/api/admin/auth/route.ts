import { NextRequest, NextResponse } from "next/server";
import {
  DEFAULT_ADMIN_PASSWORD,
  AUTH_COOKIE_NAME,
  AUTH_SECRET_TOKEN,
} from "@/lib/admin-auth";

// Basic rate limiting to mitigate brute-force attempts
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60 * 1000; // 1 minute lockout

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "127.0.0.1";
}

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req);
  const now = Date.now();
  const attemptRecord = loginAttempts.get(clientIp);

  if (attemptRecord && attemptRecord.count >= MAX_ATTEMPTS) {
    if (now < attemptRecord.resetAt) {
      const waitSeconds = Math.ceil((attemptRecord.resetAt - now) / 1000);
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed login attempts. Please wait ${waitSeconds}s before retrying.`,
        },
        { status: 429 }
      );
    } else {
      // Lockout expired, reset counter
      loginAttempts.delete(clientIp);
    }
  }

  try {
    const { password } = await req.json();

    if (!password || password !== DEFAULT_ADMIN_PASSWORD) {
      const current = loginAttempts.get(clientIp) || {
        count: 0,
        resetAt: now + LOCKOUT_MS,
      };
      const updatedCount = current.count + 1;
      loginAttempts.set(clientIp, {
        count: updatedCount,
        resetAt: now + LOCKOUT_MS,
      });

      return NextResponse.json(
        {
          success: false,
          error: "Invalid admin password.",
          remainingAttempts: Math.max(0, MAX_ATTEMPTS - updatedCount),
        },
        { status: 401 }
      );
    }

    // Success - clear failed attempts for this IP
    loginAttempts.delete(clientIp);

    const response = NextResponse.json({
      success: true,
      message: "Admin authenticated successfully.",
    });

    response.cookies.set(AUTH_COOKIE_NAME, AUTH_SECRET_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: "Authentication failed." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (token && token === AUTH_SECRET_TOKEN) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out.",
  });

  response.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
