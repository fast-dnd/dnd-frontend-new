import { useState } from "react";
import { MdDelete } from "react-icons/md";

import { IDungeon } from "@/types/dnd";
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
import Spinner from "@/components/ui/spinner";

import useDeleteDungeon from "../../hooks/use-delete-dungeon";

const DeleteModal = ({ dungeon, isMobile }: { dungeon: IDungeon; isMobile?: boolean }) => {
  const [open, setOpen] = useState(false);

  const { mutate: deleteDungeon, isLoading: isDeleting } = useDeleteDungeon();

  const onDelete = () => {
    deleteDungeon(dungeon._id, { onSuccess: () => setOpen(false) });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex w-full">
        {isMobile ? (
          <div className="flex w-full items-center justify-center gap-2 bg-white/10 px-3 py-2">
            <MdDelete />
            <p>Delete</p>
          </div>
        ) : (
          <MdDelete className="cursor-pointer text-2xl text-white/75 transition-colors duration-300 hover:text-error" />
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Dungeon</DialogTitle>
          <DialogDescription>This action cannot be reversed.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button className="w-fit px-8 py-3" variant="outline" onClick={() => setOpen(false)}>
            CANCEL
          </Button>
          <Button className="flex w-fit gap-2 whitespace-nowrap px-8 py-3" onClick={onDelete}>
            {isDeleting && <Spinner className="m-0 h-4 w-4" />}
            <p>Delete</p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
