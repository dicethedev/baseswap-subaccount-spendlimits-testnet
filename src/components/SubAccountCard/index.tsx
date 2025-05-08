import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

interface SubAccountProps {
  address: string;
  allowance: string;
  created: string;
  onSendTransaction: (to: string, amount: number) => Promise<void>;
}

const SubAccountCard = ({
  address,
  allowance,
  created,
  onSendTransaction,
}: SubAccountProps) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSendTransaction = async () => {
    if (!recipient || !amount) return;

    await onSendTransaction(recipient, parseFloat(amount));
    setIsDialogOpen(false);
  };

  return (
    <Card className="border border-[#F0F0F0] bg-gradient-to-br from-white to-[#F9F9F9] shadow-md shadow-[#0052FF]/10 **:transition-all hover:shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-mono text-[#0052FF]">
          {address.slice(0, 6)}...{address.slice(-4)}
        </CardTitle>
        <CardDescription>Created: {created}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between items-center">
          <span className="font-medium">Allowance:</span>
          <span>{allowance}</span>
        </div>
      </CardContent>

      <CardFooter>
        {/* --------------------- Modal Details is here ---------------- */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full border-[#0052FF]/20 hover:bg-[#0052FF]/10"
            >
              Send Transaction <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>

          <DialogContent className="border border-[#F0F0F0] bg-gradient-to-br from-white to-[#F9F9F9]">
            <DialogHeader>
              <DialogTitle className="text-[#0052FF]">
                Send Transaction
              </DialogTitle>
              <DialogDescription>
                Send funds from your sub-account without requiring approval
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder="0x..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount (ETH)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.01"
                  step="0.001"
                  min="0"
                  max={parseFloat(allowance.split(" ")[0])}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleSendTransaction}
                className="bg-[#0052FF] hover:bg-[#0052FF]/90 text-white cursor-pointer"
              >
                Send Transaction
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default SubAccountCard;
