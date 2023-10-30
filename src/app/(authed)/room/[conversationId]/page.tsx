"use client";

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
    selectedChampion,
    displayedChampion,
    isTaken,
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

      <div className="flex flex-1 flex-col lg:hidden">
        <MobileNavbar className="bg-black" onClickBack={onClickBack} />
        <MobileRoomInfo roomData={roomData} selectedChampion={selectedChampion} />
        <ChooseCharacter
          selectedChampion={selectedChampion}
          displayedChampion={displayedChampion}
          isTaken={isTaken}
          onChangeChampion={onChangeChampion}
          nextChamp={nextChamp}
          prevChamp={prevChamp}
        />
        <GameSettings
          roomData={roomData}
          selectedChampion={selectedChampion}
          conversationId={conversationId}
        />
      </div>
    </>
  );
};

export default Room;
