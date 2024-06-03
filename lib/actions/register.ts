"use server";

import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export const register = async (values: z.infer<typeof formSchema>) => {
  const validatedFields = formSchema.safeParse(values);

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
