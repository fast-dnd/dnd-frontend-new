import { decode, encode } from "@project-serum/anchor/dist/cjs/utils/bytes/bs58";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { AiFillSound, AiFillStar } from "react-icons/ai";
import { BiImages } from "react-icons/bi";
import { useReadLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import roomService from "@/services/room-service";
import { IDungeonDetail } from "@/types/dungeon";
import { IRoomDetail } from "@/types/room";
import { DungeonDuration, dungeonDurations } from "@/utils/dungeon-options";

import useOnRoomChange from "../../hooks/use-on-room-change";
import usePlayerInfo from "../../hooks/use-player-info";
import useRoomSocket from "../../hooks/use-room-socket";
import useStartGame from "../../hooks/use-start-game";

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
  roomData: IRoomDetail;
  dungeonData: IDungeonDetail;
}) => {
  const { duration, setDuration } = usePlayerInfo(roomData);

  const { gameStarting } = useRoomSocket(conversationId);

  const accountId = useReadLocalStorage<string>("accountId");

  const isAdmin = accountId === roomData.playerState[0].accountId;

  const { publicKey, signTransaction } = useWallet();

  const { setGenerateImages, setGenerateAudio, updatingRoom } = useOnRoomChange({
    conversationId,
    duration,
    roomData,
    isAdmin,
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

  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-semibold">GAME SETTINGS</p>
      <ToggleGroup
        className="inline-flex w-full items-center justify-center"
        type="single"
        onValueChange={(value) => setDuration(value as DungeonDuration)}
        label="Game mode"
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

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="px-8 uppercase"
              disabled={!isAdmin || !canBegin || gameStarting}
              isLoading={isGameStarting || gameStarting}
              onClick={async () => {
                if (publicKey) {
                  debugger;
                  const gameStartTx = await roomService.getStartGameTx({ conversationId });
                  const transaction = Transaction.from(decode(gameStartTx?.transaction as string));
                  const signedTx = await signTransaction!(transaction);
                  debugger;
                  const serializedTx = encode(signedTx.serialize());
                  debugger;
                  startGame({ conversationId, transaction: serializedTx });
                } else {
                  startGame({ conversationId });
                }
              }}
            >
              START ({roomData.price} coins)
            </Button>
          </TooltipTrigger>
          {!canBegin && (
            <TooltipContent>
              <p>Wait for all players to choose their role and avatar</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default UpdateRoom;
