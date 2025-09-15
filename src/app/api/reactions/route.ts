import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Reaction from "@/models/Reaction";

export async function GET(req: NextRequest) {
  await connectDB();
  const { postId, commentId } = Object.fromEntries(
    req.nextUrl.searchParams.entries()
  );
  const filter: any = {};
  if (postId) filter.post = postId;
  if (commentId) filter.comment = commentId;

  const reactions = await Reaction.find(filter).populate(
    "user",
    "username profilePicture"
  );
  return NextResponse.json(reactions);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const reaction = await Reaction.create(body);
  return NextResponse.json(reaction);
}
