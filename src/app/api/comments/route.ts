import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function GET() {
  await connectDB();
  const comments = await Comment.find()
    .populate("author", "username")
    .populate("post", "title slug");
  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const comment = await Comment.create(body);
  return NextResponse.json(comment);
}
