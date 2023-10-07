"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Rating } from "@smastrom/react-rating";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IDungeonDetail } from "@/types/dungeon";
import { IGameState, IPlayer } from "@/types/room";

import useRateDungeon from "../hooks/use-rate-dungeon";
import Player from "./player";

interface GameOverModalProps {
  open: boolean;
  close: () => void;
  result: IGameState;
  dungeon: IDungeonDetail;
  conversationId: string;
  players: IPlayer[];
}

const GameOverModal = ({
  open,
  close,
  result,
  dungeon,
  conversationId,
  players,
}: GameOverModalProps) => {
  const router = useRouter();
  const [goingHome, setGoingHome] = useState(false);
  const [rating, setRating] = useState(3);
  const [rated, setRated] = useState(false);
  const { mutate } = useRateDungeon();

  const rateDungeon = () => {
    setRated(true);
    mutate({ dungeonId: dungeon._id, rating, roomId: conversationId });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(change) => {
        if (!change) close();
      }}
    >
      <DialogContent className="max-h-[700px] w-fit lg:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {result === "WIN" && "Game finished"}
            {result === "LOSE" && "You failed"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {result === "WIN" && (
              <span>
                You have completed <span className="font-semibold">{dungeon.name}</span>
              </span>
            )}
            {result === "LOSE" && (
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
        <div className="mt-6 flex w-full flex-col gap-3">
          <div className="w-full border-t border-white/25" />
          <p>Rate this adventure</p>
          <div className="flex items-center gap-4">
            <Rating className="grow" value={rating} onChange={setRating} isDisabled={rated} />
            <Button
              variant={rated ? "outline" : "primary"}
              className="h-fit w-fit"
              onClick={rateDungeon}
              disabled={rated}
            >
              Rate
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="flex w-fit flex-1 border-primary px-8 text-base lg:text-xl"
            onClick={close}
            autoFocus
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
            isLoading={goingHome}
          >
            GO HOME
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameOverModal;
