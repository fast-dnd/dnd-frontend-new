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
  const { dungeonTab, setDungeonTab, homeTab } = useHomeStore((state) => state);

  const { data: dungeons, isLoading } =
    dungeonTab === "top dungeons"
      ? useGetRecommendedDungeons(homeTab == "PLAY")
      : dungeonTab === "my dungeons"
      ? useGetMyDungeons(homeTab == "PLAY")
      : useGetFavoriteDungeons(homeTab == "PLAY");

  const [selectedDungeon, setSelectedDungeon] = useState<IDungeon>();
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
      {
        generateAudio: false,
        generateImages: false,
        dungeon: selectedDungeon?._id,
        templateSentences,
      },
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
          <div className="hidden lg:block">
            <Tabs
              homeOrDungeons="dungeon"
              selectedTab={dungeonTab}
              onTabClick={() => setSelectedDungeon(undefined)}
            />
          </div>
          <div className="block lg:hidden">
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

      <div className="flex flex-col gap-4 flex-1 max-h-[350px] lg:max-h-full overflow-y-auto lg:pr-8">
        {!isLoading &&
          selectedDungeon === undefined &&
          dungeons.map((dungeon) => (
            <div
              key={dungeon._id}
              className={cn(
                "cursor-pointer flex flex-row gap-8 hover:bg-white/5 rounded-md p-4 pr-0 transition-all duration-300 border lg:border-0 border-white/10",
                dungeon === selectedDungeon && "bg-white/5",
              )}
              onClick={() => setSelectedDungeon(selectedDungeon === dungeon ? undefined : dungeon)}
            >
              <Image
                src={dungeon.imageUrl || "/images/default-dungeon.png"}
                alt={dungeon.name}
                width={180}
                height={180}
                className="hidden lg:h-[180px] lg:w-[180px] lg:block"
              />
              <div className="flex flex-col lg:py-4 gap-2 lg:gap-4 w-full pr-4">
                <div className="hidden lg:flex flex-row justify-between">
                  <p className="text-lg lg:text-[22px] leading-7 font-medium tracking-widest lg:tracking-[0.15em] uppercase truncate order-1 text-center lg:text-left">
                    {dungeon.name}
                  </p>
                </div>
                <p className="text-lg lg:text-[22px] leading-7 font-medium tracking-widest lg:tracking-[0.15em] uppercase truncate order-1 lg:hidden text-center lg:text-left">
                  {dungeon.name}
                </p>

                <p className="font-light text-lg tracking-widest break-all line-clamp-2 pr-2 order-2 lg:order-3 text-center lg:text-left">
                  {dungeon.description}
                </p>
                <div className="flex flex-wrap gap-2 lg:gap-4 order-4">
                  {dungeon.tags.map((tag) => (
                    <div key={tag} className="border-[1.5px] border-white/25">
                      <p className="text-sm leading-7 tracking-[2.4px] px-1.5 lg:px-3 py-1 capitalize">
                        {tag}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

        {!isLoading && selectedDungeon !== undefined && (
          <div className="flex flex-col gap-4 lg:gap-8 lg:pr-4 pr-0">
            <div className="flex gap-4 lg:gap-8">
              <Image
                src={selectedDungeon.imageUrl || "/images/default-dungeon.png"}
                alt={selectedDungeon.name}
                width={180}
                height={180}
                className="h-20 w-20 lg:h-[180px] lg:w-[180px]"
              />
              <div className="hidden lg:flex flex-col gap-4">
                <p className="lg:text-[22px] leading-7 font-medium tracking-widest lg:tracking-[0.15em] uppercase">
                  {selectedDungeon.name}
                </p>
                <div className="hidden lg:flex flex-wrap gap-2 lg:gap-4">
                  {selectedDungeon.tags.map((tag) => (
                    <div key={tag} className="border-[1.5px] border-white/25">
                      <p className="text-sm leading-7 tracking-[2.4px] px-1.5 lg:px-3 py-1 capitalize">
                        {tag}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="font-light text-sm lg:text-lg tracking-widest">
                  {selectedDungeon.description}
                </p>
              </div>
            </div>
            <div className="flex lg:hidden flex-wrap gap-2 lg:gap-4">
              {selectedDungeon.tags.map((tag) => (
                <div key={tag} className="border-[1.5px] border-white/25">
                  <p className="text-sm leading-7 tracking-[2.4px] px-1.5 lg:px-3 py-1 capitalize">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
            <p className="inline lg:hidden font-light text-sm lg:text-lg tracking-widest">
              {selectedDungeon.description}
            </p>
          </div>
        )}
        {isLoading && <Skeleton amount={3} />}
      </div>

      {dungeons?.length === 0 && (
        <div className="flex w-full h-full flex-col gap-4 lg:gap-8 items-center justify-center py-16">
          <Image src="/images/star-icon.svg" alt="Empty dungeon" width={68} height={64} />
          <p className="font-semibold text-lg lg:text-2xl leading-7 tracking-widest lg:tracking-[3.3px] text-center">
            YOU HAVE NO {dungeonTab === "favorite dungeons" ? "FAVORITE" : ""} DUNGEONS YET
          </p>
          {dungeonTab === "favorite dungeons" && (
            <p className="text-sm lg:text-lg leading-5 lg:leading-7 tracking-wide lg:tracking-widest font-light text-center text-white/50">
              Enter the ID below to add a new one
            </p>
          )}
        </div>
      )}

      <div className="flex flex-row gap-8 justify-center items-center">
        {dungeonTab === "favorite dungeons" && selectedDungeon === undefined && (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 flex-1 justify-end">
            <Input
              placeholder="Enter dungeon ID..."
              onChange={(e) => setDungeonId(e.target.value)}
              className="m-0 h-9 lg:h-14 min-w-[200px] lg:text-xl"
            />
            <Button
              isLoading={isAddingFavorite}
              disabled={!dungeonId}
              variant={dungeonId ? "primary" : "outline"}
              className="h-9 lg:h-14 px-8 w-full lg:w-fit"
              onClick={() => addFavorite(dungeonId)}
            >
              ADD FAVORITE
            </Button>
          </div>
        )}

        {selectedDungeon !== undefined && (
          <div className="flex flex-row justify-between lg:justify-end lg:gap-8 w-full">
            <Button
              className="text-sm lg:text-lg w-fit flex gap-2"
              variant="ghost"
              onClick={() => setSelectedDungeon(undefined)}
            >
              <AiOutlineLeft className="inline-block" /> GO BACK
            </Button>
            <Button
              className="whitespace-nowrap text-sm lg:text-lg w-fit px-8 uppercase"
              isLoading={isCreatingRoom || loadingRoom}
              onClick={onCreateRoom}
            >
              CREATE ROOM
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateRoom;
