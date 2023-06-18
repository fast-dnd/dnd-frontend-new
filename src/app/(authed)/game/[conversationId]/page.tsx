import React from "react";
import Feedback from "./components/feedback";
import { Box } from "@/components/ui/box";
import Gameplay from "./components/gameplay";

const Game = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;

  // return <Feedback />;
  return (
    <div className="flex flex-row flex-1 min-w-fit min-h-0 h-full gap-12 px-16 pb-12 pt-8">
      <div className="flex flex-1 basis-[70%]">
        <Gameplay conversationId={conversationId} />
      </div>
      <div className="flex flex-1 basis-[30%]">
        <Box title="general" className="h-full"></Box>
      </div>
    </div>
  );
};

export default Game;
