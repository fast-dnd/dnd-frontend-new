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
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const CreateRoom = () => {
  const router = useRouter();
  const { dungeonTab, homeTab, setDisplayHowToPlay } = useHomeStore((state) => state);

  const { data: dungeons, isLoading } =
    dungeonTab === "TOP DUNGEONS"
      ? useGetRecommendedDungeons(homeTab == "PLAY")
      : useGetMyDungeons(homeTab == "PLAY");

  const [selectedDungeon, setSelectedDungeon] = useState<IDungeon>();
  const [generateImages, setGenerateImages] = useState(false);
  const [generateAudio, setGenerateAudio] = useState(false);
  const [loadingRoom, setLoadingRoom] = useState(false);
  const [templateSentences, setTemplateSentences] = useState("");

  const { mutate: createRoom, isLoading: isCreatingRoom } = useCreateRoom();

  if (!isLoading && !dungeons) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-5xl">Something went wrong</div>
      </div>
    );
  }

  const onCreateRoom = () => {
    createRoom(
      { generateAudio, generateImages, dungeon: selectedDungeon?._id, templateSentences },
      {
        onSuccess: (data) => {
          if (data.data.admin) localStorage.setItem("accountId", data.data.admin.accountId);
          setLoadingRoom(true);
          router.push(`room/${data.data.conversationId}`);
        },
      },
    );
  };

  return (
    <>
      <Tabs
        homeOrDungeons="dungeon"
        selectedTab={dungeonTab}
        onTabClick={() => setSelectedDungeon(undefined)}
      />

      <div className="flex flex-col gap-4 flex-1 overflow-y-auto pr-8">
        {!isLoading &&
          dungeons.map((dungeon) => (
            <div
              key={dungeon._id}
              className={cn(
                "cursor-pointer flex flex-row gap-8 hover:bg-white/5 rounded-md p-4 pr-0 transition-all duration-300",
                dungeon === selectedDungeon && "bg-white/5",
              )}
              onClick={() => setSelectedDungeon(selectedDungeon === dungeon ? undefined : dungeon)}
            >
              <Image
                src={dungeon.imageUrl || "/images/default-dungeon.png"}
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
        {isLoading && <Skeleton amount={3} />}
      </div>

      <div className="flex flex-row w-full gap-8 justify-between">
        <div className="flex items-end">
          <Button
            variant="ghost"
            className="w-fit text-lg gap-4"
            onClick={() => setDisplayHowToPlay(true)}
          >
            <AiOutlineQuestionCircle className="text-xl" />
            <p className="leading-7 tracking-[0.15em] whitespace-nowrap">HOW TO PLAY</p>
          </Button>
        </div>

        <div className="flex flex-1 flex-wrap justify-end gap-8">
          <Input
            className="m-0 h-14 min-w-[200px] text-xl"
            placeholder="Template sentences"
            onChange={(e) => setTemplateSentences(e.target.value)}
          />

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
              isLoading={isCreatingRoom || loadingRoom}
              className="h-14 px-8 w-fit"
              disabled={!selectedDungeon}
              onClick={onCreateRoom}
            >
              CREATE
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
