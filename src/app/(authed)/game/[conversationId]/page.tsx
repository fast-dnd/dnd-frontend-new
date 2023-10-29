"use client";

import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import HowToPlay from "@/components/how-to-play";
import MobileNavbar from "@/components/mobile-navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style-utils";

import AnimationEffects from "./components/animation-effects";
import Feedback from "./components/feedback";
import Gameplay from "./components/gameplay";
import General from "./components/general";
import { gameStore } from "./stores/game-store";

const Game = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;
  const [openedGameplay, setOpenedGameplay] = useState(true);

  const pageState = gameStore.pageState.use();

  if (pageState === "FEEDBACK") return <Feedback />;

  if (pageState === "HOWTOPLAY")
    return (
      <div className="flex h-full min-h-0 flex-col gap-5 lg:pb-12">
        <HowToPlay
          onHideHowToPlay={() => gameStore.pageState.set("DEFAULT")}
          hideText={"back to the game"}
        />
      </div>
    );

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 lg:pb-12">
      <AnimationEffects />
      <MobileNavbar />
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

      <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-5 overflow-y-auto py-5 lg:flex-row lg:gap-12 lg:py-0">
        <div
          className={cn("flex h-full flex-1 lg:w-[70%]", !openedGameplay && "hidden", "lg:flex")}
        >
          <Gameplay conversationId={conversationId} />
        </div>
        <div
          className={cn("flex h-full min-h-0 lg:w-[27%]", openedGameplay && "hidden", "lg:flex")}
        >
          <General conversationId={conversationId} />
        </div>
      </div>
    </div>
  );
};

export default Game;
