import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full items-center justify-center">
      <nav className="absolute left-4 top-4">
        <Link href="/" className="flex items-center gap-x-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default AuthLayout;
