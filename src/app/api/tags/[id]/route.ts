import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Tag from "@/models/Tag";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const tag = await Tag.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(tag);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Tag.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted successfully" });
}
