"use client";

import { useRef } from "react";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";

import { fileToBase64 } from "@/utils/b64";
import { cn } from "@/utils/style-utils";

interface IUploadImageProps {
  image?: string;
  setImage?: (image: string) => void;
  defaultImage?: string;
}

const UploadImage = ({ image, setImage, defaultImage }: IUploadImageProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const addImage = () => {
    imageRef.current?.click();
    imageRef.current?.addEventListener("change", async (e) => {
      setImage?.((await fileToBase64((e.target as HTMLInputElement).files?.[0])) as string);
    });
  };

  return (
    <div className={cn("relative size-[170px] rounded-md")}>
      <div
        className={cn(
          "absolute z-10 flex size-[170px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md bg-black/50 text-white/75 hover:bg-black/30",
          image && "bg-black/20",
        )}
        onClick={addImage}
      >
        <input type="file" ref={imageRef} className="hidden" accept="image/*" />
        <FiUpload className="size-8" />
        <p className="text-center indent-[0.07em] text-xs font-medium uppercase tracking-wider lg:tracking-[0.07em]">
          UPLOAD THUMBNAIL
        </p>
      </div>
      <Image
        src={image || defaultImage || "/images/bg-cover.png"}
        width={170}
        height={170}
        className={cn("size-[170px] rounded-md", !image && "opacity-40")}
        alt="upload"
        style={{ objectFit: "cover" }}
      />
    </div>
  );
};

export default UploadImage;
