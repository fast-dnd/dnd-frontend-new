"use client";

import Link from "next/link";
import { Copy } from "iconsax-react";
import { ChevronLeft } from "lucide-react";

import useCopy from "@/hooks/use-copy";
import { jibril } from "@/utils/fonts";

const TranscriptHeader = () => {
  const { copied, onCopy } = useCopy();

  return (
    <div className="relative flex w-full items-center justify-between rounded-t-md bg-dark-900 px-12 py-6">
      <Link href="/home" className="invisible flex gap-2 font-bold uppercase">
        <ChevronLeft /> Go back
      </Link>
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
        className="flex cursor-pointer gap-2 rounded-md bg-white/5 px-4 py-3 font-semibold uppercase text-white/50"
        onClick={() => onCopy(window.location.href)}
      >
        {copied ? "Copied!" : "Copy share link"}
        <Copy variant="Bold" />
      </div>
    </div>
  );
};

export default TranscriptHeader;
