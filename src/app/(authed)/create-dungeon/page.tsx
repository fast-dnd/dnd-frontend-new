"use client";

import React, { useRef, useState } from "react";
import { stepTitles, steps } from "./types/create-dungeon";
import { useRouter } from "next/navigation";
import { AiOutlineLeft } from "react-icons/ai";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { IPostLocation } from "@/services/dndService";
import Dungeon from "./components/dungeon";

const CreateDungeon = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [locations, setLocations] = useState<IPostLocation[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");

  return (
    <div className="flex justify-center h-full p-16">
      <div className="flex flex-col items-center gap-8">
        <div
          className="flex flex-row gap-1 w-full font-medium items-center tracking-[0.08em] cursor-pointer uppercase"
          onClick={() => router.back()}
        >
          <AiOutlineLeft className="inline-block" /> GO BACK
        </div>
        <div className="flex h-full">
          <Box
            title="CREATE DUNGEON"
            className="flex flex-col gap-8 min-h-0 flex-1 w-[1200px] p-8"
          >
            <div className="flex flex-row items-center gap-8 justify-between">
              <p className=" text-[22px] leading-7 tracking-[0.15em] font-semibold w-full uppercase">
                {step < steps.length - 1 && `${step + 1}. `}
                {stepTitles[step]}
              </p>
              {step > 0 && step < steps.length - 1 && (
                <div
                  className="flex flex-row gap-1 items-center whitespace-nowrap font-medium tracking-[0.08em]  text-white/50 cursor-pointer uppercase"
                  onClick={() => setStep(step - 1)}
                >
                  <AiOutlineLeft className="inline-block" />
                  PREVIOUS
                </div>
              )}
              {step < steps.length - 1 && (
                <Button
                  className="w-fit px-8 whitespace-nowrap"
                  onClick={() => setStep(step + 1)}
                  variant={step < steps.length - 2 ? "outline" : "primary"}
                  disabled={false /* TODD */}
                >
                  {step < steps.length - 2 ? "NEXT STEP" : "FINISH"}
                </Button>
              )}
            </div>
            <div className="w-full border-t border-white/20" />
            <div className="w-full h-full">
              {steps[step] === "INITIAL" && (
                <Dungeon
                  name={name}
                  setName={setName}
                  description={description}
                  setDescription={setDescription}
                  image={image}
                  setImage={setImage}
                />
              )}
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default CreateDungeon;
