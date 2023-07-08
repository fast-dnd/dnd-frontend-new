/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Skeleton from "@/components/ui/skeleton";
import { IDungeon } from "@/types/dnd";
import { cn } from "@/utils/style-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import useAddFavorite from "../hooks/use-add-favorite";
import useCreateRoom from "../hooks/use-create-room";
import {
  useGetFavoriteDungeons,
  useGetMyDungeons,
  useGetRecommendedDungeons,
} from "../hooks/use-get-home-data";
import { useHomeStore } from "../stores/tab-store";
import { DungeonTabType, dungeonTabs } from "../types/home";
import Tabs from "./tabs";

const CreateRoom = () => {
  const router = useRouter();
  const { dungeonTab, setDungeonTab, homeTab, setDisplayHowToPlay } = useHomeStore(
    (state) => state,
  );

  const { data: dungeons, isLoading } =
    dungeonTab === "top dungeons"
      ? useGetRecommendedDungeons(homeTab == "PLAY")
      : dungeonTab === "my dungeons"
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
      {selectedDungeon === undefined && (
        <>
          <div className="hidden md:block">
            <Tabs
              homeOrDungeons="dungeon"
              selectedTab={dungeonTab}
              onTabClick={() => setSelectedDungeon(undefined)}
            />
          </div>
          <div className="block md:hidden">
            <Select
              value={dungeonTab}
              onValueChange={(value) => setDungeonTab(value as DungeonTabType)}
            >
              <SelectTrigger className="w-full capitalize">
                <SelectValue placeholder="Select dungeons type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dungeonTabs.map((dungeonTab) => (
                    <SelectItem key={dungeonTab} value={dungeonTab} className="capitalize">
                      {dungeonTab}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <div className="flex flex-col gap-4 flex-1 max-h-[350px] md:max-h-full overflow-y-auto md:pr-8">
        {!isLoading &&
          selectedDungeon === undefined &&
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
                </div>
                <p className="text-lg md:text-[22px] leading-7 font-medium tracking-widest md:tracking-[0.15em] uppercase truncate order-1 md:hidden text-center md:text-left">
                  {dungeon.name}
                </p>

                <p className="font-light text-lg tracking-widest break-all line-clamp-2 pr-2 order-2 md:order-3 text-center md:text-left">
                  {dungeon.description}
                </p>
                <div className="flex flex-wrap gap-2 md:gap-4 order-4">
                  {dungeon.tags.map((tag) => (
                    <div key={tag} className="border-[1.5px] border-white/25">
                      <p className="text-sm leading-7 tracking-[2.4px] px-1.5 md:px-3 py-1 capitalize">
                        {tag}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

        {!isLoading && selectedDungeon !== undefined && (
          <div className="flex flex-col gap-4 md:gap-8 md:pr-4 pr-0">
            <div className="flex gap-4 md:gap-8">
              <Image
                src={selectedDungeon.imageUrl || "/images/default-dungeon.png"}
                alt={selectedDungeon.name}
                width={180}
                height={180}
                className="h-20 w-20 md:h-[180px] md:w-[180px]"
              />
              <div className="hidden md:flex flex-col gap-4">
                <p className="md:text-[22px] leading-7 font-medium tracking-widest md:tracking-[0.15em] uppercase">
                  {selectedDungeon.name}
                </p>
                <div className="hidden md:flex flex-wrap gap-2 md:gap-4">
                  {selectedDungeon.tags.map((tag) => (
                    <div key={tag} className="border-[1.5px] border-white/25">
                      <p className="text-sm leading-7 tracking-[2.4px] px-1.5 md:px-3 py-1 capitalize">
                        {tag}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="font-light text-sm md:text-lg tracking-widest">
                  {selectedDungeon.description}
                </p>
              </div>
            </div>
            <div className="flex md:hidden flex-wrap gap-2 md:gap-4">
              {selectedDungeon.tags.map((tag) => (
                <div key={tag} className="border-[1.5px] border-white/25">
                  <p className="text-sm leading-7 tracking-[2.4px] px-1.5 md:px-3 py-1 capitalize">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
            <p className="inline md:hidden font-light text-sm md:text-lg tracking-widest">
              {selectedDungeon.description}
            </p>
          </div>
        )}
        {isLoading && <Skeleton amount={3} />}
      </div>

      {dungeons?.length === 0 && (
        <div className="flex w-full h-full flex-col gap-4 md:gap-8 items-center justify-center py-16">
          <Image src="/images/star-icon.svg" alt="Empty dungeon" width={68} height={64} />
          <p className="font-semibold text-lg md:text-2xl leading-7 tracking-widest md:tracking-[3.3px] text-center">
            YOU HAVE NO {dungeonTab === "favorite dungeons" ? "FAVORITE" : ""} DUNGEONS YET
          </p>
          {dungeonTab === "favorite dungeons" && (
            <p className="text-sm md:text-lg leading-5 md:leading-7 tracking-wide md:tracking-widest font-light text-center text-white/50">
              Enter the ID below to add a new one
            </p>
          )}
        </div>
      )}

      <div className="flex flex-row gap-8 justify-center items-center">
        {dungeonTab === "favorite dungeons" && (
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1 justify-end">
            <Input
              placeholder="Enter dungeon ID..."
              onChange={(e) => setDungeonId(e.target.value)}
              className="m-0 h-9 md:h-14 min-w-[200px] md:text-xl"
            />
            <Button
              isLoading={isAddingFavorite}
              disabled={!dungeonId}
              variant={dungeonId ? "primary" : "outline"}
              className="h-9 md:h-14 px-8 w-full md:w-fit"
              onClick={() => addFavorite(dungeonId)}
            >
              ADD FAVORITE
            </Button>
          </div>
        )}

        {selectedDungeon !== undefined && (
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 flex-1 justify-end">
            <Button
              className="md:h-14 px-8 w-full md:w-fit flex gap-2"
              onClick={() => setSelectedDungeon(undefined)}
              variant="ghost"
            >
              <AiOutlineLeft className="inline-block" /> GO BACK
            </Button>
            <Button
              isLoading={isCreatingRoom || loadingRoom}
              className="md:h-14 px-8 w-full md:w-fit"
              onClick={onCreateRoom}
            >
              CREATE ROOM
            </Button>
          </div>
        )}

        {/*<div
          className={cn(
            "flex flex-col md:flex-row gap-8",
            dungeonTab !== "favorite dungeons" && "flex-1",
          )}
        >
          {dungeonTab !== "favorite dungeons" && (
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
        </div>*/}
      </div>
    </>
  );
};

export default CreateRoom;
