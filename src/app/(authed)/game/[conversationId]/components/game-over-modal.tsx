"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IGamePlayer } from "@/types/game";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Spinner from "@/components/ui/spinner";

import Player from "./player";

interface GameOverModalProps {
  open: boolean;
  close: () => void;
  result: "GAMING" | "WON" | "LOST";
  dungeonName: string;
  players: IGamePlayer[];
}

const GameOverModal = ({ open, close, result, dungeonName, players }: GameOverModalProps) => {
  const router = useRouter();
  const [goingHome, setGoingHome] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(change) => {
        if (!change) close();
      }}
    >
      <DialogContent className="max-h-[700px] w-fit lg:max-w-[550px]">
        <DialogHeader className="lg:px-0">
          <DialogTitle>
            {result === "WON" && "Game finished"}
            {result === "LOST" && "You failed"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {result === "WON" && (
              <span>
                You have completed <span className="font-semibold">{dungeonName}</span>
              </span>
            )}
            {result === "LOST" && (
              <span>
                You and your teammates have died in the adventure.
                <span className="font-semibold"> Better luck next time!</span>
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-6 flex min-h-0 w-full flex-1 flex-col gap-6 overflow-y-scroll lg:mt-8 lg:gap-8">
          <div className="w-full border-t border-white/25" />

          {players.map((player) => (
            <Player key={player.accountId} player={player} />
          ))}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="flex w-fit flex-1 border-tomato px-8 text-base lg:text-xl"
            onClick={close}
          >
            CLOSE
          </Button>
          <Button
            variant="primary"
            className="flex w-fit flex-1 whitespace-nowrap px-8 text-base lg:text-xl"
            onClick={() => {
              setGoingHome(true);
              close();
              router.push("/home");
            }}
          >
            {goingHome && <Spinner className="m-0 h-4 w-4" />}
            GO HOME
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverModal;
