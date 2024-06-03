"use server";

import { ResetSchema, NewPasswordSchema } from "@/lib/schemas";

import * as z from "zod";

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Email" };
  }

  const res = await fetch(`${APP_DOMAIN}/api/auth/reset`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  return data;
};

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null,
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { password } = validatedFields.data;

  const dataSend = { password, token };

  const res = await fetch(`${APP_DOMAIN}/api/auth/reset`, {
    method: "PATCH",
    body: JSON.stringify(dataSend),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  return data;
};