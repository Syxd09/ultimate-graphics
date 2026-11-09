import { NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "@/lib/admin-auth";
import { getSubmissions } from "@/lib/submissions";

function escapeCsv(val: any): string {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await getSubmissions();

  const headers = [
    "Submission ID",
    "Date (UTC)",
    "Status",
    "Full Name",
    "Email Address",
    "Phone Number",
    "Service Requested",
    "Message / Project Specs",
    "Source Form",
    "Internal Notes",
    "IP Address",
  ];

  const rows = submissions.map((s) => [
    escapeCsv(s.id),
    escapeCsv(s.createdAt),
    escapeCsv(s.status),
    escapeCsv(s.name),
    escapeCsv(s.email),
    escapeCsv(s.phone || ""),
    escapeCsv(s.service || ""),
    escapeCsv(s.message || ""),
    escapeCsv(s.source),
    escapeCsv(s.notes || ""),
    escapeCsv(s.ip || ""),
  ]);

  const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

  const dateStr = new Date().toISOString().split("T")[0];
  const filename = `ultimate-graphics-leads-${dateStr}.csv`;

  return new NextResponse(csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}

