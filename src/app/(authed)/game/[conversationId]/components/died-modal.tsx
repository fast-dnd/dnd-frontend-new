import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { gameStore } from "../stores/game-store";

const DiedModal = () => {
  const open = gameStore.diedModal.use();

  return (
    <Dialog
      open={open}
      onOpenChange={(change) => {
        if (!change) gameStore.diedModal.set(false);
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
          <Button
            className="whitespace-nowrap px-8 py-3 uppercase"
            onClick={() => gameStore.diedModal.set(false)}
          >
            spectate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiedModal;
