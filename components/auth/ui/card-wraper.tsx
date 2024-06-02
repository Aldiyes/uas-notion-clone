"use client";

import { BackButton } from "@/components/auth/ui/back-button";
import { Header } from "@/components/auth/ui/header";
import { Social } from "@/components/auth/ui/social";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

type CardWraperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

export const CardWraper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWraperProps) => {
  return (
    <Card className="w-[400px] bg-neutral-100 shadow-lg dark:border dark:border-neutral-300/20 dark:bg-neutral-900">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};
