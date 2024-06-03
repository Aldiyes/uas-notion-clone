"use server";

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_URL;

export const newVerification = async (token: string) => {
  const res = await fetch(`${APP_DOMAIN}/api/auth/new-verification`, {
    method: "PATCH",
    body: JSON.stringify(token),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await res.json();
  return data;
};
