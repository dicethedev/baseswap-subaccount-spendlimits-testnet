"use client";

import { useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
} from "wagmi";
import { parseEther } from "viem";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, ArrowRight, ChevronRight, Wallet } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const tokens = ["ETH", "USDC", "DAI"];

export default function Home() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const {
    sendTransactionAsync,
    data: txData,
    error: txError,
    isPending,
  } = useSendTransaction();

  const [amount, setAmount] = useState("0.001");
  const [recipient, setRecipient] = useState("0x");
  const [swapFrom, setSwapFrom] = useState("ETH");
  const [swapTo, setSwapTo] = useState("USDC");
  const [swapAmount, setSwapAmount] = useState("0.001");
  const [currentTab, setCurrentTab] = useState("send");
  const [txHistory, setTxHistory] = useState<
    Array<{
      type: "send" | "swap";
      amount: string;
      to: string;
      from?: string;
      hash: `0x${string}`;
      timestamp: number;
    }>
  >([]);

  const handleSend = async () => {
    try {
      const tx = await sendTransactionAsync({
        to: recipient as `0x${string}`,
        value: parseEther(amount),
      });

      // Add to transaction history
      setTxHistory((prev) => [
        {
          type: "send",
          amount,
          to: recipient,
          hash: tx,
          timestamp: Date.now(),
        },
        ...prev,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSwap = async () => {
    // For this demo, we'll just simulate a swap using a regular transaction
    try {
      const tx = await sendTransactionAsync({
        to: "0x0000000000000000000000000000000000000000", // Demo swap address
        value: parseEther(swapAmount),
        data: "0x", // Would include swap function data in a real app
      });

      // Add to transaction history
      setTxHistory((prev) => [
        {
          type: "swap",
          from: swapFrom,
          to: swapTo,
          amount: swapAmount,
          hash: tx,
          timestamp: Date.now(),
        },
        ...prev,
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#0052FF]">
                BaseSwap
              </h1>

              <p className="text-[#8E9196] mt-2">
                No-popup transactions with Smart Wallet Sub Accounts and Spend
                Limits
              </p>
            </div>
            <Badge
              variant="outline"
              className="px-3 py-1 bg-blue-100 text-white dark:bg-blue-900"
            >
              {account?.chain?.name ? account.chain.name : "Not Available"}
            </Badge>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          <Card className="md:col-span-2  bg-gradient-to-br from-white to-gray-100 shadow-lg shadow-[#0052FF]/10 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl">Wallet</CardTitle>
              <CardDescription>
                Send tokens or swap with no popups
              </CardDescription>
            </CardHeader>

            <CardContent>
              {!account.isConnected ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="bg-blue-50 dark:bg-blue-300/30 p-6 rounded-full mb-6">
                    <Wallet className="h-16 w-16 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    Connect Your Wallet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
                    Connect with Coinbase Wallet to access Smart Wallet features
                    and enjoy gasless transactions.
                  </p>
                  {connectors
                    .filter((connector) => connector.name === "Coinbase Wallet")
                    .map((connector) => (
                      <Button
                        key={connector.uid}
                        onClick={() => connect({ connector })}
                        className="w-full  max-w-xs text-white bg-[#0052FF] hover:bg-[#0052FF]/90"
                        size="lg"
                      >
                        Sign in with Smart Wallet
                      </Button>
                    ))}
                </div>
              ) : (
                <>
                  <div className="mb-6 bg-[#F0F0F0]/50 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Connected Address</p>
                      <p className="font-mono text-sm">
                        {account.addresses?.[0]?.slice(0, 8)}...
                        {account.addresses?.[0]?.slice(-6)}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-600 cursor-pointer font-normal text-red-600 hover:bg-red-600/10"
                      onClick={() => disconnect()}
                    >
                      Disconnect
                    </Button>
                  </div>

                  <Tabs
                    defaultValue="send"
                    value={currentTab}
                    onValueChange={setCurrentTab}
                    className="mb-6"
                  >
                    <TabsList className="grid w-full grid-cols-2 bg-[#F0F0F0]">
                      <TabsTrigger
                        value="send"
                        className="data-[state=active]:bg-white data-[state=active]:text-[#0052FF]"
                      >
                        Send
                      </TabsTrigger>
                      <TabsTrigger
                        value="swap"
                        className="data-[state=active]:bg-white data-[state=active]:text-[#0052FF]"
                      >
                        Swap
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="send" className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="recipient">Recipient Address</Label>
                          <Input
                            id="recipient"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            placeholder="0x..."
                            className="font-mono mt-3"
                          />
                        </div>

                        <div>
                          <Label htmlFor="amount">Amount (ETH)</Label>
                          <Input
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            step="0.001"
                            className="mt-3"
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            Daily limit: 0.01 ETH (No popups needed)
                          </p>
                        </div>

                        <Button
                          className="w-full text-white bg-[#0052FF] hover:bg-[#0052FF]/90"
                          onClick={handleSend}
                          disabled={isPending}
                        >
                          {isPending ? "Sending..." : "Send ETH"}
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="swap" className="pt-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-5 gap-4 items-end">
                          <div className="col-span-2">
                            <Label htmlFor="from" className="mb-2">
                              From
                            </Label>
                            <Select
                              defaultValue={swapFrom}
                              onValueChange={setSwapFrom}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select token" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border font-medium border-gray-200  rounded-lg shadow-lg">
                                {tokens.map((token) => (
                                  <SelectItem key={token} value={token}>
                                    {token}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex justify-center items-center">
                            <ArrowRight className="h-5 w-5 text-gray-400" />
                          </div>

                          <div className="col-span-2">
                            <Label htmlFor="to" className="mb-2">
                              To
                            </Label>
                            <Select
                              defaultValue={swapTo}
                              onValueChange={setSwapTo}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select token" />
                              </SelectTrigger>
                              <SelectContent className="bg-white border font-medium border-gray-200  rounded-lg shadow-lg">
                                {tokens.map((token) => (
                                  <SelectItem key={token} value={token}>
                                    {token}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="swapAmount" className="mb-2">
                            Amount
                          </Label>
                          <Input
                            id="swapAmount"
                            value={swapAmount}
                            onChange={(e) => setSwapAmount(e.target.value)}
                            type="number"
                            step="0.001"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Daily limit: 0.01 ETH (No popups needed)
                          </p>
                        </div>

                        <div className="bg-[#F0F0F0] p-4 rounded-lg">
                          <p className="text-sm text-red-400 dark:text-red-500">
                            Disclaimer: This are dummy estimated to receive....
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Estimated to receive:
                          </p>
                          <p className="font-medium text-lg">
                            {(
                              parseFloat(swapAmount) *
                              (swapTo === "ETH" ? 0.0005 : 1800)
                            ).toFixed(6)}{" "}
                            {swapTo}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Market price: 1 {swapFrom} ={" "}
                            {swapTo === "ETH" ? "0.0005" : "1800"} {swapTo}
                          </p>
                        </div>

                        <Button
                          className="w-full text-white bg-[#0052FF] hover:bg-[#0052FF]/90"
                          onClick={handleSwap}
                          disabled={isPending}
                        >
                          {isPending
                            ? "Swapping..."
                            : `Swap ${swapFrom} to ${swapTo}`}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {txData && (
                    <Alert className="mt-4 bg-green-50 border border-green-200 dark:bg-green-600/30 dark:border-green-800">
                      <AlertCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <AlertTitle className="text-green-600 dark:text-green-400">
                        Transaction Submitted!
                      </AlertTitle>
                      <AlertDescription className="text-green-600 dark:text-green-400">
                        Transaction sent successfully without popup approval!
                      </AlertDescription>
                    </Alert>
                  )}

                  {txError && (
                    <Alert className="mt-4 bg-red-50 border-red-200 dark:bg-red-400/30 dark:border-red-500">
                      <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                      <AlertTitle className="text-red-600 dark:text-red-400">
                        Error
                      </AlertTitle>
                      <AlertDescription className="text-red-600 dark:text-red-400">
                        {txError.message}
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-gray-100 shadow-lg shadow-[#0052FF]/10 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-xl">Transaction History</CardTitle>
              <CardDescription>Your recent activity</CardDescription>
            </CardHeader>

            <CardContent>
              {txHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No transactions yet</p>
                  <p className="text-sm mt-2">Your activity will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {txHistory.map((tx, index) => (
                    <div key={index} className="border-b pb-3 last:border-b-0">
                      <div className="flex justify-between items-center">
                        <Badge
                          variant={tx.type === "send" ? "secondary" : "outline"}
                          className="mb-1 bg-white shadow border border-gray-200 text-[#0052FF]"
                        >
                          {tx.type === "send" ? "Send" : "Swap"}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(tx.timestamp).toLocaleTimeString()}
                        </span>
                      </div>

                      {tx.type === "send" ? (
                        <p className="text-sm font-medium">
                          Sent {tx.amount} ETH to {tx.to.slice(0, 6)}...
                          {tx.to.slice(-4)}
                        </p>
                      ) : (
                        <p className="text-sm font-medium">
                          Swapped {tx.amount} {tx.from} to {tx.to}
                        </p>
                      )}

                      <a
                        href={`https://sepolia.basescan.org/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 dark:text-blue-400 flex items-center mt-1 hover:underline"
                      >
                        View on BaseScan
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>

            <CardFooter className="flex flex-col items-start">
              <div className="bg-[#F0F0F0] p-4 rounded-lg w-full">
                <h4 className="font-bold mb-2">Smart Wallet Benefits</h4>
                <ul className="text-sm font-medium space-y-2 text-black">
                  <li>No transaction popups</li>
                  <li>Daily spend limits of 0.01 ETH</li>
                  <li>Improved UX with Sub Accounts</li>
                  <li>Secure onchain transactions</li>
                </ul>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
