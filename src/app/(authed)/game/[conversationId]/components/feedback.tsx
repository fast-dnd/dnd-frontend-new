"use client";

import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { TextArea } from "@/components/ui/text-area";

interface IFeedbackProps {
  onHideFeedback?: () => void;
}

const Feedback = ({ onHideFeedback }: IFeedbackProps) => {
  const [feedback, setFeedback] = useState("");

  const onSendFeedback = () => {
    // TODO: send feedback to backend
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-center gap-8">
      <div
        className="flex cursor-pointer items-center gap-1 text-lg font-medium uppercase tracking-[0.08em]"
        onClick={onHideFeedback}
      >
        <AiOutlineLeft className="inline-block" /> BACK TO THE GAME
      </div>
      <div className="w-fit">
        <Box
          title="FEEDBACK"
          className="flex min-h-0 flex-1 flex-row items-start justify-center gap-12 px-12 py-8 tracking-wider"
        >
          <div className="flex w-[768px] flex-col">
            <p className="w-fit text-lg font-semibold uppercase leading-7 tracking-widest">
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
            <div className="mt-8 flex justify-end">
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
