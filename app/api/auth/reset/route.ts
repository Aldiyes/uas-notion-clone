import { NextRequest, NextResponse } from "next/server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { db } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export async function POST(req: NextRequest) {
  try {
    const values = await req.json();

    const userExists = await db.user.findUnique({
      where: {
        email: values.email,
      },
    });

    if (!userExists) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    const passwordResetToken = await generatePasswordResetToken(values.email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );
    return NextResponse.json({ success: "Reset email sent!" }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const values = await req.json();
    const existingToken = await getPasswordResetTokenByToken(values.token);
    if (!existingToken) {
      return NextResponse.json(
        { error: "Token does not exists!" },
        { status: 401 },
      );
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return NextResponse.json(
        { error: "Token has expired!" },
        { status: 401 },
      );
    }

    const existingUser = await db.user.findUnique({
      where: {
        email: existingToken.email,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        { error: "Email does not exist!" },
        { status: 404 },
      );
    }

    const encryptedPassword = btoa(values.password);
    await db.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: encryptedPassword,
      },
    });

    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return NextResponse.json(
      { success: "Password updated successfully" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
