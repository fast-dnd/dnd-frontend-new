"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import MobileNavbar from "@/components/mobile-navbar";

import JoinEditInfo from "./components/desktop/join-edit-info";
import RoomInfo from "./components/desktop/room-info";
import ChooseCharacter from "./components/mobile/choose-character";
import GameSettings from "./components/mobile/game-settings";
import MobileRoomInfo from "./components/mobile/mobile-room-info";
import useChampionInfo from "./hooks/use-champion-info";

const Room = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;
  const router = useRouter();

  const {
    roomData,
    dungeon,
    selectedChampion,
    displayedChampion,
    takenBy,
    onChangeChampion,
    nextChamp,
    prevChamp,
  } = useChampionInfo({ conversationId });

  const onClickBack = () => {
    if (selectedChampion) onChangeChampion(selectedChampion);
    else router.push("/home");
  };

  return (
    <>
      <div className="hidden h-full flex-col justify-between gap-12 pb-12 lg:flex lg:flex-row lg:overflow-y-hidden">
        <RoomInfo conversationId={conversationId} />
        <JoinEditInfo conversationId={conversationId} />
      </div>

      <div className="relative flex flex-1 flex-col lg:hidden">
        <MobileNavbar className="bg-black" onClickBack={onClickBack} />
        <MobileRoomInfo roomData={roomData} selectedChampion={selectedChampion} />

        <ChooseCharacter
          selectedChampion={selectedChampion}
          displayedChampion={displayedChampion}
          takenBy={takenBy}
          onChangeChampion={onChangeChampion}
          nextChamp={nextChamp}
          prevChamp={prevChamp}
        />
        <GameSettings
          roomData={roomData}
          selectedChampion={selectedChampion}
          conversationId={conversationId}
        />
        <div className="absolute inset-0 -z-10 bg-dark-900 pt-32">
          {!!dungeon?.imageUrl && (
            <Image
              src={dungeon.imageUrl}
              alt=""
              width={1024}
              height={1024}
              className="h-full object-cover blur-md"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Room;
