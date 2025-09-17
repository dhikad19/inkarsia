import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  if (!postId)
    return NextResponse.json({ error: "Missing postId" }, { status: 400 });

  const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const comment = await Comment.create(body);
  return NextResponse.json(comment);
}
