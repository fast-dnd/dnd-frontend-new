import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import ThemeTitle from "@/components/ui/theme-title";
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
  const pageState = gameStore.pageState.use();

  const open = pageState === "GAMEOVER";

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
      <DialogContent className="flex max-h-[800px] w-fit flex-col lg:max-w-[550px]">
        <DialogHeader>
          <ThemeTitle title={result === "WIN" ? "victory" : "defeat"} blue={result === "WIN"} />

          <DialogDescription className="w-[440px] text-center">
            {result === "WIN" && (
              <span>
                You have completed <span className="font-semibold">{dungeon.name}</span>
              </span>
            )}
            {result === "LOSE" && (
              <span>You have tried with all your might, but you have been defeated.</span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex min-h-0 w-full flex-1 flex-col gap-6 overflow-y-auto lg:mt-8 lg:gap-8">
          <div className="w-full border-t border-white/25" />

          {players.map((player) => (
            <Player key={player.accountId} player={player} />
          ))}
        </div>
        <DialogFooter className="flex-col">
          <Button
            variant="outline"
            className="flex px-8 text-base lg:text-xl"
            onClick={rate}
            autoFocus
          >
            RATE THIS DUNGEON
          </Button>
          <Button
            variant="primary"
            className="flex whitespace-nowrap px-8 text-base lg:text-xl"
            onClick={() => {
              setGoingHome(true);
              close();
              router.push("/home");
            }}
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
