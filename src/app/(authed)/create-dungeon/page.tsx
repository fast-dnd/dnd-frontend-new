"use client";

import React, { useState } from "react";
import { stepTitles } from "./types/create-dungeon";
import { useRouter } from "next/navigation";
import { AiOutlineLeft } from "react-icons/ai";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

const CreateDungeon = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);

  return (
    <div className="flex justify-center mt-16">
      <div className="flex flex-col items-center gap-8">
        <div
          className="flex flex-row gap-1 w-full font-medium items-center tracking-[0.08em] cursor-pointer uppercase"
          onClick={() => router.back()}
        >
          <AiOutlineLeft className="inline-block" /> GO BACK
        </div>
        <div>
          <Box title="CREATE DUNGEON" className="flex flex-col gap-8 p-8">
            <div className="flex flex-row items-center gap-8 justify-between">
              <p className=" text-[22px] leading-7 tracking-[0.15em] font-semibold uppercase">
                {step + 1}. {stepTitles[step]}
              </p>
              <Button className="w-fit px-8">NEXT STEP</Button>
            </div>
            <div className="w-full border-t border-white/20" />
            <div></div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CreateDungeon;
