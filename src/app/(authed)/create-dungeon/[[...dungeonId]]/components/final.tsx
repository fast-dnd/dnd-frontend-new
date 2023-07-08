"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import useStore from "@/hooks/use-store";
import React from "react";
import { stepTitles, useDungeonFormStore } from "../stores/form-store";
import useCopy from "@/hooks/use-copy";

const Final = () => {
  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  const [copied, setCopied] = useCopy();

  if (!dungeonFormStore) return null;

  const { dungeonFormData } = dungeonFormStore;

  return (
    <div className="flex w-full h-fit md:h-full">
      <Box
        title="CREATE DUNGEON"
        className="flex flex-col min-h-0 flex-1 p-5 gap-5 md:p-8 md:gap-8 mb-4 md:mb-0"
        wrapperClassName="w-[95%] md:w-[1200px] mx-auto"
      >
        <div className="flex flex-row items-center gap-8 justify-between">
          <p className="text-lg md:text-[22px] leading-7 tracking-[0.15em] font-semibold w-full uppercase">
            {stepTitles["FINAL"]}
          </p>
        </div>
        <div className="w-full border-t border-white/20" />
        <div className="flex flex-1 md:basis-0 min-h-0">
          <div className="w-full">
            <div className="flex flex-col gap-8">
              <p className="md:text-xl tracking-[0.07em] -my-1 text-white/50 break-words">
                This is your Dungeon ID. Copy to share with your friends!
              </p>
              <div className="flex flex-col md:flex-row items-center gap-8">
                <p className="px-4 py-2 bg-white/5 font-medium text-center md:text-2xl tracking-widest w-full">
                  {dungeonFormData.id}
                </p>
                <Button
                  className="w-full md:w-fit px-8"
                  onClick={() => {
                    navigator.clipboard.writeText(dungeonFormData.id ?? "");
                    setCopied(true);
                  }}
                >
                  {copied ? "COPIED" : "COPY"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Final;
