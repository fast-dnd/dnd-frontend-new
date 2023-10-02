import { useRouter } from "next/navigation";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export interface IStatusModalContent {
  title: string;
  description: string;
  actionText: string;
  href: string;
}

export interface IStatusModalProps {
  open: boolean;
  onClose?: () => void;
  content: IStatusModalContent;
}

const StatusModal = ({
  open,
  onClose,
  content: { title, description, actionText, href },
}: IStatusModalProps) => {
  const router = useRouter();
  return (
    <Dialog
      open={open}
      onOpenChange={(change) => {
        if (!change) onClose?.();
      }}
    >
      <DialogContent className="max-h-[700px] w-fit lg:max-w-[550px]">
        <DialogHeader className="lg:m-0">
          <DialogTitle className="whitespace-nowrap">{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="primary"
            className="flex w-fit flex-1 whitespace-nowrap px-8 text-base lg:text-xl"
            onClick={() => {
              if (href) router.push(href);
            }}
          >
            {actionText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
