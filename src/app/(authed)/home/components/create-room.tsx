/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/style-utils";
import { AiOutlineLeft } from "react-icons/ai";

import { IDungeon } from "@/types/dnd";
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

import useAddFavorite from "../hooks/use-add-favorite";
import useCreateRoom from "../hooks/use-create-room";
import {
  useGetFavoriteDungeons,
  useGetMyDungeons,
  useGetRecommendedDungeons,
} from "../hooks/use-get-home-data";
import { useHomeStore } from "../stores/tab-store";
import { dungeonTabs, DungeonTabType } from "../types/home";
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
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
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

      <div className="flex max-h-[350px] flex-1 flex-col gap-4 overflow-y-auto lg:max-h-full lg:pr-8">
        {!isLoading &&
          selectedDungeon === undefined &&
          dungeons.map((dungeon) => (
            <div
              key={dungeon._id}
              className={cn(
                "flex cursor-pointer flex-row gap-8 rounded-md border border-white/10 p-4 pr-0 transition-all duration-300 hover:bg-white/5 lg:border-0",
                dungeon === selectedDungeon && "bg-white/5",
              )}
              onClick={() => setSelectedDungeon(selectedDungeon === dungeon ? undefined : dungeon)}
            >
              <Image
                src={dungeon.imageUrl || "/images/default-dungeon.png"}
                alt={dungeon.name}
                width={180}
                height={180}
                className="hidden lg:block lg:h-[180px] lg:w-[180px]"
              />
              <div className="flex w-full flex-col gap-2 pr-4 lg:gap-4 lg:py-4">
                <div className="hidden flex-row justify-between lg:flex">
                  <p className="order-1 truncate text-center text-lg font-medium uppercase leading-7 tracking-widest lg:text-left lg:text-[22px] lg:tracking-[0.15em]">
                    {dungeon.name}
                  </p>
                </div>
                <p className="order-1 truncate text-center text-lg font-medium uppercase leading-7 tracking-widest lg:hidden lg:text-left lg:text-[22px] lg:tracking-[0.15em]">
                  {dungeon.name}
                </p>

                <p className="order-2 line-clamp-2 break-all pr-2 text-center text-lg font-light tracking-widest lg:order-3 lg:text-left">
                  {dungeon.description}
                </p>
                <div className="order-4 flex flex-wrap gap-2 lg:gap-4">
                  {dungeon.tags.map((tag) => (
                    <div key={tag} className="border-[1.5px] border-white/25">
                      <p className="px-1.5 py-1 text-sm capitalize leading-7 tracking-[2.4px] lg:px-3">
                        {tag}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

        {!isLoading && selectedDungeon !== undefined && (
          <div className="flex flex-col gap-4 pr-0 lg:gap-8 lg:pr-4">
            <div className="flex gap-4 lg:gap-8">
              <Image
                src={selectedDungeon.imageUrl || "/images/default-dungeon.png"}
                alt={selectedDungeon.name}
                width={180}
                height={180}
                className="h-20 w-20 lg:h-[180px] lg:w-[180px]"
              />
              <p className="inline break-all font-medium uppercase leading-7 tracking-widest lg:hidden lg:text-[22px] lg:tracking-[0.15em]">
                {selectedDungeon.name}
              </p>
              <div className="hidden flex-col gap-4 lg:flex">
                <p className="font-medium uppercase leading-7 tracking-widest lg:text-[22px] lg:tracking-[0.15em]">
                  {selectedDungeon.name}
                </p>
                <div className="hidden flex-wrap gap-2 lg:flex lg:gap-4">
                  {selectedDungeon.tags.map((tag) => (
                    <div key={tag} className="border-[1.5px] border-white/25">
                      <p className="px-1.5 py-1 text-sm capitalize leading-7 tracking-[2.4px] lg:px-3">
                        {tag}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="text-sm font-light tracking-widest lg:text-lg">
                  {selectedDungeon.description}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 lg:hidden lg:gap-4">
              {selectedDungeon.tags.map((tag) => (
                <div key={tag} className="border-[1.5px] border-white/25">
                  <p className="px-1.5 py-1 text-sm capitalize leading-7 tracking-[2.4px] lg:px-3">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
            <p className="inline text-sm font-light tracking-widest lg:hidden lg:text-lg">
              {selectedDungeon.description}
            </p>
          </div>
        )}
        {isLoading && <Skeleton amount={3} />}
      </div>

      {dungeons?.length === 0 && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-16 lg:gap-8">
          <Image src="/images/star-icon.svg" alt="Empty dungeon" width={68} height={64} />
          <p className="text-center text-lg font-semibold leading-7 tracking-widest lg:text-2xl lg:tracking-[3.3px]">
            YOU HAVE NO {dungeonTab === "favorite dungeons" ? "FAVORITE" : ""} DUNGEONS YET
          </p>
          {dungeonTab === "favorite dungeons" && (
            <p className="text-center text-sm font-light leading-5 tracking-wide text-white/50 lg:text-lg lg:leading-7 lg:tracking-widest">
              Enter the ID below to add a new one
            </p>
          )}
        </div>
      )}

      <div className="flex flex-row items-center justify-center gap-8">
        {dungeonTab === "favorite dungeons" && selectedDungeon === undefined && (
          <div className="flex flex-1 flex-col justify-end gap-4 lg:flex-row lg:gap-8">
            <Input
              placeholder="Enter dungeon ID..."
              onChange={(e) => setDungeonId(e.target.value)}
              className="m-0 h-9 min-w-[200px] lg:h-14 lg:text-xl"
            />
            <Button
              isLoading={isAddingFavorite}
              disabled={!dungeonId}
              variant={dungeonId ? "primary" : "outline"}
              className="h-9 w-full px-8 lg:h-14 lg:w-fit"
              onClick={() => addFavorite(dungeonId)}
            >
              ADD FAVORITE
            </Button>
          </div>
        )}

        {selectedDungeon !== undefined && (
          <div className="flex w-full flex-row justify-between lg:justify-end lg:gap-8">
            <Button
              className="flex w-fit gap-2 text-sm lg:text-lg"
              variant="ghost"
              onClick={() => setSelectedDungeon(undefined)}
            >
              <AiOutlineLeft className="inline-block" /> GO BACK
            </Button>
            <Button
              className="w-fit whitespace-nowrap px-8 text-sm uppercase lg:text-lg"
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
