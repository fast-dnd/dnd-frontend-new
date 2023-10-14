import React from "react";
import { GoGift } from "react-icons/go";
import { toast } from "sonner";

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
          <DialogDescription>This action cannot be reversed.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Input placeholder="Enter your..." />
          <Button
            className="mb-2 flex w-fit gap-2 whitespace-nowrap"
            onClick={() => toast.success("Claimed!")}
          >
            REDEEM
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimRewardModal;
