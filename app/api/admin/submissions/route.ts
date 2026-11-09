import { NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "@/lib/admin-auth";
import {
  getSubmissions,
  getSubmissionStats,
  updateSubmission,
  deleteSubmission,
  createSubmission,
} from "@/lib/submissions";

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q")?.toLowerCase();
    const status = searchParams.get("status");
    const service = searchParams.get("service");

    let items = await getSubmissions();

    if (query) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          (item.phone && item.phone.toLowerCase().includes(query)) ||
          (item.service && item.service.toLowerCase().includes(query)) ||
          (item.message && item.message.toLowerCase().includes(query)) ||
          (item.notes && item.notes.toLowerCase().includes(query))
      );
    }

    if (status && status !== "all") {
      items = items.filter((item) => item.status === status);
    }

    if (service && service !== "all") {
      items = items.filter((item) => item.service === service);
    }

    const stats = await getSubmissionStats();

    return NextResponse.json({
      success: true,
      submissions: items,
      stats,
    });
  } catch (error) {
    console.error("Error retrieving submissions:", error);
    return NextResponse.json(
      { error: "Failed to retrieve submissions" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, notes, service, phone } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing submission ID" }, { status: 400 });
    }

    const updated = await updateSubmission(id, {
      ...(status !== undefined && { status }),
      ...(notes !== undefined && { notes }),
      ...(service !== undefined && { service }),
      ...(phone !== undefined && { phone }),
    });

    if (!updated) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    const stats = await getSubmissionStats();

    return NextResponse.json({
      success: true,
      submission: updated,
      stats,
    });
  } catch (error) {
    console.error("Error updating submission:", error);
    return NextResponse.json(
      { error: "Failed to update submission" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing submission ID" }, { status: 400 });
    }

    const success = await deleteSubmission(id);
    if (!success) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    const stats = await getSubmissionStats();

    return NextResponse.json({
      success: true,
      message: "Submission deleted successfully",
      stats,
    });
  } catch (error) {
    console.error("Error deleting submission:", error);
    return NextResponse.json(
      { error: "Failed to delete submission" },
      { status: 500 }
    );
  }
}

// POST endpoint for admin to manually add a lead or generate a test inquiry
export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await req.json();
    const submission = await createSubmission({
      name: body.name || "Test Client",
      email: body.email || "client@example.com",
      phone: body.phone,
      service: body.service || "Direct Metal Laser Cutting",
      message: body.message || "Test inquiry generated from admin panel.",
      source: body.source || "Admin Panel Manual Entry",
    });

    const stats = await getSubmissionStats();

    return NextResponse.json({
      success: true,
      submission,
      stats,
    });
  } catch (error) {
    console.error("Error creating manual submission:", error);
    return NextResponse.json(
      { error: "Failed to create submission" },
      { status: 500 }
    );
  }
}

