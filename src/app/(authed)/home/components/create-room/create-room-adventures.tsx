/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import Image from "next/image";

import { IDungeon } from "@/types/dungeon";
import Skeleton from "@/components/ui/skeleton";

import {
  useGetFavoriteDungeons,
  useGetMyDungeons,
  useGetRecentDungeons,
  useGetRecommendedDungeons,
} from "../../hooks/use-get-home-data";
import { homeStore } from "../../stores/tab-store";
import CreateRoomDungeon from "./create-room-dungeon";
import CreateRoomFooter from "./create-room-footer";
import CreateRoomNavbar from "./create-room-navbar";
import SelectedDungeon from "./selected-dungeon";

const CreateRoomAdventures = () => {
  const { subTab, homeTab, baseTab } = homeStore.use();

  const { data: dungeons, isLoading: dungeonsLoading } =
    subTab === "top"
      ? useGetRecommendedDungeons(homeTab == "PLAY" && baseTab === "ADVENTURES")
      : subTab === "owned"
      ? useGetMyDungeons(homeTab == "PLAY" && baseTab === "ADVENTURES")
      : subTab === "favorite"
      ? useGetFavoriteDungeons(homeTab == "PLAY" && baseTab === "ADVENTURES")
      : useGetRecentDungeons(homeTab == "PLAY" && baseTab === "ADVENTURES");

  const [selectedDungeon, setSelectedDungeon] = useState<IDungeon>();

  if (dungeonsLoading) {
    return (
      <div className="flex max-h-[350px] flex-1 flex-col gap-4 overflow-y-auto lg:max-h-full lg:pr-8">
        <CreateRoomNavbar />
        <Skeleton amount={3} />
      </div>
    );
  }
  if (!dungeons) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <CreateRoomNavbar />
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }
  if (dungeons.length === 0)
    return (
      <>
        <CreateRoomNavbar />
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-16 lg:gap-8">
          <Image src="/images/star-icon.svg" alt="Empty dungeon" width={68} height={64} />
          <p className="text-center text-lg font-semibold leading-7 tracking-widest lg:text-2xl lg:tracking-[3.3px]">
            YOU HAVE NO {subTab === "favorite" ? "FAVORITE" : ""} ADVENTURES YET
          </p>
          {subTab === "favorite" && (
            <p className="text-center text-sm font-light leading-5 tracking-wide text-white/50 lg:text-lg lg:leading-7 lg:tracking-widest">
              Enter the ID below to add a new one
            </p>
          )}
        </div>
        <CreateRoomFooter
          selectedDungeon={selectedDungeon}
          setSelectedDungeon={setSelectedDungeon}
        />
      </>
    );
  return (
    <>
      {selectedDungeon === undefined && <CreateRoomNavbar />}

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

export default CreateRoomAdventures;
