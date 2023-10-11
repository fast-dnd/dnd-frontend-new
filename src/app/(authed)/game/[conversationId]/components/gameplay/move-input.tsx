import { AiFillHeart } from "react-icons/ai";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";

import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";
import { IChampion } from "@/types/dungeon";
import { IDefaultMove } from "@/types/room";
import { cn } from "@/utils/style-utils";

import { moveStore } from "../../stores/move-store";

const MoveInput = ({ champion }: { champion: IChampion | null | undefined }) => {
  const move = moveStore.move.use();
  const canPlay = moveStore.canPlay.use();
  const freeWill = moveStore.freeWill.use();

  if (!champion) return <div>Something went wrong</div>;
  return (
    <div className="relative flex h-60 lg:h-full">
      <TextArea
        maxLength={300}
        className="m-0 h-full border-white/50"
        indent={!!move}
        placeholder="I found a secret tunnel and escape through it..."
        disabled={!canPlay}
        onChange={(e) => {
          moveStore.freeWill.set(e.target.value);
          moveStore.move.set(undefined);
        }}
        value={move ? champion.moveMapping[move] : freeWill}
      />
      <div className="pointer-events-none absolute top-0 flex h-full w-full flex-col justify-between gap-8 p-4">
        <div>{!!move && <MoveDisplay move={move} />}</div>
        <div className="flex w-full flex-col gap-2 lg:flex-row">
          <div className="flex h-9 justify-between gap-2 lg:justify-start">
            <Button
              variant="ghost"
              disabled={!canPlay}
              className={cn(
                "pointer-events-auto h-9 w-9 shrink grow bg-white/5 px-0 text-primary-500 hover:text-primary-500 active:text-primary-500 lg:shrink-0 lg:grow-0",
                move === "discover_health" && "border-dark-600 text-primary-500",
              )}
              onClick={() => moveStore.move.set("discover_health")}
            >
              <AiFillHeart />
            </Button>
            <Button
              variant="ghost"
              disabled={!canPlay}
              className={cn(
                "pointer-events-auto h-9 w-9 shrink grow bg-white/5 px-0 text-cyan-500 hover:text-cyan-400 active:text-cyan-400 lg:shrink-0 lg:grow-0",
                move === "discover_mana" && "border-dark-600 text-cyan-400",
              )}
              onClick={() => moveStore.move.set("discover_mana")}
            >
              <HiSparkles />
            </Button>
            <Button
              variant="ghost"
              disabled={!canPlay}
              className={cn(
                "pointer-events-auto h-9 w-9 shrink grow bg-white/5 px-0 text-dark-200 lg:shrink-0 lg:grow-0",
                move === "conversation_with_team" && "border-dark-600 text-white",
              )}
              onClick={() => moveStore.move.set("conversation_with_team")}
            >
              <GoPeople />
            </Button>
            <Button
              variant="ghost"
              disabled={!canPlay}
              className={cn(
                "pointer-events-auto h-9 w-9 shrink grow bg-white/5 px-0 text-dark-200 lg:shrink-0 lg:grow-0",
                move === "rest" && "border-dark-600 text-white",
              )}
              onClick={() => moveStore.move.set("rest")}
            >
              <GiNightSleep />
            </Button>
          </div>
          <Button
            variant="ghost"
            disabled={!canPlay}
            className={cn(
              "pointer-events-auto h-9 bg-white/5 px-4 normal-case text-dark-200 lg:w-fit",
              !move && "border-dark-600 text-white",
            )}
            onClick={() => moveStore.move.set(undefined)}
          >
            Use free will
          </Button>
        </div>
      </div>
    </div>
  );
};

const MoveDisplay = ({ move }: { move: IDefaultMove }) => {
  return (
    <div
      className={cn(
        "-mt-0.5 flex items-center gap-2 text-lg",
        move === "discover_health" && "text-primary",
        move === "discover_mana" && "text-cyan-500",
      )}
    >
      {move === "discover_health" && (
        <>
          <AiFillHeart /> Heal:
        </>
      )}
      {move === "discover_mana" && (
        <>
          <HiSparkles /> Mana:
        </>
      )}
      {move === "conversation_with_team" && (
        <>
          <GoPeople /> Team:
        </>
      )}
      {move === "rest" && (
        <>
          <GiNightSleep /> Rest:
        </>
      )}
    </div>
  );
};
export default MoveInput;
