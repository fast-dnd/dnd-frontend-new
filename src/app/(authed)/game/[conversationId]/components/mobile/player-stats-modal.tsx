import { Coffee } from "iconsax-react";
import { AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from "usehooks-ts";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IPlayer, IRoomDetail } from "@/types/room";

import { gameStore } from "../../stores/game-store";
import Player from "../general/player";

const PlayerStatsModal = ({
  roomData,
  currentPlayer,
  open,
  onOpen,
  onClose,
}: {
  roomData: IRoomDetail;
  currentPlayer: IPlayer;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const isMobileTablet = useMediaQuery("(max-width: 1024px)");

  const pageState = gameStore.pageState.use();
  const rewardOpen = gameStore.reward.use();

  return (
    <Dialog
      open={open && isMobileTablet && pageState === "DEFAULT" && !rewardOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogTrigger onClick={onOpen} className="flex items-center gap-2 text-xs uppercase">
        <Coffee className="h-5 w-5" /> <p className="mt-0.5">player stats</p>
      </DialogTrigger>
      <DialogContent
        fromBottom
        className="pointer-events-auto bottom-0 left-0 top-auto flex max-h-[350px] min-h-[250px] w-full max-w-full translate-x-0 translate-y-0 flex-col bg-black/80 p-0 pb-4 focus:border-0 focus:ring-0 data-[state=closed]:duration-300 data-[state=open]:duration-300"
      >
        <div className="flex h-14 w-full items-start justify-between bg-gradient-to-b from-black to-transparent p-4">
          <div className="flex items-center gap-2 text-xs font-medium uppercase">
            <Coffee className="h-5 w-5" /> <p className="mt-0.5">player stats</p>
          </div>
          <AiOutlineClose className="h-4 w-4" onClick={onClose} />
        </div>
        <div className="flex h-full w-full flex-col gap-5 overflow-y-auto p-4">
          {roomData.playerState
            .filter((player) => player.accountId !== currentPlayer.accountId)
            .map((player) => (
              <Player key={player.accountId} player={player} />
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerStatsModal;
