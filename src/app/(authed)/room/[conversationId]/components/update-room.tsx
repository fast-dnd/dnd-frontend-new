import { AiFillSound, AiFillStar } from "react-icons/ai";
import { BiImages } from "react-icons/bi";

import { IDungeon } from "@/types/dnd";
import { IRoomData } from "@/services/room-service";
import { DungeonDuration, dungeonDuration } from "@/utils/dungeon-options";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import useOnRoomChange from "../hooks/use-on-room-change";
import usePlayerInfo from "../hooks/use-player-info";
import useRoomSocket from "../hooks/use-room-socket";
import useStartGame from "../hooks/use-start-game";

const imagesAudio = [
  {
    value: "images",
    icon: <BiImages />,
  },
  {
    value: "audio",
    icon: <AiFillSound />,
  },
];

const UpdateRoom = ({
  conversationId,
  roomData,
  dungeonData,
}: {
  conversationId: string;
  roomData: IRoomData;
  dungeonData: IDungeon;
}) => {
  const { duration, setDuration } = usePlayerInfo(roomData);

  const { gameStarting } = useRoomSocket(conversationId);

  const { setGenerateImages, setGenerateAudio } = useOnRoomChange({
    conversationId,
    duration,
    roomData,
  });

  const { mutate: startGame, isLoading: isGameStarting } = useStartGame();

  const generateAudioImagesArray = () => {
    const audioImagesArray = [];
    if (roomData.generateAudio) audioImagesArray.push("audio");
    if (roomData.generateImages) audioImagesArray.push("images");
    return audioImagesArray;
  };

  const onChangeImagesAudio = (value: string[]) => {
    if (value.includes("images")) setGenerateImages(true);
    else setGenerateImages(false);

    if (value.includes("audio")) setGenerateAudio(true);
    else setGenerateAudio(false);
  };

  const canBegin = roomData.playerState.every((player) => player.champion) ?? false;

  const isAdmin = localStorage.getItem("accountId") === roomData.playerState[0].accountId;

  return (
    <>
      <ToggleGroup
        className="inline-flex w-full items-center justify-center"
        type="single"
        onValueChange={(value) => setDuration(value as DungeonDuration)}
        label="Bob Verbal Engagement"
        value={roomData.responseDetailsDepth}
        disabled={!isAdmin}
      >
        {dungeonDuration.map((duration) => (
          <ToggleGroupItem
            key={duration.value}
            value={duration.value}
            className="relative flex w-full items-center justify-center gap-2 border border-white/25 px-4 py-2 text-sm transition-all duration-300 data-[state=on]:border-tomato lg:px-8 lg:text-base"
          >
            {duration.value === dungeonData.recommendedResponseDetailsDepth && (
              <div className="absolute right-1 top-1">
                <AiFillStar className="h-3 w-3 text-tomato" />
              </div>
            )}
            {duration.icon({})}
            {duration.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup
        className="inline-flex w-full items-center justify-center gap-8"
        type="multiple"
        onValueChange={onChangeImagesAudio}
        value={generateAudioImagesArray()}
        disabled={!isAdmin}
      >
        {imagesAudio.map((type) => (
          <ToggleGroupItem
            key={type.value}
            value={type.value}
            className="flex w-full items-center justify-center gap-2 border border-white/25 px-6 py-2 text-sm capitalize transition-all duration-300 data-[state=on]:border-tomato lg:px-10 lg:text-base"
          >
            {type.icon}
            {type.value}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="px-8 uppercase"
              disabled={!isAdmin || !canBegin || gameStarting}
              isLoading={isGameStarting || gameStarting}
              onClick={() => startGame({ conversationId })}
            >
              START
            </Button>
          </TooltipTrigger>
          {!canBegin && (
            <TooltipContent>
              <p>Wait for all players to choose their role and avatar</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default UpdateRoom;
