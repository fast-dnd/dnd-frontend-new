"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import useCopy from "@/hooks/use-copy";

import { dungeonFormStore } from "../stores/dungeon-form-store";
import { stepTitles } from "../utils/step-utils";

const Final = () => {
  const dungeonId = dungeonFormStore.dungeonFormData._id.use();

  const [copied, setCopied] = useCopy();

  return (
    <div className="flex h-fit w-full lg:h-full">
      <Box
        title="CREATE DUNGEON"
        className="mb-4 flex min-h-0 flex-1 flex-col gap-5 p-5 lg:mb-0 lg:gap-8 lg:p-8"
        wrapperClassName="w-[95%] lg:w-[1200px] mx-auto"
      >
        <div className="flex flex-row items-center justify-between gap-8">
          <p className="w-full text-lg font-semibold uppercase leading-7 tracking-[0.15em] lg:text-[22px]">
            {stepTitles["FINAL"]}
          </p>
        </div>
        <div className="w-full border-t border-white/20" />
        <div className="flex min-h-0 flex-1 lg:basis-0">
          <div className="w-full">
            <div className="flex flex-col gap-8">
              <p className="-my-1 break-words tracking-[0.07em] text-white/50 lg:text-xl">
                This is your Dungeon ID. Copy to share with your friends!
              </p>
              <div className="flex flex-col items-center gap-8 lg:flex-row">
                <p className="w-full bg-white/5 px-4 py-2 text-center font-medium tracking-widest lg:text-2xl">
                  {dungeonId}
                </p>
                <Button
                  className="w-full px-8 lg:w-fit"
                  onClick={() => {
                    navigator.clipboard.writeText(dungeonId ?? "");
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
