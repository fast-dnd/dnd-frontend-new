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
      <div className="relative h-[39px] w-[94px]" onClick={() => setGenerate(!generate)}>
        <div className="absolute left-0 top-0 h-[39px] w-[94px] rounded-full border border-white/10 bg-black backdrop-blur-[10px]" />
        <div
          className={cn(
            "absolute top-[10px] text-sm font-semibold text-white text-opacity-25 transition-all duration-300",
            generate ? "left-[12px]" : "right-[12px]",
          )}
        >
          {generate ? "ON" : "OFF"}
        </div>
        <motion.div
          className={cn(
            "absolute top-0 flex h-[36px] w-[36px] items-center justify-center rounded-full border border-white/10 backdrop-blur-[10px]",
          )}
          animate={{
            x: generate ? "54px" : "0px",
            backgroundColor: generate ? "#FF5A5A" : "#171716",
          }}
          transition={{
            duration: 0.3,
          }}
        >
          {type === "Image" ? <ImageIcon variant="Bold" /> : <Headphone variant="Bold" />}
        </motion.div>
      </div>
    </div>
  );
};

export default ImageAudioToggle;
