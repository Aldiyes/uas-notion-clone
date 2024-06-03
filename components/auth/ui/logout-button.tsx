"use client";

import { logout } from "@/lib/actions/auth/logout";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    logout();
    router.prefetch(window.location.href);
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
