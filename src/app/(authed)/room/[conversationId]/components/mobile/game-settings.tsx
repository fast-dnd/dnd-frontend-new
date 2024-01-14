"use client";

import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/helpers/use-auth";
import useCommunity from "@/hooks/helpers/use-community";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import { IChampion } from "@/types/dungeon";
import { IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

import useOnRoomChange from "../../hooks/use-on-room-change";
import useOnStartGame from "../../hooks/use-on-start-game";
import usePlayerInfo from "../../hooks/use-player-info";
import useRoomSocket from "../../hooks/use-room-socket";
import ChooseGamemode from "./choose-gamemode";
import DurationSlider from "./duration-slider";
import ImageAudioToggle from "./image-audio-toggle";

interface IGameSettingsProps {
  conversationId: string;
  selectedChampion: IChampion | null | undefined;
  roomData: IRoomDetail | undefined;
  isAdmin: boolean;
  gameModeSelected: boolean;
  setGameModeSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameSettings = ({
  conversationId,
  selectedChampion,
  roomData,
  isAdmin,
  gameModeSelected,
  setGameModeSelected,
}: IGameSettingsProps) => {
  const { duration, setDuration } = usePlayerInfo(roomData);

  const { gameStarting } = useRoomSocket(conversationId);

  const { isDefault } = useCommunity();
  const { loggedIn } = useAuth();

  const { data: currentCommunity } = useGetCurrentCommunity();

  const {
    generateAudio,
    generateImages,
    generateRandomWords,
    setGenerateImages,
    setGenerateAudio,
    setGenerateRandomWords,
  } = useOnRoomChange({
    conversationId,
    duration,
    roomData,
    isAdmin,
  });

  const { isGameStarting, onStartGame } = useOnStartGame({ conversationId });

  const canBegin = roomData?.playerState.every((player) => player.champion) ?? false;

  const disabled = !isAdmin || isGameStarting || gameStarting;

  return (
    <>
      <ChooseGamemode
        selectedChampion={selectedChampion}
        isAdmin={isAdmin}
        gameModeSelected={gameModeSelected}
        setGameModeSelected={setGameModeSelected}
        setGenerateRandomWords={setGenerateRandomWords}
      />
      <div
        className={cn(
          "flex flex-1 flex-col items-center gap-8 py-4 text-sm",
          !selectedChampion && "hidden",
          isAdmin && !gameModeSelected && "hidden",
        )}
      >
        <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
          <p className="uppercase">Game settings</p>
          <DurationSlider duration={duration} setDuration={setDuration} disabled={disabled} />
          <div className="mt-4 h-[1px] w-full bg-black shadow-lobby" />
          <div className="flex w-full flex-wrap items-center justify-evenly gap-3 px-4">
            <ImageAudioToggle
              generate={generateImages}
              setGenerate={setGenerateImages}
              disabled={disabled}
              type="Image"
            />
            <ImageAudioToggle
              generate={generateAudio}
              setGenerate={setGenerateAudio}
              disabled={disabled}
              type="Audio"
            />
          </div>
        </div>

        <Button
          className="w-52 whitespace-nowrap"
          disabled={disabled || !canBegin}
          isLoading={isGameStarting || gameStarting}
          onClick={onStartGame}
        >
          START ({roomData?.price.toFixed(loggedIn && isDefault ? 0 : 5)}{" "}
          {loggedIn && isDefault ? "coins" : currentCommunity?.currencyName})
        </Button>
      </div>
    </>
  );
};

export default GameSettings;
