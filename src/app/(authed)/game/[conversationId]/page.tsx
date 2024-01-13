"use client";

import MobileNavbar from "@/components/navbar/mobile-navbar";
import { cn } from "@/utils/style-utils";

import AnimationEffects from "./components/animation-effects";
import Feedback from "./components/feedback";
import Gameplay from "./components/gameplay";
import General from "./components/general";
import MobileControls from "./components/mobile/mobile-controls";
import MobileStory from "./components/mobile/mobile-story";
import RoundMission from "./components/round-mission";
import { gameStore } from "./stores/game-store";

const Game = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;
  const pageState = gameStore.pageState.use();

  if (pageState === "FEEDBACK") return <Feedback />;

  return (
    <>
      <div className="hidden h-full min-h-0 flex-col gap-5 lg:flex lg:pb-12">
        <AnimationEffects />

        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-row gap-12 overflow-y-auto py-0">
          <div className={cn("flex h-full w-[70%] flex-1")}>
            <Gameplay conversationId={conversationId} />
          </div>
          <div className={cn("flex h-full min-h-0 w-[27%] flex-col gap-4")}>
            <General conversationId={conversationId} />
            <RoundMission conversationId={conversationId} />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:hidden">
        <MobileNavbar className="fixed h-16 items-start" />
        <AnimationEffects />
        <MobileStory conversationId={conversationId} />
        <MobileControls conversationId={conversationId} />
      </div>
    </>
  );
};

export default Game;
