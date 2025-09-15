import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const post = await Post.findById(params.id).populate(
    "author",
    "username profilePicture"
  );
  return NextResponse.json(post);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const post = await Post.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(post);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Post.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted successfully" });
}
