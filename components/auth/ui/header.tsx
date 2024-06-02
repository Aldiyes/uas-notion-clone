import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

type Props = {
  label: string;
};

export const Header = ({ label }: Props) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <div className="flex items-center gap-x-2">
        <Image src="/logo.png" height={40} width={40} alt="Logo" />
        <p className={cn("font-semibold", poppins.className)}>Notion</p>
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};
