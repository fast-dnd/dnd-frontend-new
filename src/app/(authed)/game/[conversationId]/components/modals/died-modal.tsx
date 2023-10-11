import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IGameState } from "@/types/room";

import { gameStore } from "../../stores/game-store";

const DiedModal = ({ state }: { state: IGameState }) => {
  const pageState = gameStore.pageState.use();

  const close = () => {
    if (state === "WIN" || state === "LOSE") gameStore.pageState.set("GAMEOVER");
    else gameStore.pageState.set("DEFAULT");
  };

  return (
    <Dialog
      open={pageState === "DIED"}
      onOpenChange={(isOpen) => {
        if (!isOpen) close();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>You are dead</DialogTitle>
          <DialogDescription>
            You have tried with all your might, but you have been defeated.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="whitespace-nowrap px-8 py-3 uppercase" onClick={() => close()}>
            spectate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiedModal;
