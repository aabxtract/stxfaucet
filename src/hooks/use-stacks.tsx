"use client";

import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface StacksContextType {
  connect: () => void;
  disconnect: () => void;
  userSession: UserSession;
  userAddress: string | null;
  connected: boolean;
}

const StacksContext = createContext<StacksContextType | null>(null);

export function StacksProvider({ children }: { children: ReactNode }) {
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  useEffect(() => {
    const appConfig = new AppConfig(["store_write", "publish_data"]);
    const session = new UserSession({ appConfig });
    setUserSession(session);
    
    if (session.isUserSignedIn()) {
      const userData = session.loadUserData();
      setUserAddress(userData.profile.stxAddress.mainnet);
    }
  }, []);

  const connect = () => {
    if (!userSession) return;
    showConnect({
      userSession,
      appName: "NeonDrip Faucet",
      appIcon: typeof window !== "undefined" ? `${window.location.origin}/favicon.ico` : "",
      onFinish: () => {
        if (userSession.isUserSignedIn()) {
            const userData = userSession.loadUserData();
            setUserAddress(userData.profile.stxAddress.mainnet);
        }
      },
      onCancel: () => {
        console.log("User canceled connect");
      },
    });
  };

  const disconnect = () => {
    if (!userSession) return;
    userSession.signUserOut();
    setUserAddress(null);
  };

  if (!userSession) {
    return null; // Or a loading spinner
  }

  const value = {
    userSession,
    connect,
    disconnect,
    userAddress,
    connected: !!userAddress,
  };

  return (
    <StacksContext.Provider value={value}>{children}</StacksContext.Provider>
  );
}

export function useStacks() {
  const context = useContext(StacksContext);
  if (!context) {
    throw new Error("useStacks must be used within a StacksProvider");
  }
  return context;
}
