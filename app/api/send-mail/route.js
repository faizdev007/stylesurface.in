import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { fullName, phone, userType, requirement } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${fullName}" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "New Lead from Website",
      html: `
        <h3>New Message</h3>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>User Type:</b> ${userType}</p>
        <p><b>Requirement:</b> ${requirement}</p>
    `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Mail not sent" }, { status: 500 });
  }
}
