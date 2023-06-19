import React from "react";
import Feedback from "./components/feedback";
import Gameplay from "./components/gameplay";
import General from "./components/general";

const Game = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;

  // return <Feedback />;
  return (
    <div className="flex flex-row flex-1 min-w-fit min-h-0 h-full gap-12 px-16 pb-12 pt-8">
      <div className="flex flex-1 basis-[70%]">
        <Gameplay conversationId={conversationId} />
      </div>
      <div className="flex min-h-0 h-full basis-[30%]">
        <General conversationId={conversationId} />
      </div>
    </div>
  );
};

export default Game;
