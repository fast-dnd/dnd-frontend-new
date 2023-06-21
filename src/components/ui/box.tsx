import { cn } from "@/utils/style-utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import Spinner from "./spinner";
import { jibril } from "@/utils/fonts";
import {
  AiOutlineExclamation,
  AiOutlineExclamationCircle,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { Button } from "./button";
import { Tooltip, TooltipArrow, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export const boxVariants = cva("bg-glass backdrop-blur-2xl");

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  title: string;
  howTo?: boolean;
  onClickHowTo?: () => void;
  feedback?: boolean;
  onClickFeedback?: () => void;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      className,
      children,
      title,
      howTo = false,
      onClickHowTo,
      feedback = false,
      onClickFeedback,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex flex-col w-full">
        <div className="py-6 border-t-2 relative border-tomato/90 bg-black flex items-center justify-center gap-4">
          <div className="bg-tomato w-2 h-2 rotate-45" />
          <p className="text-xl leading-7 tracking-[0.2em]" style={jibril.style}>
            {title}
          </p>
          <div className="bg-tomato w-2 h-2 rotate-45" />
          <div className="flex gap-4 h-full absolute right-12 items-center">
            {howTo && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    onClick={onClickHowTo}
                    className="text-xl text-white/50 hover:text-white"
                  >
                    <AiOutlineQuestionCircle />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>How to play</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {feedback && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    onClick={onClickFeedback}
                    className="text-xl text-white/50 hover:text-white"
                  >
                    <AiOutlineExclamationCircle />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Feedback</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <div className={cn(boxVariants({ className }))} ref={ref} {...props}>
          {children}
        </div>
      </div>
    );
  },
);

Box.displayName = "Box";
