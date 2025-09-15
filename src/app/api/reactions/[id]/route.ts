import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Reaction from "@/models/Reaction";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Reaction.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted successfully" });
}
