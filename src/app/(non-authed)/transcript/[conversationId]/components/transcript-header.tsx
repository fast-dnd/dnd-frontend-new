import { Copy } from "iconsax-react";

import useCopy from "@/hooks/use-copy";
import { jibril } from "@/utils/fonts";

const TranscriptHeader = () => {
  const { copied, onCopy } = useCopy();

  return (
    <div className="relative flex w-full items-center justify-center rounded-t-md bg-dark-900 px-12 py-6">
      <div className="relative flex items-center justify-center gap-4">
        <div className="h-2 w-2 rotate-45 bg-primary" />
        <p
          className="mt-1 truncate leading-none tracking-widest lg:text-xl lg:leading-7 lg:tracking-[0.2em]"
          style={jibril.style}
        >
          Transcript
        </p>
        <div className="h-2 w-2 rotate-45 bg-primary" />
      </div>
      <div
        className="absolute right-10 flex cursor-pointer gap-2 rounded-md bg-white/5 px-4 py-3 font-semibold uppercase text-white/50 transition-all duration-200 hover:opacity-80"
        onClick={() => onCopy(window.location.href)}
      >
        {copied ? "Copied!" : "Copy share link"}
        <Copy variant="Bold" />
      </div>
    </div>
  );
};

export default TranscriptHeader;
