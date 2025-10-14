import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Login diperlukan" }, { status: 401 });
  }

  const { code } = await req.json();
  if (!code) {
    return NextResponse.json({ message: "Kode dibutuhkan" }, { status: 400 });
  }

  await connectDB();

  const order = await Order.findOne({ activationCode: code });
  if (!order) {
    return NextResponse.json({ message: "Kode tidak valid" }, { status: 400 });
  }

  if (order.claimedBy) {
    return NextResponse.json(
      { message: "Kode sudah diklaim" },
      { status: 400 }
    );
  }

  if (order.buyerEmail && order.buyerEmail !== session.user.email) {
    return NextResponse.json(
      { message: "Email pembeli tidak cocok" },
      { status: 403 }
    );
  }

  const user = await User.findOneAndUpdate(
    { email: session.user.email },
    {
      $set: {
        isPro: true,
        proExpiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
      },
    },
    { new: true }
  );

  order.claimedBy = user._id;
  order.status = "claimed";
  await order.save();

  return NextResponse.json({ message: "Aktivasi berhasil", user });
}
