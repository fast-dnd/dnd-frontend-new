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
      <DialogContent
        alwaysOnTop
        className="flex flex-col max-lg:h-full max-lg:w-full max-lg:max-w-full max-lg:rounded-none max-lg:bg-dark-900"
      >
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-radialGradient lg:hidden">
          <div className="h-full w-full blur-xl" />
        </div>
        <DialogHeader className="max-lg:h-full max-lg:justify-center">
          <ThemeTitle title="killed" />

          <DialogDescription className="text-center">
            Your story has come to a tragic end. <br />
            You have died!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="">
          <Button
            className="whitespace-nowrap px-8 py-3 uppercase max-lg:w-52"
            onClick={() => close()}
          >
            spectate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiedModal;
