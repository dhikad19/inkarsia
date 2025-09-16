import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { appendFileSync } from "fs";

export async function POST(req: NextRequest) {
  await connectDB();
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return NextResponse.json(
      { error: "Email already registered" },
      { status: 400 }
    );
  }

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();

    console.log("Registering user:");
    console.log("Email:", email);
    console.log("Plain password:", password);

    return NextResponse.json({
      message: "User registered",
      user: { id: newUser._id.toString(), username, email },
    });
  } catch (err) {
    appendFileSync("log.txt", `Register error: ${err}\n`);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
