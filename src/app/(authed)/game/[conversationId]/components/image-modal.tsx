import Image from "next/image";

import { cn } from "@/utils/style-utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ImageModal = ({
  image,
  isMobile,
  className,
}: {
  image: string;
  isMobile?: boolean;
  className?: string;
}) => {
  return (
    <Dialog>
      {isMobile ? (
        <Image
          src={image || "/images/default-dungeon.png"}
          alt="dungeon"
          height={2048}
          width={2048}
          className={cn("w-full", className)}
          draggable={false}
        />
      ) : (
        <DialogTrigger>
          <Image
            src={image || "/images/default-dungeon.png"}
            alt="dungeon"
            height={2048}
            width={2048}
            className={cn("w-full", className)}
            draggable={false}
          />
        </DialogTrigger>
      )}
      <DialogContent>
        <Image
          src={image}
          alt="image-modal"
          className="h-screen w-full object-cover"
          height={512}
          width={512}
          quality={100}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
