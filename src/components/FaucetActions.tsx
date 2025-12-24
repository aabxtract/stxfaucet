"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { openContractCall } from "@stacks/connect";
import { StacksMainnet } from "@stacks/network";
import {
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  PostConditionMode,
} from "@stacks/transactions";
import { useStacks } from "@/hooks/use-stacks";
import { COOLDOWN_SECONDS, CONTRACT_ADDRESS, CONTRACT_NAME, DRIP_AMOUNT_USTX } from "@/lib/constants";
import { useCooldown } from "@/hooks/use-cooldown";
import { useEffect, useState } from "react";

type FaucetActionsProps = {
  onTransactionStart: () => void;
};

export function FaucetActions({ onTransactionStart }: FaucetActionsProps) {
  const { userAddress } = useStacks();
  const { toast } = useToast();
  const { isCoolingDown, remainingTime, startCooldown } = useCooldown(
    "neonDripLastClaim",
    COOLDOWN_SECONDS
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const handleRequestTokens = async () => {
    if (!userAddress) {
      toast({
        title: "Connection Error",
        description: "Wallet not connected. Please connect your wallet first.",
        variant: "destructive",
      });
      return;
    }
    
    onTransactionStart();

    const postCondition = makeStandardSTXPostCondition(
        userAddress,
        FungibleConditionCode.GreaterEqual,
        0
    );

    const options = {
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "claim",
      functionArgs: [],
      network: new StacksMainnet(),
      postConditionMode: PostConditionMode.Deny,
      postConditions: [postCondition],
      onFinish: (data: { txId: any; }) => {
        toast({
          title: "Transaction Broadcasted",
          description: `TxID: ${data.txId}`,
        });
        startCooldown();
      },
      onCancel: () => {
        toast({
          title: "Transaction Canceled",
          description: "You have canceled the transaction.",
          variant: "destructive"
        });
      },
    };

    try {
      await openContractCall(options);
    } catch (error: any) {
        toast({
            title: "Contract Call Error",
            description: error.message || "An unknown error occurred.",
            variant: "destructive"
        });
    }
  };

  if (!isClient) {
    return (
        <div className="h-14 w-64 bg-primary/10 animate-pulse rounded-lg"></div>
    );
  }

  if (isCoolingDown) {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.floor(remainingTime % 60);
    return (
      <div className="text-center">
        <p className="text-accent text-glow-accent mb-2">COOLDOWN ACTIVE</p>
        <p className="text-4xl font-bold text-primary text-glow-primary font-mono tabular-nums">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
        <p className="text-sm text-primary/70 mt-1">
          Next drip available in {Math.ceil(144 * (remainingTime / COOLDOWN_SECONDS))} blocks
        </p>
      </div>
    );
  }

  return (
    <Button
      onClick={handleRequestTokens}
      className="animate-pulse-glow bg-primary text-primary-foreground hover:bg-primary/80 hover:shadow-[0_0_30px_theme(colors.primary)] h-14 px-8 text-lg font-bold tracking-widest border-2 border-primary/50 hover:border-primary"
    >
      REQUEST {DRIP_AMOUNT_USTX / 1_000_000} STX
    </Button>
  );
}
