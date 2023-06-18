"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";
import useGetDungeon from "@/hooks/use-get-dungeon";
import useGetRoomData from "@/hooks/use-get-room-data";
import { IPlayer, MoveType, defaultMoves } from "@/types/dnd";
import { cn } from "@/utils/style-utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import Die from "./die";
import Spinner from "@/components/ui/spinner";

const Gameplay = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeonData } = useGetDungeon(roomData?.dungeonId);
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();
  const [move, setMove] = useState<MoveType>();
  const [canPlay, setCanPlay] = useState(true);
  const [powerUp, setPowerUp] = useState(0);
  const [freeWill, setFreeWill] = useState<string>("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (roomData) {
      setCurrentPlayer(
        roomData.playerState.find(
          (player) => player.accountId === localStorage.getItem("accountId"),
        ),
      );
      if (roomData.roundEndsAt) {
        const endsAt = new Date(roomData.roundEndsAt);
        setTimer(Math.floor((endsAt.getTime() - new Date().getTime()) / 1000));
      }
    }
  }, [roomData]);

  useEffect(() => {
    timer > 0 && setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);

  const timeToDisplay = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${("0" + seconds).slice(-2)}`;
  };

  if (!roomData || !dungeonData || !currentPlayer)
    return (
      <Box title="" className="flex h-full justify-center items-center">
        <Spinner className="h-40 w-40" />
      </Box>
    );

  return (
    <Box title={dungeonData.name} className="flex flex-col min-h-0 flex-1 gap-8 px-12 py-8">
      <div className="w-full flex flex-col flex-1 gap-8 pr-6 overflow-y-auto">
        {roomData.chatGptResponses.map((story, i) => (
          <div key={story} className="flex flex-col gap-8 w-full">
            <div className="w-full flex gap-8 items-center">
              <div className="font-semibold text-2xl tracking-[0.2em] uppercase">
                <span className="text-tomato">TURN {i + 1}.</span>
                {dungeonData.locations[Math.floor(i / 2)].name}
              </div>
              <div className="flex-1 border-t border-tomato" />
            </div>
            <div className="flex gap-8">
              <Image
                src={dungeonData.imageUrl || "/images/bg-cover.png"}
                alt="dungeon"
                height={280}
                width={280}
                className="h-72 w-72"
              />
              <div className="flex flex-col gap-4">
                {/* sound */}
                <div className="text-[22px] leading-8 tracking-widest">{story}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-8 w-full">
        {roomData.location.phase === "end" && (
          <div className="flex flex-col flex-1 gap-4">
            <div
              className={cn(
                "py-2.5 px-8 text-center bg-white/5 text-xl tracking-[0.07em] indent-[0.07em]",
                !canPlay && "text-white/50",
              )}
            >
              <span className="font-semibold">Choose an action</span> - {timeToDisplay()} Left
            </div>
            <div className="flex gap-4 w-full flex-wrap">
              {defaultMoves.map((dMove) => (
                <Button
                  key={dMove}
                  variant="ghost"
                  disabled={!canPlay}
                  className={cn(
                    "border-white/25 flex-1 h-12 basis-1/3 normal-case text-white",
                    dMove === move && "border-tomato",
                  )}
                  onClick={() => setMove(dMove)}
                >
                  {currentPlayer.champion.moveMapping[dMove]}
                </Button>
              ))}
            </div>
          </div>
        )}
        {roomData.location.phase === "discovery" && (
          <div className="flex flex-col h-full flex-1 gap-4">
            <div
              className={cn(
                "py-2.5 px-8 text-center bg-white/5 text-xl tracking-[0.07em] indent-[0.07em]",
                !canPlay && "text-white/50",
              )}
            >
              <span className="font-semibold">Type your move and select a power up</span> -{" "}
              {timeToDisplay()} Left
            </div>
            <div className="flex gap-4 h-full">
              <TextArea
                className="m-0 h-full border-white/50"
                placeholder="I found a secret tunnel and escape through it..."
                disabled={!canPlay}
                onChange={(e) => setFreeWill(e.target.value)}
              />
              <div className="flex w-[72px] flex-col gap-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <Button
                    variant="ghost"
                    key={i}
                    disabled={!canPlay || currentPlayer.mana < i}
                    className={cn(
                      "font-semibold h-8 text-white bg-white/5 tracking-[0.2em]",
                      powerUp === i && "border-tomato",
                    )}
                    onClick={() => setPowerUp(i)}
                  >
                    +{i}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-between bg-white/5 w-[270px]">
          <div className="flex items-center justify-center gap-4 h-32">
            <Die roll={5} />
            <Die roll={2} />
          </div>
          <Button
            disabled={!canPlay}
            className={cn("h-12 normal-case", !canPlay && "bg-white/5 text-white")}
          >
            {canPlay ? "Roll the dice" : `Dice total: ${"7"}`}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default Gameplay;
