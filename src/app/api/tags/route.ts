import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Tag from "@/models/Tag";

export async function GET() {
  await connectDB();
  const tags = await Tag.find();
  return NextResponse.json(tags);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const tag = await Tag.create(body);
  return NextResponse.json(tag);
}
