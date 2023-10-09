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
      <DialogContent className="w-fit lg:w-fit">
        <DialogHeader>
          <DialogTitle>Leave the game?</DialogTitle>
          <DialogDescription className="text-center">
            Stepping away? Remember, each game phase waits for 10 minutes. Miss it, and face a loss.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-fit whitespace-nowrap px-4 py-3 text-base lg:px-16 lg:text-xl"
            variant="outline"
            onClick={() => {
              setGoingHome(true);
              gameStore.pageState.set("DEFAULT");
              router.push("/home");
            }}
            isLoading={goingHome}
          >
            EXIT GAME
          </Button>
          <Button
            className="w-fit whitespace-nowrap px-4 py-3 text-base lg:px-8 lg:text-xl"
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
