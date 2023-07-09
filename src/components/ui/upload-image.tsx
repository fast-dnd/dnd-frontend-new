import Image from "next/image";
import { cn } from "@/utils/style-utils";
import { FiUpload } from "react-icons/fi";

interface IUploadImageProps {
  image?: string;
  inputFile: React.MutableRefObject<HTMLInputElement | null>;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  defaultImage?: string;
}

const UploadImage = ({ image, inputFile, onClick, defaultImage }: IUploadImageProps) => {
  return (
    <div className={cn("relative h-[180px] w-[180px] lg:h-[250px] lg:w-[250px]")}>
      <div
        className={cn(
          "absolute z-10 flex h-[180px] w-[180px] cursor-pointer flex-col items-center justify-center gap-4 bg-black/50 text-white/75 hover:bg-black/30 lg:h-[250px] lg:w-[250px]",
          image && "bg-black/20",
        )}
        onClick={onClick}
      >
        <input type="file" ref={inputFile} className="hidden" accept="image/*" />
        <FiUpload className="h-12 w-12 lg:h-24 lg:w-24" />
        <p className="text-center indent-[0.07em] text-xs font-medium uppercase tracking-wider lg:tracking-[0.07em]">
          UPLOAD IMAGE
        </p>
      </div>
      <Image
        src={image || defaultImage || "/images/bg-cover.png"}
        width={250}
        height={250}
        className={cn("h-[180px] w-[180px] lg:h-[250px] lg:w-[250px]", !image && "opacity-40")}
        alt="upload"
      />
    </div>
  );
};

export default UploadImage;
