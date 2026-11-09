import { NextRequest, NextResponse } from "next/server";
import { isAuthorized } from "@/lib/admin-auth";
import { getBlogPosts, addBlogPost, updateBlogPost, deleteBlogPost } from "@/lib/cms";

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const posts = await getBlogPosts();
  return NextResponse.json({ success: true, posts });
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
    const post = await addBlogPost(body);
    return NextResponse.json({ success: true, post });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to create blog post" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    if (!body.slug) {
      return NextResponse.json({ error: "Post slug is required" }, { status: 400 });
    }
    const updated = await updateBlogPost(body.slug, body);
    if (!updated) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, post: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ error: "Post slug is required" }, { status: 400 });
    }
    const success = await deleteBlogPost(slug);
    if (!success) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Blog post deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete blog post" }, { status: 500 });
  }
}

