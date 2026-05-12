import Link from "next/link";
import { Zap } from "lucide-react";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Zap className="h-5 w-5 text-primary" />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-bold text-lg">SellCraft</span>
        <span className="text-muted-foreground text-base font-medium">AI</span>
      </div>
    </Link>
  );
}
