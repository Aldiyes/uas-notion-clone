import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";

export async function POST(req: NextRequest) {
  try {
    const values = await req.json();

    const userExists = await db.user.findUnique({
      where: {
        email: values.email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        { error: "User already exists!" },
        { status: 409 },
      );
    }

    const encryptedPassword = btoa(values.password);

    await db.user.create({
      data: {
        name: values.name,
        email: values.email,
        password: encryptedPassword,
      },
    });

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return NextResponse.json({ success: "Email Sent!" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
