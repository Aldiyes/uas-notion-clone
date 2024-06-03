"use server";

import { RegisterSchema } from "@/lib/schemas";
import * as z from "zod";

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const res = await fetch(`${APP_DOMAIN}/api/auth/register`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();

  return data;
};
