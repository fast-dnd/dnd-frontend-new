import Image from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/utils/style-utils";

const ImageModal = ({ image }: { image: string }) => {
  const DungeonImage = ({ isModal }: { isModal?: boolean }) => (
    <Image
      src={image || "/images/default-dungeon.png"}
      width={1024}
      height={1024}
      alt="dungeon image"
      className={cn(
        "aspect-video w-full rounded-md object-cover",
        isModal && "aspect-square min-w-[300px] lg:w-[90vh] lg:p-2",
      )}
    />
  );

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <DungeonImage />
      </DialogTrigger>
      <DialogContent showCloseIcon>
        <DungeonImage isModal />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
