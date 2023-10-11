import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/utils/style-utils";

const ImageModal = ({ image }: { image: string }) => {
  const isMobileTablet = useMediaQuery("(max-width: 1024px)");

  const DungeonImage = ({ isModal }: { isModal?: boolean }) => (
    <Image
      src={image}
      alt="dungeon"
      height={512}
      width={512}
      className={cn("w-full", isModal && "w-[90vh] p-2")}
      draggable={false}
    />
  );

  return (
    <Dialog>
      <DialogTrigger disabled={isMobileTablet} className="w-full">
        <DungeonImage />
      </DialogTrigger>
      <DialogContent showCloseIcon>
        <DungeonImage isModal />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
