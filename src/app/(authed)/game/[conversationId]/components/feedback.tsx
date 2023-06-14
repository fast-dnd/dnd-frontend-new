"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";
import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const onSendFeedback = () => {
    // TODO: send feedback to backend
  };

  return (
    <div className="flex gap-8 flex-col items-center justify-center mt-8">
      <div
        className="cursor-pointer flex gap-1 items-center text-lg font-medium tracking-[0.08em] uppercase"
        //TODO: onClick={() => ()}  hide
      >
        <AiOutlineLeft className="inline-block" /> BACK TO THE GAME
      </div>
      <div className="w-fit">
        <Box
          title="FEEDBACK"
          className="tracking-wider flex flex-row gap-12 items-start justify-center min-h-0 flex-1 px-12 py-8"
        >
          <div className="w-[768px] flex flex-col">
            <p className="tracking-widest leading-7 font-semibold text-lg uppercase w-fit">
              HELP US IMPROVE THE GAME
            </p>
            <ul className="ml-4 mt-8 list-disc">
              {["Inform a problem", "Suggest something to improve", "Tell us what you liked"].map(
                (item, index) => (
                  <li key={index} className="text-lg leading-8 tracking-wider">
                    {item}
                  </li>
                ),
              )}
            </ul>
            <TextArea
              placeholder="What I think about V3RPG..."
              className="mt-8 h-56 text-xl leading-7 tracking-widest"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex justify-end mt-8">
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
