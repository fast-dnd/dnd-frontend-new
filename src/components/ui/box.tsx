import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { AiOutlineExclamationCircle, AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";

import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import Spinner from "./spinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

export const boxVariants = cva("rounded-b-md bg-glass backdrop-blur-2xl");

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  title: string;
  howTo?: boolean;
  onClickHowTo?: () => void;
  feedback?: boolean;
  onClickFeedback?: () => void;
  home?: boolean;
  onClickHome?: () => void;
  loading?: boolean;
  wrapperClassName?: string;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      wrapperClassName,
      className,
      children,
      title,
      howTo = false,
      onClickHowTo,
      feedback = false,
      onClickFeedback,
      home = false,
      onClickHome,
      loading = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn("flex w-full flex-col", wrapperClassName)}>
        <div className="relative flex items-center justify-center gap-4 rounded-t-md bg-black px-4 py-6">
          <div className="h-2 w-2 rotate-45 bg-primary" />
          <p
            className="mt-1 truncate leading-none tracking-widest lg:text-xl lg:leading-7 lg:tracking-[0.2em]"
            style={jibril.style}
          >
            {title}
          </p>
          <div className="h-2 w-2 rotate-45 bg-primary" />
          <div className="absolute left-12 hidden h-full items-center gap-4 lg:flex">
            {home && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    onClick={onClickHome}
                    className="text-xl text-white/50 hover:text-white"
                  >
                    <AiOutlineHome />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="mt-2">
                    <p>Go home</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="absolute right-12 hidden h-full items-center gap-4 lg:flex">
            {loading && <Spinner className="m-0 opacity-50" />}
            {howTo && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger
                    onClick={onClickHowTo}
                    className="text-xl text-white/50 hover:text-white"
                  >
                    <AiOutlineQuestionCircle />
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="mt-2">
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
                  <TooltipContent side="bottom" className="mt-2">
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
