import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import ThemeTitle from "@/components/ui/theme-title";
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
          <ThemeTitle title="killed" />

          <DialogDescription className="text-center">
            Your story has come to a tragic end. <br />
            You have died!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-6">
          <Button className="whitespace-nowrap px-8 py-3 uppercase" onClick={() => close()}>
            spectate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiedModal;
