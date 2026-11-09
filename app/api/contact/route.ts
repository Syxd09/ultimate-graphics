import { NextRequest, NextResponse } from "next/server";
import { createSubmission } from "@/lib/submissions";

export async function POST(req: NextRequest) {
  try {
    let body: any;
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      body = await req.json();
    } else if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      body = Object.fromEntries(formData.entries());
    } else {
      try {
        body = await req.json();
      } catch {
        const text = await req.text();
        body = JSON.parse(text);
      }
    }

    // Bot honeypot check (Framer form has hidden honeypot fields like website, company)
    if (body.website || body.comments_extra) {
      return NextResponse.json({
        success: true,
        message: "Thank you! Your quote request has been submitted.",
      });
    }

    // Support both standardized names and Framer capitalized names
    const name = body.name || body.Name || body["full-name"] || "";
    const email = body.email || body.Email || "";
    const phone = body.phone || body.Phone || body.tel || "";
    const service = body.service || body.Service || body.Location || body.serviceType || "General Signage & Fabrication Enquiry";
    const message = body.message || body.Message || body.details || body.dimensions || "";
    const source = body.source || "Website Contact Form";

    // Validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Please enter your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Extract client IP if available
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    const submission = await createSubmission({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? String(phone).trim() : undefined,
      service: String(service).trim(),
      message: message ? String(message).trim() : undefined,
      source: String(source).trim(),
      ip,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your enquiry has been received. Our fabrication team will review your specifications and respond within 2 hours.",
      submissionId: submission.id,
    });
  } catch (error: any) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit form. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "online",
    message: "Ultimate Graphics Contact API endpoint is active.",
  });
}

