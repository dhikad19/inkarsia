import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET() {
  await connectDB();
  const posts = await Post.find({ status: "published" }).populate(
    "author",
    "username profilePicture"
  );
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const post = await Post.create(body);
  return NextResponse.json(post);
}
