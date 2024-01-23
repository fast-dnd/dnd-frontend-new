import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import useRewardSocket from "../../hooks/use-reward-socket";
import { gameStore } from "../../stores/game-store";

const RewardModal = ({ conversationId }: { conversationId: string }) => {
  const { reward } = useRewardSocket(conversationId);

  const rewardOpen = gameStore.reward.use();
  const pageState = gameStore.pageState.use();

  const open =
    (pageState === "DEFAULT" || pageState === "GAMEOVER" || pageState === "RATE") &&
    rewardOpen &&
    !!reward;
  const close = () => gameStore.reward.set(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) close();
      }}
    >
      <DialogContent
        alwaysOnTop
        className="h-full w-full max-lg:max-w-full max-lg:rounded-none max-lg:bg-dark-900 lg:h-fit lg:w-fit lg:max-w-[550px]"
      >
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
            className="aspect-square w-[256px] max-w-full"
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="flex w-fit border-primary px-8 text-base lg:text-xl"
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
