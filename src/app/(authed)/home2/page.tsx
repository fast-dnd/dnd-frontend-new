"use client";

import { Box } from "@/components/ui/box";

import CreateRoom from "./components/create-room";
import Tabs from "./components/create-room/tabs";
import GameHistory from "./components/game-history";
import JoinRoom from "./components/join-room";

const Page = () => {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col gap-12 overflow-y-auto px-5 lg:min-w-fit lg:flex-row lg:px-0">
      <Box title="CREATE ROOM" className="flex max-h-[850px] min-h-0 flex-1 flex-col p-4 lg:p-8">
        <Tabs />
        <CreateRoom />
      </Box>
      <div className="flex h-full flex-1 basis-1/3 flex-col gap-12 lg:min-w-fit">
        <JoinRoom />
        <div className="flex min-h-0 flex-1 overflow-y-auto">
          <Box
            title="GAME HISTORY"
            className="mb-4 flex max-h-[480px] min-h-0 flex-1 flex-col items-start gap-4 p-4 lg:mb-0 lg:gap-8 lg:p-8"
          >
            <GameHistory />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Page;
