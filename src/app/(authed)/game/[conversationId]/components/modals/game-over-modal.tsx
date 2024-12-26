import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button, SoundEffect } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import ThemeTitle from "@/components/ui/theme-title";
import useCommunity from "@/hooks/helpers/use-community";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import { IDungeonDetail } from "@/types/dungeon";
import { IGameState, IPlayer } from "@/types/room";

import { gameStore } from "../../stores/game-store";
import Player from "../general/player";

interface GameOverModalProps {
  result: IGameState;
  dungeon: IDungeonDetail;
  players: IPlayer[];
}

const GameOverModal = ({ result, dungeon, players }: GameOverModalProps) => {
  const { isDefault } = useCommunity();

  const { data: currentCommunity } = useGetCurrentCommunity();

  const pageState = gameStore.pageState.use();
  const rewardOpen = gameStore.reward.use();

  const open = pageState === "GAMEOVER" && !rewardOpen;

  const close = () => {
    gameStore.pageState.set("DEFAULT");
  };

  const rate = () => {
    gameStore.pageState.set("RATE");
  };

  const router = useRouter();
  const [goingHome, setGoingHome] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) close();
      }}
    >
      <DialogContent
        alwaysOnTop
        className="flex size-full flex-col p-4 max-lg:max-w-full max-lg:rounded-none max-lg:bg-dark-900 lg:max-h-[800px] lg:w-fit lg:max-w-[550px]"
      >
        <div className="pointer-events-none absolute inset-0 size-full -translate-y-1/3 bg-radialGradient lg:hidden">
          <div className="size-full blur-xl" />
        </div>
        <DialogHeader>
          <ThemeTitle title={result === "WIN" ? "victory" : "defeat"} blue={result === "WIN"} />

          <DialogDescription className="text-left lg:w-[440px]">
            {result === "WIN" && (
              <span className="text-xl tracking-normal">
                {isDefault ? (
                  <>
                    You have completed <span className="font-semibold">{dungeon.name}</span>
                  </>
                ) : (
                  <>
                    You have completed <span className="font-semibold">{dungeon.name}</span>. Keep
                    playing and reach the top of the{" "}
                    <Link href="/leaderboard" className="text-primary underline">
                      leaderboard
                    </Link>{" "}
                    in order to earn a reward in ${currentCommunity?.name}.
                  </>
                )}
              </span>
            )}
            {result === "LOSE" && (
              <span className="text-xl tracking-normal">
                {isDefault ? (
                  <>You have tried with all your might, but you have been defeated.</>
                ) : (
                  <>
                    You have tried with all your might, but you have been defeated. Keep playing and
                    reach the top of the{" "}
                    <Link href="/leaderboard" className="text-primary underline">
                      leaderboard
                    </Link>{" "}
                    in order to earn a reward IN ${currentCommunity?.name}.
                  </>
                )}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex min-h-0 w-full flex-1 flex-col gap-6 overflow-y-auto lg:mt-8 lg:gap-8">
          <div className="w-full border-t border-white/25 max-lg:hidden" />
          <div className="h-0.5 w-full bg-black shadow-lobby lg:hidden" />
          {players.map((player) => (
            <Player key={player.accountId} player={player} />
          ))}
        </div>
        <DialogFooter className="flex-col items-center  max-lg:gap-3">
          <Button
            variant="outline"
            className="flex px-4 text-base max-lg:w-64 lg:text-xl"
            onClick={rate}
            autoFocus
            sound={SoundEffect.CLICK_ARROW}
          >
            RATE THIS ADVENTURE
          </Button>
          <Button
            variant="primary"
            className="flex whitespace-nowrap px-4 text-base max-lg:w-64 lg:text-xl"
            onClick={() => {
              setGoingHome(true);
              router.push("/home");
            }}
            sound={SoundEffect.CLICK_ARROW}
            isLoading={goingHome}
          >
            GO BACK HOME
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverModal;
