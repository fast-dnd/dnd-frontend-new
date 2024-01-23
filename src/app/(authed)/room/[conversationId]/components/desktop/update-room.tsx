import Image from "next/image";
import { Brain, PenNib } from "@phosphor-icons/react";
import { AiFillSound, AiFillStar } from "react-icons/ai";
import { BiImages } from "react-icons/bi";
import { useReadLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip } from "@/components/ui/tooltip";
import useCommunity from "@/hooks/helpers/use-community";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import { IDungeonDetail } from "@/types/dungeon";
import { IRoomDetail } from "@/types/room";
import { DungeonDuration, dungeonDurations } from "@/utils/dungeon/dungeon-options";

import useOnRoomChange from "../../hooks/use-on-room-change";
import useOnStartGame from "../../hooks/use-on-start-game";
import usePlayerInfo from "../../hooks/use-player-info";
import useRoomSocket from "../../hooks/use-room-socket";

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

interface IUpdateRoomProps {
  conversationId: string;
  roomData: IRoomDetail;
  dungeonData: IDungeonDetail;
}

const UpdateRoom = ({ conversationId, roomData, dungeonData }: IUpdateRoomProps) => {
  const { duration, setDuration } = usePlayerInfo(roomData);

  const { gameStarting } = useRoomSocket(conversationId);

  const accountId = useReadLocalStorage<string>("accountId");

  const isAdmin = accountId === roomData.playerState[0].accountId;

  const { isDefault } = useCommunity();
  const { data: currentCommunity } = useGetCurrentCommunity();

  const {
    setGenerateImages,
    setGenerateAudio,
    setGenerateRandomWords,
    generateRandomWords,
    updatingRoom,
  } = useOnRoomChange({
    conversationId,
    duration,
    roomData,
    isAdmin,
  });

  const { isGameStarting, onStartGame } = useOnStartGame({ conversationId });

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

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold">GAME SETTINGS</p>
      <ToggleGroup
        className="inline-flex w-full items-center justify-center"
        type="single"
        onValueChange={(value) => setGenerateRandomWords(value === "words")}
        label="Game mode"
        value={roomData.generateRandomWords ? "words" : "regular"}
        loading={updatingRoom && generateRandomWords !== roomData.generateRandomWords}
        disabled={!isAdmin || isGameStarting || gameStarting}
      >
        <Tooltip
          content={
            <div className="flex w-fit flex-col">
              <p className="text-xl font-bold">Regular Game</p>
              <p className="mt-1 w-64 whitespace-break-spaces text-sm font-light">
                Choose round outcome by writing your response completely freely.
              </p>
              <div className="rounded-md bg-black p-2">
                <Image
                  width={268}
                  height={141}
                  src="/images/regular-game-image.png"
                  alt="Word Game Example"
                  className="mt-5"
                />
              </div>
            </div>
          }
          className="w-full"
          contentClassName="drop-shadow-2xl backdrop-blur-md bg-black/75 p-4"
        >
          <ToggleGroupItem value="regular" className="relative px-4 lg:px-8">
            <Brain />
            Regular Game
          </ToggleGroupItem>
        </Tooltip>

        <Tooltip
          content={
            <div className="flex w-fit flex-col">
              <p className="text-xl font-bold">Word Game</p>
              <p className="mt-1 w-64 whitespace-break-spaces text-sm font-light">
                Get challenged by creating a meaningful sentence out of several predefined words.
              </p>
              <Image
                width={268}
                height={141}
                src="/images/word-game-image.png"
                alt="Word Game Example"
                className="mt-5"
              />
            </div>
          }
          className="w-full"
          contentClassName="drop-shadow-2xl backdrop-blur-md bg-black/75 p-4"
        >
          <ToggleGroupItem value="words" className="relative px-4 lg:px-8">
            <PenNib />
            Word Game
          </ToggleGroupItem>
        </Tooltip>
      </ToggleGroup>
      <ToggleGroup
        className="inline-flex w-full items-center justify-center"
        type="single"
        onValueChange={(value) => setDuration(value as DungeonDuration)}
        label="Game duration"
        value={roomData.responseDetailsDepth}
        loading={updatingRoom && duration !== roomData.responseDetailsDepth}
        disabled={!isAdmin || isGameStarting || gameStarting}
      >
        {dungeonDurations.map((duration) => (
          <ToggleGroupItem
            key={duration.value}
            value={duration.value}
            className="relative px-4 lg:px-8"
          >
            {duration.value === dungeonData.recommendedResponseDetailsDepth && (
              <div className="absolute right-1 top-1">
                <AiFillStar className="h-3 w-3 text-primary" />
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
        disabled={!isAdmin || isGameStarting || gameStarting}
        label="Media options"
      >
        {imagesAudio.map((type) => (
          <ToggleGroupItem key={type.value} value={type.value}>
            {type.icon}
            {type.value}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <Tooltip content="Wait for all players to choose their role and avatar" disabled={canBegin}>
        <Button
          className="px-8 uppercase"
          disabled={!isAdmin || !canBegin || gameStarting}
          isLoading={isGameStarting || gameStarting}
          onClick={onStartGame}
        >
          START ({roomData.price.toFixed(isDefault ? 0 : 5)}{" "}
          {isDefault ? "coins" : currentCommunity?.currencyName})
        </Button>
      </Tooltip>
    </div>
  );
};

export default UpdateRoom;
