import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  await connectDB();
  const post = await Post.findOne({ slug: params.slug }).populate(
    "author",
    "username profilePicture"
  );
  return NextResponse.json(post);
}
