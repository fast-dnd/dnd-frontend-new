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
import {
  useGetFavoriteDungeons,
  useGetMyDungeons,
  useGetRecommendedDungeons,
} from "../hooks/use-get-home-data";
import { useHomeStore } from "../stores/tab-store";
import Tabs from "./tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import useAddFavorite from "../hooks/use-add-favorite";

const CreateRoom = () => {
  const router = useRouter();
  const { dungeonTab, homeTab, setDisplayHowToPlay } = useHomeStore((state) => state);

  const { data: dungeons, isLoading } =
    dungeonTab === "TOP DUNGEONS"
      ? useGetRecommendedDungeons(homeTab == "PLAY")
      : dungeonTab === "MY DUNGEONS"
      ? useGetMyDungeons(homeTab == "PLAY")
      : useGetFavoriteDungeons(homeTab == "PLAY");

  const [selectedDungeon, setSelectedDungeon] = useState<IDungeon>();
  const [generateImages, setGenerateImages] = useState(false);
  const [generateAudio, setGenerateAudio] = useState(false);
  const [loadingRoom, setLoadingRoom] = useState(false);
  const [templateSentences, setTemplateSentences] = useState("");

  const [dungeonId, setDungeonId] = useState<string>("");

  const { mutate: createRoom, isLoading: isCreatingRoom } = useCreateRoom();

  const { mutate: addFavorite, isLoading: isAddingFavorite } = useAddFavorite();

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

      <div className="flex flex-col gap-4 flex-1 max-h-[350px] md:max-h-full overflow-y-auto md:pr-8">
        {!isLoading &&
          dungeons.map((dungeon) => (
            <div
              key={dungeon._id}
              className={cn(
                "cursor-pointer flex flex-row gap-8 hover:bg-white/5 rounded-md p-4 pr-0 transition-all duration-300 border md:border-0 border-white/10",
                dungeon === selectedDungeon && "bg-white/5",
              )}
              onClick={() => setSelectedDungeon(selectedDungeon === dungeon ? undefined : dungeon)}
            >
              <Image
                src={dungeon.imageUrl || "/images/default-dungeon.png"}
                alt={dungeon.name}
                width={180}
                height={180}
                className="hidden md:h-[180px] md:w-[180px] md:block"
              />
              <div className="flex flex-col md:py-4 gap-2 md:gap-4 w-full pr-4">
                <div className="hidden md:flex flex-row justify-between">
                  <p className="text-lg md:text-[22px] leading-7 font-medium tracking-widest md:tracking-[0.15em] uppercase truncate order-1 text-center md:text-left">
                    {dungeon.name}
                  </p>

                  <div
                    className={cn(
                      "flex flex-row items-center px-3 gap-4 border border-tomato justify-self-end justify-center py-1 order-3 md:order-2 opacity-0 transition-all duration-300",
                      dungeon === selectedDungeon && "opacity-100",
                    )}
                  >
                    <AiOutlineCheck className="text-tomato text-lg" />
                    <p className="leading-6 tracking-[0.15em] text-tomato uppercase">SELECTED</p>
                  </div>
                </div>
                <p className="text-lg md:text-[22px] leading-7 font-medium tracking-widest md:tracking-[0.15em] uppercase truncate order-1 md:hidden text-center md:text-left">
                  {dungeon.name}
                </p>
                <div
                  className={cn(
                    "flex flex-row items-center px-3 gap-4 border border-tomato justify-self-end justify-center py-1 order-3 md:order-2 md:hidden transition-all duration-300",
                    dungeon !== selectedDungeon && "hidden",
                  )}
                >
                  <AiOutlineCheck className="text-tomato text-lg" />
                  <p className="leading-6 tracking-[0.15em] text-tomato uppercase">SELECTED</p>
                </div>
                <p className="font-light text-lg tracking-widest break-all line-clamp-2 pr-2 order-2 md:order-3 text-center md:text-left">
                  {dungeon.description}
                </p>
              </div>
            </div>
          ))}
        {isLoading && <Skeleton amount={3} />}
      </div>

      <div className="flex flex-row gap-8 justify-center items-center">
        <div className="hidden md:flex items-end">
          <Button
            variant="ghost"
            className="w-fit text-lg gap-4"
            onClick={() => setDisplayHowToPlay(true)}
          >
            <AiOutlineQuestionCircle className="text-xl" />
            <p className="leading-7 tracking-[0.15em] whitespace-nowrap">HOW TO PLAY</p>
          </Button>
        </div>
        {dungeonTab === "FAVORITE DUNGEONS" && (
          <div className="flex flex-row gap-8 flex-1 justify-center">
            <Input
              placeholder="Enter dungeon ID..."
              onChange={(e) => setDungeonId(e.target.value)}
              className="m-0 h-14 min-w-[200px] text-xl"
            />
            <Button
              isLoading={isAddingFavorite}
              disabled={!dungeonId}
              variant={dungeonId ? "primary" : "outline"}
              className="h-14 px-8 w-fit"
              onClick={() => addFavorite(dungeonId)}
            >
              ADD FAVORITE
            </Button>
          </div>
        )}

        <div
          className={cn(
            "flex flex-wrap justify-center md:justify-end gap-8",
            dungeonTab !== "FAVORITE DUNGEONS" && "flex-1",
          )}
        >
          {dungeonTab !== "FAVORITE DUNGEONS" && (
            <Input
              className="hidden md:flex m-0 h-14 items-center min-w-[200px] text-xl"
              placeholder="Template sentences"
              onChange={(e) => setTemplateSentences(e.target.value)}
            />
          )}

          <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto">
            <div className="flex gap-4 md:gap-8 justify-center">
              <Checkbox
                label="images"
                checked={generateImages}
                onCheckedChange={(checked) => setGenerateImages(checked as boolean)}
                className="px-8"
              />
              <Checkbox
                label="audio"
                checked={generateAudio}
                onCheckedChange={(checked) => setGenerateAudio(checked as boolean)}
                className="px-8"
              />
            </div>

            <Button
              isLoading={isCreatingRoom || loadingRoom}
              className="h-14 px-8 w-full md:w-fit"
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
