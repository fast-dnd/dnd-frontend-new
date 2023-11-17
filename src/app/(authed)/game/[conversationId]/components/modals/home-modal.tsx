import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { gameStore } from "../../stores/game-store";

const HomeModal = () => {
  const pageState = gameStore.pageState.use();

  const router = useRouter();
  const [goingHome, setGoingHome] = useState(false);

  return (
    <Dialog
      open={pageState === "GOHOME"}
      onOpenChange={(isOpen) => {
        if (!isOpen) gameStore.pageState.set("DEFAULT");
      }}
    >
      <DialogContent className="flex h-full w-full flex-col max-lg:max-w-full max-lg:bg-dark-900 lg:h-fit lg:w-fit">
        <div className="pointer-events-none absolute inset-0 bg-radialGradient lg:hidden" />
        <DialogHeader className="justify-center max-lg:h-full">
          <DialogTitle>Leave the game?</DialogTitle>
          <DialogDescription className="text-center tracking-normal">
            Stepping away? Remember, each game phase waits for 10 minutes. Miss it, and face a loss.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col items-center max-lg:gap-4 lg:flex-row">
          <Button
            className="w-fit whitespace-nowrap px-4 py-3 text-base max-lg:w-52 lg:px-16 lg:text-xl"
            variant="outline"
            onClick={() => {
              setGoingHome(true);
              router.push("/home");
            }}
            isLoading={goingHome}
          >
            EXIT GAME
          </Button>
          <Button
            className="w-fit whitespace-nowrap px-4 py-3 text-base max-lg:w-52 lg:px-8 lg:text-xl"
            onClick={() => gameStore.pageState.set("DEFAULT")}
            autoFocus
          >
            STAY AND PLAY
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HomeModal;
