import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const comment = await Comment.findById(params.id)
    .populate("author", "username")
    .populate("post", "title slug");
  return NextResponse.json(comment);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const comment = await Comment.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return NextResponse.json(comment);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Comment.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted successfully" });
}
