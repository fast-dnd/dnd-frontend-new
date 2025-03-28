import { AiFillSound, AiFillStar } from "react-icons/ai";
import { useReadLocalStorage } from "usehooks-ts";

import GoldCoinIcon from "@/components/icons/gold-coin-icon";
import { Button, SoundEffect } from "@/components/ui/button";
import { SelectWithImages } from "@/components/ui/select-images";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip } from "@/components/ui/tooltip";
import useCommunity from "@/hooks/helpers/use-community";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import { IDungeonDetail } from "@/types/dungeon";
import { IAiModel, IRoomDetail } from "@/types/room";
import { aiModels } from "@/utils/ai-models";
import { DungeonDuration, dungeonDurations } from "@/utils/dungeon/dungeon-options";

import useOnRoomChange from "../../hooks/use-on-room-change";
import useOnStartGame from "../../hooks/use-on-start-game";
import usePlayerInfo from "../../hooks/use-player-info";
import useRoomSocket from "../../hooks/use-room-socket";

const imagesAudio = [
  // {
  //   value: "images",
  //   icon: <BiImages />,
  // },
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

  const { setGenerateImages, setGenerateAudio, setAiModel, updatingRoom } = useOnRoomChange({
    conversationId,
    duration,
    roomData,
    isAdmin,
  });

  const { isGameStarting, onStartGame } = useOnStartGame({ conversationId });

  const generateAudioImagesArray = () => {
    const audioImagesArray = [];
    if (roomData.generateAudio) audioImagesArray.push("audio");
    // if (roomData.generateImages) audioImagesArray.push("images");
    return audioImagesArray;
  };

  const onChangeImagesAudio = (value: string[]) => {
    // if (value.includes("images")) setGenerateImages(true);
    // else setGenerateImages(false);

    if (value.includes("audio")) setGenerateAudio(true);
    else setGenerateAudio(false);
  };

  const canBegin = roomData.playerState.every((player) => player.champion) ?? false;

  const selectedAiModel = aiModels.find((aiModel) => aiModel.aiModel === roomData.aiModel)!;

  return (
    <div className="flex flex-col gap-4">
      <div className="h-0.5 bg-black/35 shadow-lobby" />
      <p className="text-lg font-semibold">GAME SETTINGS</p>
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
                <AiFillStar className="size-3 text-primary" />
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

      <div className="h-0.5 bg-black/35 shadow-lobby" />

      <p className="text-lg font-semibold">AI MODEL</p>

      <SelectWithImages
        value={roomData.aiModel}
        onChange={(value) => setAiModel(value as IAiModel)}
        options={aiModels.map((aiModel) => ({
          value: aiModel.aiModel,
          imgUrl: aiModel.imgUrl,
          name: aiModel.name,
          description: aiModel.description,
          longDescription: aiModel.longDescription,
        }))}
        selectedOption={
          aiModels.find((model) => model.aiModel === roomData.aiModel)
            ? {
                value: selectedAiModel.aiModel,
                imgUrl: selectedAiModel.imgUrl,
                name: selectedAiModel.name,
                description: selectedAiModel.description,
                longDescription: selectedAiModel.longDescription,
              }
            : undefined
        }
        className="w-full bg-black p-3"
      />

      <Tooltip content="Wait for all players to choose their role and avatar" disabled={canBegin}>
        <Button
          className="px-8 uppercase"
          disabled={!isAdmin || !canBegin || gameStarting}
          isLoading={isGameStarting || gameStarting}
          sound={SoundEffect.DRUMS}
          onClick={onStartGame}
        >
          START{" "}
          {roomData.price > 0 && (
            <>
              {roomData.price.toFixed(isDefault ? 0 : 5)}{" "}
              {isDefault ? <GoldCoinIcon className="size-5" /> : currentCommunity?.currencyName}
            </>
          )}
        </Button>
      </Tooltip>
    </div>
  );
};

export default UpdateRoom;
