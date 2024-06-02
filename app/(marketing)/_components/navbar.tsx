"use client";

import { cn } from "@/lib/utils";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { Logo } from "./logo";

export const Navbar = () => {
  const scrolled = useScrollTop();

  return (
    <div
      className={cn(
        "fixed top-0 z-50 flex w-full items-center bg-background p-6",
        scrolled && "border-b shadow-sm",
      )}
    >
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end">
        {/* TODO: Toggle Theme */}
      </div>
    </div>
  );
};
