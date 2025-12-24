"use client";

import { useTypewriter } from "@/hooks/use-typewriter";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const messages = [
  "INITIALIZING FAUCET PROTOCOL...",
  "VERIFYING STACKS CONNECTION...",
  "AWAITING USER AUTHENTICATION...",
];

const connectedMessages = [
  "STATUS: CONNECTED TO STACKS MAINNET.",
  "WALLET AUTHENTICATED.",
  "DRIP SEQUENCE ENABLED.",
  "READY TO DISPENSE.",
];

type TerminalLogProps = {
  isConnected: boolean;
};

export function TerminalLog({ isConnected }: TerminalLogProps) {
  const { displayedText, start, stop, isRunning } = useTypewriter(messages, {
    loop: false,
    typingSpeed: 50,
    deleteSpeed: 0,
  });

  const { displayedText: connectedText, start: startConnected, stop: stopConnected } = useTypewriter(connectedMessages, {
    loop: false,
    typingSpeed: 50,
    deleteSpeed: 0,
  });

  useEffect(() => {
    if (isConnected) {
        if(isRunning) stop();
        startConnected();
    } else {
        stopConnected();
        start();
    }
  }, [isConnected, start, stop, startConnected, stopConnected, isRunning]);

  return (
    <div className="bg-black/30 p-4 rounded-md border border-primary/20 min-h-[100px] font-code text-sm sm:text-base">
      <p>
        <span className="text-accent text-glow-accent">{"> "}</span>
        <span className={cn(isConnected && 'text-green-400')}>
            {isConnected ? connectedText : displayedText}
        </span>
        <span className="animate-pulse">_</span>
      </p>
    </div>
  );
}
