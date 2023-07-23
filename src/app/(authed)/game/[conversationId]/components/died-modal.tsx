import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DiedModal = ({ open, close }: { open: boolean; close: () => void }) => {
  return (
    <Dialog
      open={open}
      onOpenChange={(change) => {
        if (!change) close();
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
          <Button className="whitespace-nowrap px-8 py-3 uppercase" onClick={close}>
            spectate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DiedModal;
