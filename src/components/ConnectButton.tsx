"use client";

import { Button } from "@/components/ui/button";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState } from "react";
import { Loader, Wallet } from "lucide-react";

export function ConnectButton() {
  const { isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      const connector = connectors.find((c) => c.name === "Coinbase Wallet");
      if (connector) {
        connect({ connector });
      }
    } catch (error) {
      console.error("Connection error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isConnected) {
    return (
      <Button
        variant="outline"
        className="border-base-blue text-base-blue hover:bg-base-blue/10"
        onClick={() => disconnect()}
      >
        Disconnect
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-full mb-6">
        <Wallet className="h-16 w-16 text-blue-500" />
      </div>
      <h3 className="text-xl font-medium mb-2">Connect Your Wallet</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
        Connect with Coinbase Smart Wallet features and enjoy gasless
        transactions.
      </p>
      <Button
        onClick={handleConnect}
        className="bg-base-gradient hover:opacity-90 transition-opacity"
        disabled={isLoading || isPending}
      >
        {isLoading || isPending ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : (
          "Sign in / Sign up"
        )}
      </Button>
    </div>
  );
}
