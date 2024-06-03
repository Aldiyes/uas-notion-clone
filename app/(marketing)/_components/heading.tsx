"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import Link from "next/link";

export const Heading = () => {
  const user = useCurrentUser();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold sm:text-5xl md:text-6xl">
        Yout Ideas, Documents, & Plans. Unified. Welcome to{" "}
        <span className="underline">Notion</span>
      </h1>
      <h3 className="font text-base font-medium sm:text-xl md:text-2xl">
        Notion is the connected workspace where <br /> better, faster work
        happens.
      </h3>
      {!user ? (
        <Button asChild>
          <Link href="/auth/login">
            Get Notion free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button asChild>
          <Link href="/documents">
            Enter Notion
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
};
