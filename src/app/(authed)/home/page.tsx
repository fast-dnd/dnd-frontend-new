"use client";

import { useState } from "react";

import GameHistory from "@/components/game-history";
import MobileNavbar from "@/components/mobile-navbar";
import { Box } from "@/components/ui/box";

import CreateRoom from "./components/desktop/create-room";
import JoinRoom from "./components/desktop/join-room";
import MobileCreateRoom from "./components/mobile/mobile-create-room";

const Page = () => {
  const [adventureDetailId, setAdventureDetailId] = useState<string>();
  const [closingId, setClosingId] = useState<string>();

  const onClickBack = adventureDetailId
    ? () => {
        setClosingId(adventureDetailId);
        setAdventureDetailId(undefined);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setTimeout(() => setClosingId(undefined), 500);
      }
    : undefined;

  return (
    <>
      <div className="hidden min-h-0 flex-1 flex-col gap-12 overflow-y-auto px-5 pb-12 lg:flex lg:flex-row lg:px-0">
        <CreateRoom />
        <div className="flex h-full w-1/4 flex-1 flex-col gap-12">
          <JoinRoom />
          <div className="flex min-h-0 flex-1 overflow-y-auto">
            <Box
              title="GAME HISTORY"
              wrapperClassName="w-full"
              className="mb-4 flex min-h-0 flex-1 lg:mb-0 lg:gap-8 lg:p-8"
            >
              <GameHistory />
            </Box>
          </div>
        </div>
      </div>
      <div className="relative flex flex-col lg:hidden">
        <MobileNavbar className="fixed z-30 h-16 items-start" onClickBack={onClickBack} />
        <MobileCreateRoom
          adventureDetailId={adventureDetailId}
          setAdventureDetailId={setAdventureDetailId}
          closingId={closingId}
        />
      </div>
    </>
  );
};

export default Page;
