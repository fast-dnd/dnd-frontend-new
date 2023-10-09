import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";

import MobileNavbar from "@/components/mobile-navbar";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";

import { gameStore } from "../stores/game-store";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const onSendFeedback = () => {
    // TODO: send feedback to backend
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-8 overflow-x-hidden px-5 pb-8">
      <MobileNavbar
        goBackAction={() => gameStore.displayFeedback.set(false)}
        goBackText="BACK TO THE GAME"
        href=""
      />
      <div
        className="hidden cursor-pointer items-center gap-1 text-lg font-medium uppercase tracking-[0.08em] lg:flex"
        onClick={() => gameStore.displayFeedback.set(false)}
      >
        <AiOutlineLeft className="inline-block" /> BACK TO THE GAME
      </div>
      <div className="w-full lg:w-fit">
        <Box
          title="FEEDBACK"
          className="flex min-h-0 flex-1 flex-row items-start justify-center p-5 tracking-wider lg:px-12 lg:py-8"
        >
          <div className="flex w-full flex-col gap-5 lg:w-[768px] lg:gap-12">
            <p className="w-fit font-semibold uppercase leading-7 tracking-widest lg:text-lg">
              HELP US IMPROVE THE GAME
            </p>
            <ul className="ml-8 list-disc">
              {["Inform a problem", "Suggest something to improve", "Tell us what you liked"].map(
                (item, index) => (
                  <li key={index} className="leading-8 tracking-wider lg:text-lg">
                    {item}
                  </li>
                ),
              )}
            </ul>
            <TextArea
              placeholder="What I think about V3RPG..."
              className="h-24 leading-7 tracking-widest lg:h-56 lg:text-xl"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex justify-end">
              <Button className="w-fit px-8 py-2" onClick={onSendFeedback}>
                SEND
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Feedback;
