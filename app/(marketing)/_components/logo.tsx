import { Poppins } from "next/font/google";
import Image from "next/image";

import { cn } from "@/lib/utils";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export const Logo = () => {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Image src="/logo.png" height={40} width={40} alt="Logo" />
      <p className={cn("font-semibold", poppins.className)}>Notion</p>
    </div>
  );
};
