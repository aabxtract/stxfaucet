"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useStacks } from "@/hooks/use-stacks";
import { Header } from "@/components/Header";
import { TerminalLog } from "@/components/TerminalLog";
import { Separator } from "@/components/ui/separator";
import { ConnectWallet } from "@/components/ConnectWallet";
import { FaucetActions } from "@/components/FaucetActions";
import { cn } from "@/lib/utils";
import { Power } from "lucide-react";
import { Button } from "./ui/button";

export function FaucetCore() {
  const [glitching, setGlitching] = useState(false);
  const { connected, disconnect, userAddress } = useStacks();

  const handleRequest = () => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 500);
  };

  return (
    <Card
      className={cn(
        "w-full max-w-4xl bg-black/50 border-2 border-primary/50 shadow-[0_0_20px_theme(colors.primary/0.5)] transition-all duration-500",
        glitching && "animate-glitch"
      )}
    >
      <div className="border-b-2 border-primary/50 p-2 flex justify-between items-center">
        <Header />
        {connected && (
           <div className="flex items-center gap-4">
             <p className="text-xs text-primary/70 hidden sm:block truncate max-w-[150px]">{userAddress}</p>
             <Button variant="ghost" size="icon" onClick={disconnect} className="text-accent hover:bg-accent/20 hover:text-accent-foreground h-8 w-8">
               <Power className="h-4 w-4" />
             </Button>
           </div>
        )}
      </div>
      <CardContent className="p-4 sm:p-6 md:p-8">
        <TerminalLog isConnected={connected} />
        <Separator className="my-6 bg-primary/30" />
        <div className="min-h-[120px] flex flex-col items-center justify-center">
          {connected ? (
            <FaucetActions onTransactionStart={handleRequest} />
          ) : (
            <ConnectWallet />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
