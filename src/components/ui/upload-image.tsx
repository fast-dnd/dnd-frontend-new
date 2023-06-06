import { cn } from "@/utils/style-utils";
import { toBase64 } from "@/utils/to-base64";
import Image from "next/image";
import { AiOutlineUpload } from "react-icons/ai";

const UploadImage = (props: {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  inputFile: React.MutableRefObject<HTMLInputElement | null>;
}) => {
  const { image, setImage, inputFile } = props;
  return (
    <div className="relative h-[250px] w-[250px]">
      <div
        className={cn(
          "absolute h-[250px] w-[250px] bg-black/50 text-white/75 flex flex-col z-10 gap-4 items-center cursor-pointer justify-center",
          image && "bg-black/20"
        )}
        onClick={() => {
          inputFile.current?.click();
        }}
      >
        <input
          type="file"
          ref={inputFile}
          className="hidden"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const base64 = await toBase64(file as File);
            setImage(base64 as string);
          }}
        />
        <AiOutlineUpload size={90} />
        <p className="text-xs font-medium tracking-[0.07em] text-center indent-[0.07em] uppercase">
          UPLOAD IMAGE
        </p>
      </div>
      <Image
        src={image || "/images/bg-cover.png"}
        width={250}
        height={250}
        className={cn("h-[250px]", !image && "opacity-40")}
        alt="upload"
      />
    </div>
  );
};

export default UploadImage;
