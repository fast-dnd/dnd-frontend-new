import React from "react";
import { GoGift } from "react-icons/go";

import useRedeemCoupon from "@/hooks/use-redeem-coupon";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";

const ClaimRewardModal = () => {
  const [code, setCode] = React.useState("");

  const { mutate: redeemCoupon, isLoading } = useRedeemCoupon();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center gap-2 rounded-md border-2 border-primary bg-dark-900/50 p-4 text-sm tracking-widest backdrop-blur-sm transition-all duration-200 hover:opacity-80">
          <GoGift />
          CLAIM REWARD
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reedem your coupon</DialogTitle>
          <DialogDescription>Enter coupon coude to redeem rewards</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Input
            placeholder="Enter your code..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button
            className="mb-2 flex w-fit gap-2 whitespace-nowrap"
            onClick={() => redeemCoupon({ code })}
            isLoading={isLoading}
          >
            REDEEM
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimRewardModal;
