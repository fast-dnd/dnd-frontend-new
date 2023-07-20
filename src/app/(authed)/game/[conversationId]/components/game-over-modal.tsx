"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { IPlayer } from "@/types/game";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner";

import Player from "./player";

interface GameOverModalProps {
  open: boolean;
  close: () => void;
  result: "GAMING" | "WON" | "LOST";
  dungeonName: string;
  players: IPlayer[];
}

const GameOverModal = ({ open, close, result, dungeonName, players }: GameOverModalProps) => {
  const router = useRouter();
  const [goingHome, setGoingHome] = useState(false);

  return (
    <Modal
      open={open}
      onClose={close}
      className="mx-8 flex h-fit max-h-[700px] w-fit flex-col items-center gap-6 bg-black/90 px-6 py-8 text-lg shadow-xl shadow-white/10 lg:max-w-[550px] lg:gap-8 lg:px-12 lg:text-xl"
    >
      <div className="flex flex-col gap-3 lg:gap-4">
        <p className="text-center font-medium uppercase leading-7 tracking-[3.3px]">
          {result === "WON" && "Game finished"}
          {result === "LOST" && "You failed"}
        </p>
        <p className="text-center leading-7 tracking-[2.64px] text-white/60">
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
        </p>
      </div>

      <div className="w-full border-t border-white/25" />
      <div className="flex min-h-0 w-full flex-1 flex-col gap-6 overflow-y-scroll lg:gap-8">
        {players.map((player) => (
          <Player key={player.accountId} player={player} />
        ))}
      </div>
      <div className="flex w-full flex-wrap justify-between gap-6">
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
      </div>
    </Modal>
  );
};

export default GameOverModal;
