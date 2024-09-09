/* eslint-disable tailwindcss/no-contradicting-classname */
"use client";

import GoldCoinIcon from "@/components/icons/gold-coin-icon";
import { Button } from "@/components/ui/button";
import useCommunity from "@/hooks/helpers/use-community";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import { IChampion } from "@/types/dungeon";
import { IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

import useOnRoomChange from "../../hooks/use-on-room-change";
import useOnStartGame from "../../hooks/use-on-start-game";
import usePlayerInfo from "../../hooks/use-player-info";
import useRoomSocket from "../../hooks/use-room-socket";
import ChooseAiModel from "./choose-ai-model";
import DurationSlider from "./duration-slider";
import ImageAudioToggle from "./image-audio-toggle";

interface IGameSettingsProps {
  conversationId: string;
  selectedChampion: IChampion | null | undefined;
  roomData: IRoomDetail | undefined;
  isAdmin: boolean;
  aiModelSelected: boolean;
  setAiModelSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameSettings = ({
  conversationId,
  selectedChampion,
  roomData,
  isAdmin,
  aiModelSelected,
  setAiModelSelected,
}: IGameSettingsProps) => {
  const { duration, setDuration } = usePlayerInfo(roomData);

  const { gameStarting } = useRoomSocket(conversationId);

  const { isDefault } = useCommunity();

  const { data: currentCommunity } = useGetCurrentCommunity();

  const { generateAudio, generateImages, setAiModel, setGenerateImages, setGenerateAudio } =
    useOnRoomChange({
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
      <ChooseAiModel
        selectedChampion={selectedChampion}
        isAdmin={isAdmin}
        roomData={roomData}
        aiModelSelected={aiModelSelected}
        setAiModelSelected={setAiModelSelected}
        setAiModel={setAiModel}
      />
      <div
        className={cn(
          "flex flex-1 flex-col items-center gap-8 py-4 text-sm",
          !selectedChampion && "hidden",
          isAdmin && !aiModelSelected && "hidden",
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
        <div className="flex w-full justify-center">
          <Button
            className="w-full whitespace-nowrap"
            disabled={disabled || !canBegin}
            isLoading={isGameStarting || gameStarting}
            onClick={onStartGame}
          >
            START{" "}
            {roomData && roomData.price > 0 && (
              <>
                {roomData?.price.toFixed(isDefault ? 0 : 5)}{" "}
                {isDefault ? <GoldCoinIcon className="size-5" /> : currentCommunity?.currencyName}
              </>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default GameSettings;
