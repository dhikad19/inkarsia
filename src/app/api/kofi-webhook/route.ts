import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { generateActivationCode } from "@/utils/generateCode";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const payload = await req.json();

  const { orderId, buyerEmail } = payload;
  if (!orderId || !buyerEmail) {
    return NextResponse.json({ message: "Missing data" }, { status: 400 });
  }

  await connectDB();

  const existingOrder = await Order.findOne({ orderId });
  if (existingOrder) {
    return NextResponse.json(
      { message: "Order already processed" },
      { status: 200 }
    );
  }

  const activationCode = generateActivationCode("PRO", 8);

  const order = new Order({
    orderId,
    buyerEmail,
    activationCode,
    status: "delivered",
  });

  await order.save();

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Your Product" <${process.env.SMTP_FROM}>`,
      to: buyerEmail,
      subject: "Your Pro Activation Code",
      text: `Terima kasih sudah membeli. Kode aktivasi Anda: ${activationCode}\nMasuk ke https://yourdomain.com/activate untuk memasukkan kode.`,
      html: `<p>Terima kasih sudah membeli. Kode aktivasi Anda:</p><h2>${activationCode}</h2><p>Masuk ke <a href="https://yourdomain.com/activate">website</a> untuk aktivasi.</p>`,
    });
  } catch (err) {
    console.error("Email error", err);
  }

  return NextResponse.json({ message: "Order processed" });
}
