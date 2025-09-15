import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Notification from "@/models/Notification";

export async function GET(req: NextRequest) {
  await connectDB();
  const userId = req.nextUrl.searchParams.get("userId");
  if (!userId)
    return NextResponse.json({ error: "userId is required" }, { status: 400 });

  const notifications = await Notification.find({ user: userId }).populate(
    "sender",
    "username profilePicture"
  );
  return NextResponse.json(notifications);
}
