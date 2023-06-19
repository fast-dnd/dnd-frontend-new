"use client";
import { Box } from "@/components/ui/box";
import useGetRoomData from "@/hooks/use-get-room-data";
import { IPlayer } from "@/types/dnd";
import { FormEventHandler, useEffect, useState } from "react";
import Player from "./player";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style-utils";
import { AiOutlineLeft } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import { IoMdSend } from "react-icons/io";

const General = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const { data: roomData } = useGetRoomData(conversationId);
  const [currentPlayer, setCurrentPlayer] = useState<IPlayer>();
  const [statsOpened, setStatsOpened] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    if (roomData) {
      setCurrentPlayer(
        roomData.playerState.find(
          (player) => player.accountId === localStorage.getItem("accountId"),
        ),
      );
    }
  }, [roomData]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    console.log(question);
  };

  if (!roomData || !currentPlayer) {
    return <Box title="general" className="h-full"></Box>;
  }

  return (
    <Box title="general" className="flex flex-col min-h-0 flex-1 gap-8 p-8">
      <Player player={currentPlayer} />
      <div className="w-full border-t border-white/25" />
      <div className={cn("flex flex-col min-h-0 flex-1 gap-8", statsOpened && "hidden")}>
        <Button
          variant={"ghost"}
          className="border-white text-white"
          onClick={() => setStatsOpened(true)}
        >
          Team stats
        </Button>

        <div className="flex flex-col min-h-0 h-full  "></div>

        <form onSubmit={onSubmit} className="flex w-full items-end gap-8">
          <div className="flex flex-col flex-1">
            <Input
              label="Ask master"
              className="m-0"
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
            />
          </div>
          <Button type="submit" variant="ghost" className="text-tomato w-fit text-2xl">
            <IoMdSend />
          </Button>
        </form>
      </div>
      <div className={cn("flex flex-col gap-8", !statsOpened && "hidden")}>
        <div className="flex w-full">
          <Button
            variant={"ghost"}
            className="w-fit text-base  gap-2 flex items center text-white uppercase"
            onClick={() => setStatsOpened(false)}
          >
            <AiOutlineLeft /> <span className="mt-[1px]">back to events</span>
          </Button>
        </div>
        <div className="flex flex-col min-h-0 flex-1 gap-8 overflow-auto">
          {roomData.playerState
            .filter((player) => player.accountId !== currentPlayer.accountId)
            .map((player) => (
              <Player key={player.accountId} player={player} />
            ))}
        </div>
      </div>
    </Box>
  );
};

export default General;
