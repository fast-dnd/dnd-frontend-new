"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useReadLocalStorage } from "usehooks-ts";

import MobileNavbar from "@/components/navbar/mobile-navbar";

import JoinEditInfo from "./components/desktop/join-edit-info";
import RoomInfo from "./components/desktop/room-info";
import ChooseCharacter from "./components/mobile/choose-character";
import GameSettings from "./components/mobile/game-settings";
import MobileRoomInfo from "./components/mobile/mobile-room-info";
import useChampionInfo from "./hooks/use-champion-info";

const Room = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;
  const router = useRouter();
  const accountId = useReadLocalStorage<string>("accountId");

  const [aiModelSelected, setAiModelSelected] = useState(false);

  const {
    roomData,
    dungeon,
    selectedChampion,
    currentIndex,
    isTaken,
    chmpTakenBy,
    onChangeChampion,
    setCurrentIndex,
  } = useChampionInfo({ conversationId });

  const isAdmin = accountId === roomData?.playerState[0].accountId;

  const onClickBack = () => {
    if (!selectedChampion) router.push("/home");
    else if (!isAdmin) onChangeChampion(selectedChampion);
    else setAiModelSelected(false);
  };

  return (
    <>
      <div className="hidden h-full flex-col justify-between gap-12 pb-12 lg:flex lg:flex-row lg:overflow-y-hidden">
        <RoomInfo conversationId={conversationId} />
        <JoinEditInfo conversationId={conversationId} />
      </div>

      <div className="relative flex flex-1 flex-col lg:hidden">
        <div className="fixed top-0 z-10 w-full">
          <MobileNavbar className="bg-black" onClickBack={onClickBack} />
          <MobileRoomInfo
            roomData={roomData}
            selectedChampion={selectedChampion}
            isAdmin={isAdmin}
            aiModelSelected={aiModelSelected}
          />
        </div>
        <div className="mt-32 flex h-full">
          <ChooseCharacter
            conversationId={conversationId}
            dungeonData={dungeon}
            selectedChampion={selectedChampion}
            currentIndex={currentIndex}
            isTaken={isTaken}
            takenBy={chmpTakenBy}
            onChangeChampion={onChangeChampion}
            setCurrentIndex={setCurrentIndex}
          />
          <GameSettings
            roomData={roomData}
            selectedChampion={selectedChampion}
            conversationId={conversationId}
            isAdmin={isAdmin}
            aiModelSelected={aiModelSelected}
            setAiModelSelected={setAiModelSelected}
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-dark-900 pt-32">
          {!!dungeon?.imageUrl && (
            <>
              <Image
                src={dungeon.imageUrl}
                alt=""
                width={1024}
                height={1024}
                className="h-full object-cover blur-md"
              />
              <div className="absolute inset-0 size-full bg-dark-900/40" />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Room;
