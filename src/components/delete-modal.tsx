import { useState } from "react";
import { Trash } from "iconsax-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDeleteCampaign from "@/hooks/mutations/use-delete-campaign";
import useDeleteDungeon from "@/hooks/mutations/use-delete-dungeon";

const DeleteModal = ({ id, type }: { id: string; type: "adventure" | "campaign" }) => {
  const [open, setOpen] = useState(false);

  const { mutate: deleteDungeon, isLoading: isDeletingDungeon } = useDeleteDungeon();
  const { mutate: deleteCampaign, isLoading: isDeletingCampaign } = useDeleteCampaign();

  const onDelete = () => {
    if (type === "campaign") return deleteCampaign(id, { onSuccess: () => setOpen(false) });
    if (type === "adventure") return deleteDungeon(id, { onSuccess: () => setOpen(false) });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 text-white/50 transition-all duration-200 hover:text-error">
          <p>Delete</p>
          <Trash variant="Bold" />
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {type}</DialogTitle>
          <DialogDescription>This action cannot be reversed.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-fit px-8 py-3" variant="outline" onClick={() => setOpen(false)}>
            CANCEL
          </Button>
          <Button
            className="flex w-fit gap-2 whitespace-nowrap px-8 py-3"
            onClick={onDelete}
            isLoading={isDeletingDungeon || isDeletingCampaign}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
