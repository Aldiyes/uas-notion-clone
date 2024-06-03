"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

type ButtonProps = {
  label: string;
  href: string;
};

export const BackButton = ({ label, href }: ButtonProps) => {
  return (
    <Button variant="link" className="w-full font-normal" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
