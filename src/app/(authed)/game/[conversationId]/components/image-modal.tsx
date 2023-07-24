import Image from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ImageModal = ({ image }: { image: string }) => {
  return (
    <Dialog>
      <Image
        src={image || "/images/default-dungeon.png"}
        alt="dungeon"
        height={2048}
        width={2048}
        className="w-full lg:hidden"
        draggable={false}
      />
      <DialogTrigger className="hidden lg:block">
        <Image
          src={image || "/images/default-dungeon.png"}
          alt="dungeon"
          height={2048}
          width={2048}
          className="w-full"
          draggable={false}
        />
      </DialogTrigger>
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
