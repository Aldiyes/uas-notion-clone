import { NextRequest, NextResponse } from "next/server";

import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";

export async function PATCH(req: NextRequest) {
  try {
    const { token } = await req.json();
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      return NextResponse.json(
        { error: "Token does not exist!" },
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

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return NextResponse.json({ success: "Email verified!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
