import React from "react";
import { motion } from "framer-motion";
import { Headphone, Image as ImageIcon } from "iconsax-react";

import { cn } from "@/utils/style-utils";

interface ImageAudioToggleProps {
  setGenerate: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  generate: boolean | undefined;
  disabled: boolean | undefined;
  type: "Audio" | "Image";
}

const ImageAudioToggle = ({ generate, setGenerate, disabled, type }: ImageAudioToggleProps) => {
  return (
    <div className={cn("flex items-center gap-2", disabled && "pointer-events-none opacity-40")}>
      <p className="text-sm font-medium">{type}:</p>
      <div
        className="relative h-[39px] w-[94px] rounded-full border border-white/10 bg-black"
        onClick={() => setGenerate(!generate)}
      >
        <div
          className={cn(
            "absolute top-0 flex h-full items-center px-3 text-sm font-semibold text-white text-opacity-25 transition-all duration-300",
            generate ? "left-0" : "right-0",
          )}
        >
          {generate ? "ON" : "OFF"}
        </div>
        <div className={cn("absolute top-0 flex h-full w-full items-center justify-start py-0.5")}>
          <motion.div
            className={cn(
              "absolute flex h-[35px] w-[35px] items-center justify-center rounded-full",
            )}
            animate={{
              left: generate ? "auto" : "2px",
              right: generate ? "2px" : "auto",
              backgroundColor: generate ? "#FF5A5A" : "#171716",
            }}
            transition={{
              duration: 0.3,
            }}
          >
            {type === "Image" ? (
              <ImageIcon className="h-5 w-5" variant="Bold" />
            ) : (
              <Headphone className="h-5 w-5" variant="Bold" />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImageAudioToggle;
