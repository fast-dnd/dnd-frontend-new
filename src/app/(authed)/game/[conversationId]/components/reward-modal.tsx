"use client";

import Image from "next/image";

import { IReward } from "@/types/reward";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RewardModalProps {
  open: boolean;
  close: () => void;
  reward: IReward | undefined;
}

const RewardModal = ({ open, close, reward }: RewardModalProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(change) => {
        if (!change) close();
      }}
    >
      <DialogContent className="max-h-[700px] w-fit lg:max-w-[550px]">
        <DialogHeader className="lg:px-0">
          <DialogTitle>You earned a reward!</DialogTitle>
          <DialogDescription className="text-center">
            You can use this image as a background for your adventures.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex w-full justify-center lg:mt-8">
          <Image
            src={reward?.url || "/images/default-dungeon.png"}
            alt={reward?.name || "reward"}
            width={256}
            height={256}
            className="h-32 w-32 lg:h-[256px] lg:w-[256px]"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="flex w-fit flex-1 border-primary px-8 text-base lg:text-xl"
            onClick={close}
          >
            CLOSE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RewardModal;
