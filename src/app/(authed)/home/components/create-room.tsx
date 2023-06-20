/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";
import { IDungeon } from "@/types/dnd";
import { cn } from "@/utils/style-utils";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineQuestionCircle } from "react-icons/ai";
import useCreateRoom from "../hooks/use-create-room";
import { useGetMyDungeons, useGetRecommendedDungeons } from "../hooks/use-get-home-data";
import { useHomeStore } from "../stores/tab-store";
import Tabs from "./tabs";
import { Checkbox } from "@/components/ui/checkbox";

const CreateRoom = () => {
  const { dungeonTab, homeTab, setDisplayHowToPlay } = useHomeStore((state) => state);

  const { data: dungeons, isLoading } =
    dungeonTab === "TOP DUNGEONS"
      ? useGetRecommendedDungeons(homeTab == "PLAY")
      : useGetMyDungeons(homeTab == "PLAY");

  const [selectedDungeon, setSelectedDungeon] = useState<IDungeon>();
  const [generateImages, setGenerateImages] = useState(false);
  const [generateAudio, setGenerateAudio] = useState(false);

  const { mutate: createRoom, isLoading: isCreatingRoom } = useCreateRoom();

  if (isLoading)
    return (
      <div className="flex flex-col gap-12 min-h-0 h-full overflow-y-auto pr-8 no-scrollbar">
        <Skeleton amount={3} />
      </div>
    );

  if (!dungeons) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-5xl">Something went wrong</div>
      </div>
    );
  }

  const onCreateRoom = () => {
    createRoom({ generateAudio, generateImages, dungeon: selectedDungeon?._id });
  };

  return (
    <>
      <Tabs
        homeOrDungeons="dungeon"
        selectedTab={dungeonTab}
        onTabClick={() => setSelectedDungeon(undefined)}
      />

      <div className="flex flex-col gap-12 flex-1 overflow-y-auto pr-8">
        {dungeons.map((dungeon) => (
          <div
            key={dungeon._id}
            className={cn(
              "cursor-pointer flex flex-row gap-8 hover:bg-white/5",
              dungeon === selectedDungeon && "bg-white/5",
            )}
            onClick={() => setSelectedDungeon(selectedDungeon === dungeon ? undefined : dungeon)}
          >
            <Image
              src={dungeon.imageUrl || "/images/bg-cover.png"}
              alt={dungeon.name}
              width={180}
              height={180}
              className="h-[180px]"
            />
            <div className="flex flex-col py-4 gap-4 w-full">
              <div className="flex flex-row justify-between w-full pr-8">
                <p className="text-[22px] leading-7 font-medium tracking-[0.15em] uppercase">
                  {dungeon.name}
                </p>
                {dungeon === selectedDungeon && (
                  <div className="flex flex-row items-center px-3 gap-4 border border-tomato justify-self-end">
                    <AiOutlineCheck className="text-tomato text-lg" />
                    <p className="leading-6 tracking-[0.15em] text-tomato uppercase">SELECTED</p>
                  </div>
                )}
              </div>
              <p className="font-light text-lg tracking-widest">{dungeon.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row justify-between">
        <Button variant="ghost" className="w-fit gap-4" onClick={() => setDisplayHowToPlay(true)}>
          <AiOutlineQuestionCircle className="text-2xl" />
          <p className="leading-7 tracking-[0.15em]">HOW TO PLAY</p>
        </Button>
        <div className="flex gap-8">
          <Checkbox
            label="images"
            checked={generateImages}
            onCheckedChange={(checked) => setGenerateImages(checked as boolean)}
          />
          <Checkbox
            label="audio"
            checked={generateAudio}
            onCheckedChange={(checked) => setGenerateAudio(checked as boolean)}
          />
          <Button
            isLoading={isCreatingRoom}
            className="px-8 w-fit"
            disabled={!selectedDungeon}
            onClick={onCreateRoom}
          >
            CREATE
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
