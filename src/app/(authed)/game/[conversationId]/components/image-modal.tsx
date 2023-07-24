import Image from "next/image";

import { cn } from "@/utils/style-utils";
import useMediaQuery from "@/hooks/use-media-query";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ImageModal = ({ image }: { image: string }) => {
  const isMobileTablet = useMediaQuery("(max-width: 1024px)");

  const DungeonImage = ({ isModal }: { isModal?: boolean }) => (
    <Image
      src={image}
      alt="dungeon"
      height={512}
      width={512}
      className={cn("w-full", isModal && "p-2")}
      draggable={false}
    />
  );

  return (
    <Dialog>
      <DialogTrigger disabled={isMobileTablet} className="h-fit w-fit bg-red-500">
        <DungeonImage />
      </DialogTrigger>
      <DialogContent showCloseIcon>
        <DungeonImage isModal />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
