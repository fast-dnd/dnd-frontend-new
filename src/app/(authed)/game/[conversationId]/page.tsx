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
import { useGameStore } from "./stores/game-store";

const Game = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;
  const [openedGameplay, setOpenedGameplay] = useState(true);

  const {
    displayHowToPlay,
    setDisplayHowToPlay,
    displayFeedback,
    setDisplayFeedback,
    setHomeModal,
    changes,
  } = useGameStore((state) => state);

  if (displayFeedback) return <Feedback onHideFeedback={() => setDisplayFeedback(false)} />;

  if (displayHowToPlay)
    return (
      <HowToPlay onHideHowToPlay={() => setDisplayHowToPlay(false)} hideText={"back to the game"} />
    );
  return (
    <div className="flex h-full min-h-0 flex-col gap-5 py-8 lg:pb-12">
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 h-full min-h-0 w-full overflow-hidden",
        )}
      >
        <div
          className={cn(
            "absolute left-[-5%] h-full w-full bg-gradient-to-r from-red-500 to-5% transition-all duration-500",
            changes.lostHealth && "left-0",
          )}
        />
        <div
          className={cn(
            "absolute left-[-5%] h-full w-full bg-gradient-to-r from-green-500 to-5% transition-all duration-500",
            changes.gainedHealth && "left-0 ",
          )}
        />
        <div
          className={cn(
            "absolute right-[-5%] h-full w-full bg-gradient-to-l from-red-500 to-5% transition-all duration-500",
            changes.lostHealth && "right-0",
          )}
        />
        <div
          className={cn(
            "absolute right-[-5%] h-full w-full bg-gradient-to-l from-green-500 to-5% transition-all duration-500",
            changes.gainedHealth && "right-0",
          )}
        />
        <div
          className={cn(
            "absolute bottom-[-5%] h-full w-full bg-gradient-to-t from-red-500 to-5% transition-all duration-500",
            changes.lostHealth && "bottom-0",
          )}
        />
        <div
          className={cn(
            "absolute bottom-[-5%] h-full w-full bg-gradient-to-t from-green-500 to-5% transition-all duration-500",
            changes.gainedHealth && "bottom-0",
          )}
        />
        <div
          className={cn(
            "absolute top-[-5%] h-full w-full bg-gradient-to-b from-red-500 to-5% transition-all duration-500",
            changes.lostHealth && "top-0",
          )}
        />
        <div
          className={cn(
            "absolute top-[-5%] h-full w-full bg-gradient-to-b from-green-500 to-5% transition-all duration-500",
            changes.gainedHealth && "top-0",
          )}
        />
      </div>
      <MobileNavbar
        goBackAction={() => setHomeModal(true)}
        goBackText="HOME"
        href=""
        howTo
        onClickHowTo={() => setDisplayHowToPlay(true)}
        feedback
        onClickFeedback={() => setDisplayFeedback(true)}
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
