import { useState } from "react";
import { MdDelete } from "react-icons/md";

import { ICampaign } from "@/types/dungeon";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import useDeleteCampaign from "../../hooks/use-delete-campaign";

const DeleteModal = ({ campaign, isMobile }: { campaign: ICampaign; isMobile?: boolean }) => {
  const [open, setOpen] = useState(false);

  const { mutate: deleteCampaign, isLoading: isDeleting } = useDeleteCampaign();

  const onDelete = () => {
    deleteCampaign(campaign._id, { onSuccess: () => setOpen(false) });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isMobile ? (
        <DialogTrigger className="flex w-full">
          <div className="flex w-full items-center justify-center gap-2 bg-white/10 px-3 py-2">
            <MdDelete />
            <p>Delete</p>
          </div>
        </DialogTrigger>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <DialogTrigger asChild>
              <TooltipTrigger className="flex items-center justify-center">
                <MdDelete className="cursor-pointer text-2xl text-white/75 transition-colors duration-300 hover:text-error" />
              </TooltipTrigger>
            </DialogTrigger>
            <TooltipContent className="border-error">
              <p className="text-error">Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Campaign</DialogTitle>
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
