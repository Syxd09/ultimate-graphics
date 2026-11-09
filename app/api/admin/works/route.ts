import { NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "@/lib/admin-auth";
import { getProjects, addProject, updateProject, deleteProject } from "@/lib/cms";

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const projects = await getProjects();
  return NextResponse.json({ success: true, projects });
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    const project = await addProject(body);
    return NextResponse.json({ success: true, project });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "Project ID or slug is required" }, { status: 400 });
    }
    const updated = await updateProject(body.id, body);
    if (!updated) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, project: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }
    const success = await deleteProject(id);
    if (!success) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete project" }, { status: 500 });
  }
}

