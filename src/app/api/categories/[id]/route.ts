import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const body = await req.json();
  const category = await Category.findByIdAndUpdate(params.id, body, {
    new: true,
  });
  return NextResponse.json(category);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Category.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted successfully" });
}
