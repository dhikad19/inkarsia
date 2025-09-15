import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const notification = await Notification.findByIdAndUpdate(
    params.id,
    { read: true },
    { new: true }
  );
  return NextResponse.json(notification);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  await Notification.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Deleted successfully" });
}
