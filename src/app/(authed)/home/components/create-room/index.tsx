/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import Image from "next/image";

import { IDungeon } from "@/types/dungeon";
import Skeleton from "@/components/ui/skeleton";

import {
  useGetFavoriteDungeons,
  useGetMyDungeons,
  useGetRecommendedDungeons,
} from "../../hooks/use-get-home-data";
import { useHomeStore } from "../../stores/tab-store";
import CreateRoomDungeon from "./create-room-dungeon";
import CreateRoomFooter from "./create-room-footer";
import CreateRoomNavbar from "./create-room-navbar";
import SelectedDungeon from "./selected-dungeon";

const CreateRoom = () => {
  const { dungeonTab, homeTab } = useHomeStore((state) => state);

  const { data: dungeons, isLoading } =
    dungeonTab === "top dungeons"
      ? useGetRecommendedDungeons(homeTab == "PLAY")
      : dungeonTab === "my dungeons"
      ? useGetMyDungeons(homeTab == "PLAY")
      : useGetFavoriteDungeons(homeTab == "PLAY");

  const [selectedDungeon, setSelectedDungeon] = useState<IDungeon>();

  if (isLoading) {
    return (
      <div className="flex max-h-[350px] flex-1 flex-col gap-4 overflow-y-auto lg:max-h-full lg:pr-8">
        <Skeleton amount={3} />
      </div>
    );
  }

  if (!dungeons) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  if (dungeons.length === 0)
    return (
      <>
        <CreateRoomNavbar setSelectedDungeon={setSelectedDungeon} />
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
      </>
    );

  return (
    <>
      {selectedDungeon === undefined && (
        <CreateRoomNavbar setSelectedDungeon={setSelectedDungeon} />
      )}

      <div className="flex max-h-[350px] flex-1 flex-col gap-4 overflow-y-auto lg:max-h-full lg:pr-8">
        {selectedDungeon === undefined ? (
          dungeons.map((dungeon) => (
            <CreateRoomDungeon
              key={dungeon._id}
              dungeon={dungeon}
              selectedDungeon={selectedDungeon}
              setSelectedDungeon={setSelectedDungeon}
            />
          ))
        ) : (
          <SelectedDungeon selectedDungeon={selectedDungeon} />
        )}
      </div>

      <CreateRoomFooter selectedDungeon={selectedDungeon} setSelectedDungeon={setSelectedDungeon} />
    </>
  );
};

export default CreateRoom;
