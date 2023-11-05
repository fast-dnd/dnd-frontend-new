import { Button } from "@/components/ui/button";
import { IPlayer, IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

import usePlayMove from "../../hooks/use-play-move";
import { moveStore } from "../../stores/move-store";
import DiceBreakdown from "./dice-breakdown";
import Die from "./die";

const RollDice = ({
  conversationId,
  roomData,
  currentPlayer,
}: {
  conversationId: string;
  roomData: IRoomDetail;
  currentPlayer: IPlayer;
}) => {
  const { onPlay, submitting } = usePlayMove(conversationId, roomData, currentPlayer);

  const store = moveStore.use();

  return (
    <div className="flex flex-col justify-between bg-white/5 lg:w-[270px]">
      <div className="relative flex h-28 items-center justify-center gap-4">
        {((store.roll?.diceAfterBonus || 0) >= 2 || submitting) && (
          <>
            {store.buttonState === "ROLLING" &&
              store.dice.map((roll, i) => <Die key={i} roll={roll} />)}

            {!!store.roll && store.buttonState !== "ROLLING" && <DiceBreakdown />}
          </>
        )}
      </div>
      <Button
        disabled={!store.canPlay || (!store.move && !store.freeWill)}
        className={cn(
          "h-12 px-0 normal-case",
          store.buttonState !== "DEFAULT" && "bg-white/5 text-white",
        )}
        onClick={onPlay}
      >
        {store.buttonState === "DEFAULT" && <p className="text-center">Roll the dice</p>}
        {store.buttonState === "ROLLING" && <p className="text-center">Rolling...</p>}
        {store.buttonState === "ROLLED" && (
          <div className="flex w-full justify-between px-4">
            <p>Total</p>
            <p>{store.roll?.diceAfterBonus}</p>
          </div>
        )}
      </Button>
    </div>
  );
};

export default RollDice;
