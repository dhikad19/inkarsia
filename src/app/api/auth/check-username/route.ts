import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  await connectDB();
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  const exists = await User.findOne({ username });
  if (exists) {
    return NextResponse.json({
      available: false,
      message: "Username already taken",
    });
  }

  return NextResponse.json({
    available: true,
    message: "Username is available",
  });
}
