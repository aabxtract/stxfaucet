"use client";

import { useStacks } from "@/hooks/use-stacks";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function ConnectWallet() {
  const { connect } = useStacks();

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <p className="text-accent text-glow-accent">AUTHENTICATION REQUIRED</p>
      <Button
        onClick={connect}
        className="animate-pulse-glow bg-accent text-accent-foreground hover:bg-accent/80 hover:shadow-[0_0_30px_theme(colors.accent)] h-14 px-8 text-lg font-bold tracking-widest border-2 border-accent/50 hover:border-accent"
      >
        <LogIn className="mr-3 h-6 w-6" />
        SYSTEM LOGIN
      </Button>
    </div>
  );
}
