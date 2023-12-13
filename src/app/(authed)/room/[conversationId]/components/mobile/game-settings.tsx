import { decode, encode } from "@project-serum/anchor/dist/cjs/utils/bytes/bs58";
import { useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { useReadLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import useCommunity from "@/hooks/helpers/use-community";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import roomService from "@/services/room-service";
import { IChampion } from "@/types/dungeon";
import { IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

import useOnRoomChange from "../../hooks/use-on-room-change";
import usePlayerInfo from "../../hooks/use-player-info";
import useRoomSocket from "../../hooks/use-room-socket";
import useStartGame from "../../hooks/use-start-game";
import DurationSlider from "./duration-slider";
import ImageAudioToggle from "./image-audio-toggle";

interface IGameSettingsProps {
  conversationId: string;
  selectedChampion: IChampion | null | undefined;
  roomData: IRoomDetail | undefined;
}

const GameSettings = ({ conversationId, selectedChampion, roomData }: IGameSettingsProps) => {
  const { duration, setDuration } = usePlayerInfo(roomData);

  const { gameStarting } = useRoomSocket(conversationId);

  const accountId = useReadLocalStorage<string>("accountId");

  const isAdmin = accountId === roomData?.playerState[0].accountId;

  const { publicKey, signTransaction } = useWallet();

  const { isDefault } = useCommunity();
  const { data: currentCommunity } = useGetCurrentCommunity();

  const { generateAudio, generateImages, setGenerateImages, setGenerateAudio } = useOnRoomChange({
    conversationId,
    duration,
    roomData,
    isAdmin,
  });

  const { mutate: startGame, isLoading: isGameStarting } = useStartGame();

  const canBegin = roomData?.playerState.every((player) => player.champion) ?? false;

  const disabled = !isAdmin || isGameStarting || gameStarting;

  const onStartGame = async () => {
    if (publicKey && signTransaction) {
      const gameStartTx = await roomService.getStartGameTx({ conversationId });
      const transaction = Transaction.from(decode(gameStartTx.transaction));
      const signedTx = await signTransaction(transaction);

      const serializedTx = encode(signedTx.serialize());
      startGame({ conversationId, transaction: serializedTx });
    } else {
      startGame({ conversationId });
    }
  };

  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center gap-8 py-4 text-sm",
        !selectedChampion && "hidden",
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
        START ({roomData?.price.toFixed(5)} {isDefault ? "coins" : currentCommunity?.currencyName})
      </Button>
    </div>
  );
};

export default GameSettings;
