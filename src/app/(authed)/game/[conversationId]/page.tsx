"use client";

import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { cn } from "@/utils/style-utils";
import { Button } from "@/components/ui/button";
import HowToPlay from "@/components/how-to-play";
import MobileNavbar from "@/components/mobile-navbar";

import Feedback from "./components/feedback";
import Gameplay from "./components/gameplay";
import General from "./components/general";
import { gameStore } from "./stores/game-store";

const Game = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;
  const [openedGameplay, setOpenedGameplay] = useState(true);

  const { displayHowToPlay, displayFeedback, changes } = gameStore.use();

  if (displayFeedback)
    return <Feedback onHideFeedback={() => gameStore.displayFeedback.set(false)} />;

  if (displayHowToPlay)
    return (
      <HowToPlay
        onHideHowToPlay={() => gameStore.displayHowToPlay.set(false)}
        hideText={"back to the game"}
      />
    );
  return (
    <div className="flex h-full min-h-0 flex-col gap-5 py-8 lg:pb-12">
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 h-full min-h-0 w-full overflow-hidden",
        )}
      >
        {["bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-t", "bg-gradient-to-b"].map(
          (dir) => (
            <React.Fragment key={dir}>
              <div
                className={cn(
                  "absolute h-full w-full from-red-500 to-5% opacity-0 transition-all duration-500",
                  dir,
                  changes.lostHealth && "opacity-100",
                )}
              />
              <div
                className={cn(
                  "absolute h-full w-full from-green-500 to-5% opacity-0 transition-all duration-500",
                  dir,
                  changes.gainedHealth && "opacity-100",
                )}
              />
            </React.Fragment>
          ),
        )}
      </div>
      <MobileNavbar
        goBackAction={() => gameStore.homeModal.set(true)}
        goBackText="HOME"
        href=""
        howTo
        onClickHowTo={() => gameStore.displayHowToPlay.set(true)}
        feedback
        onClickFeedback={() => gameStore.displayFeedback.set(true)}
      />
      <div className="px-5 lg:hidden">
        <Button
          variant="outline"
          className=" border-white normal-case hover:bg-transparent hover:text-white active:bg-transparent "
          onClick={() => setOpenedGameplay(!openedGameplay)}
        >
          {openedGameplay && (
            <div className="flex items-center gap-2">
              Master & team <AiOutlineRight />
            </div>
          )}
          {!openedGameplay && (
            <div className="flex items-center gap-2">
              <AiOutlineLeft /> Back to story
            </div>
          )}
        </Button>
      </div>

      <div className="flex h-full min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 lg:min-w-fit lg:flex-row lg:gap-12 lg:px-16 lg:py-0">
        <div className={cn("flex flex-1 lg:basis-[70%]", !openedGameplay && "hidden", "lg:flex")}>
          <Gameplay conversationId={conversationId} />
        </div>
        <div
          className={cn(
            "flex h-full min-h-0 lg:basis-[30%]",
            openedGameplay && "hidden",
            "lg:flex",
          )}
        >
          <General conversationId={conversationId} />
        </div>
      </div>
    </div>
  );
};

export default Game;
