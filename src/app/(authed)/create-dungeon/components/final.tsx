"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import useStore from "@/hooks/use-store";
import React from "react";
import { stepTitles, useDungeonFormStore } from "../stores/form-store";

const Final = () => {
  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  const [copied, setCopied] = React.useState(false);

  if (!dungeonFormStore) return null;

  const { dungeonFormData } = dungeonFormStore;

  return (
    <div className="flex h-full">
      <Box title="CREATE DUNGEON" className="flex flex-col gap-8 min-h-0 flex-1 w-[1200px] p-8">
        <div className="flex flex-row items-center gap-8 justify-between">
          <p className="text-[22px] leading-7 tracking-[0.15em] font-semibold w-full uppercase">
            {stepTitles["FINAL"]}
          </p>
        </div>
        <div className="w-full border-t border-white/20" />
        <div className="flex flex-1 basis-0 min-h-0">
          <div className="w-full">
            <div className="flex flex-col gap-8">
              <p className="text-xl tracking-[0.07em] -my-1 text-white/50">
                Copy to share with your friends!
              </p>
              <div className="flex items-center gap-8">
                <p className="px-4 py-2 bg-white/5 font-medium text-2xl tracking-widest w-full">
                  {dungeonFormData.id}
                </p>
                <Button
                  className="w-fit px-8"
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
