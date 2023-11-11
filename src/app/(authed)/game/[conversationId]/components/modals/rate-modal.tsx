import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Star1 } from "iconsax-react";
import { AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { TextArea } from "@/components/ui/text-area";
import { IDungeonDetail } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";

import useRateDungeon from "../../hooks/use-rate-dungeon";
import { gameStore } from "../../stores/game-store";

const RateModal = ({
  dungeon,
  conversationId,
}: {
  dungeon: IDungeonDetail;
  conversationId: string;
}) => {
  const isMobileTablet = useMediaQuery("(max-width: 1024px)");
  const pageState = gameStore.pageState.use();
  const rewardOpen = gameStore.reward.use();

  const open = pageState === "RATE" && !rewardOpen;

  const close = () => {
    gameStore.pageState.set("DEFAULT");
  };

  const [rating, setRating] = useState(3);
  const [hovered, setHovered] = useState<number>();
  const { mutate } = useRateDungeon();

  const rateDungeon = () => {
    mutate({ dungeonId: dungeon._id, rating, roomId: conversationId });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) close();
      }}
    >
      <DialogContent
        fromBottom={isMobileTablet}
        className="max-lg:bottom-0 max-lg:left-0 max-lg:top-auto max-lg:h-fit max-lg:w-full max-lg:max-w-full max-lg:translate-x-0 max-lg:translate-y-0 max-lg:rounded-none max-lg:rounded-t-md max-lg:p-0 "
      >
        <DialogHeader className="relative max-lg:items-start max-lg:gap-2 max-lg:p-6">
          <AiOutlineClose className="absolute right-3 top-4 h-4 w-4 lg:hidden" onClick={close} />
          <DialogTitle className="line-clamp-3 break-words uppercase">
            RATE YOUR ADVENTURE
            <span className="max-lg:hidden">IN {dungeon.name}</span>
          </DialogTitle>

          <DialogDescription className="text-center text-base leading-7 tracking-tight lg:w-[530px]">
            Your bravery led you through the twists and turns of {dungeon.name}. We value your
            feedback. How did you find your journey?
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col items-center gap-6 lg:mt-8 lg:gap-8">
          <div className="flex w-full justify-center gap-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Star1
                key={i + 1}
                onMouseEnter={() => {
                  if (!isMobileTablet) setHovered(i + 1);
                }}
                onMouseLeave={() => {
                  if (!isMobileTablet) setHovered(undefined);
                }}
                onClick={() => {
                  if (rating === i + 1) setRating(0);
                  else setRating(i + 1);
                }}
                className={cn(
                  "h-12 w-12 fill-transparent text-warning transition-all duration-200 lg:text-primary",
                  hovered === undefined
                    ? rating >= i + 1 && "fill-warning lg:fill-primary"
                    : hovered >= i + 1 && "lg:fill-primary",
                )}
              />
            ))}
          </div>
          <div className="flex w-full flex-col gap-4 max-lg:px-4 max-lg:pb-6">
            <div className="h-0.5 w-full bg-black shadow-lobby lg:hidden" />
            <TextArea
              placeholder="Leave your comments or suggestions here"
              label="Additional comment"
              rows={3}
            />
          </div>
        </div>
        <DialogFooter className="items-center max-lg:m-0 max-lg:flex-col">
          <Button
            variant="outline"
            className="flex max-w-full flex-1 px-4 text-sm max-lg:hidden lg:w-fit lg:px-8 lg:text-xl"
            onClick={close}
          >
            cancel
          </Button>
          <Button
            autoFocus
            variant="primary"
            className="flex w-fit max-w-full flex-1 whitespace-nowrap px-4 text-sm max-lg:w-full max-lg:rounded-none lg:px-8 lg:text-xl"
            onClick={() => {
              rateDungeon();
              close();
            }}
          >
            rate this adventure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RateModal;
