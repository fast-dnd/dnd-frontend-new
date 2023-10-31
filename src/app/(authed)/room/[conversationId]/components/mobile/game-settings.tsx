import { useReadLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { IChampion } from "@/types/dungeon";
import { IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

import useOnRoomChange from "../../hooks/use-on-room-change";
import usePlayerInfo from "../../hooks/use-player-info";
import useRoomSocket from "../../hooks/use-room-socket";
import useStartGame from "../../hooks/use-start-game";
import DurationSlider from "./duration-slider";
import ImageAudioToggle from "./image-audio-toggle";

const GameSettings = ({
  conversationId,
  selectedChampion,
  roomData,
}: {
  conversationId: string;
  selectedChampion: IChampion | null | undefined;
  roomData: IRoomDetail | undefined;
}) => {
  const { duration, setDuration } = usePlayerInfo(roomData);

  const { gameStarting } = useRoomSocket(conversationId);

  const accountId = useReadLocalStorage<string>("accountId");

  const isAdmin = accountId === roomData?.playerState[0].accountId;

  const { generateAudio, generateImages, setGenerateImages, setGenerateAudio } = useOnRoomChange({
    conversationId,
    duration,
    roomData,
    isAdmin,
  });

  const { mutate: startGame, isLoading: isGameStarting } = useStartGame();

  const canBegin = roomData?.playerState.every((player) => player.champion) ?? false;

  const disabled = !isAdmin || isGameStarting || gameStarting;

  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center gap-4 px-8 py-4 text-sm",
        !selectedChampion && "hidden",
      )}
    >
      <p className="uppercase">Game settings</p>
      <DurationSlider duration={duration} setDuration={setDuration} disabled={disabled} />
      <div className="-mx-8 mt-4 h-1 w-[calc(100%_+_4rem)] bg-black shadow-lobby" />
      <div className="flex w-full flex-wrap items-center gap-6">
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
      <Button
        className="mt-auto"
        disabled={disabled || !canBegin}
        isLoading={isGameStarting || gameStarting}
        onClick={() => startGame({ conversationId })}
      >
        PLAY ({roomData?.price} coins)
      </Button>
    </div>
  );
};

export default GameSettings;
