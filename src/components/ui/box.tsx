import { cn } from "@/utils/style-utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import { jibril } from "@/utils/fonts";
import { AiOutlineExclamationCircle, AiOutlineHome, AiOutlineQuestionCircle } from "react-icons/ai";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import Spinner from "./spinner";

export const boxVariants = cva("bg-glass backdrop-blur-2xl");

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
      <div className={cn("flex flex-col w-full", wrapperClassName)}>
        <div className="py-6 border-t-2 relative border-tomato/90 bg-black flex items-center justify-center gap-4">
          <div className="bg-tomato w-2 h-2 rotate-45" />
          <p
            className="mt-1 text-lg leading-none tracking-widest md:text-xl md:leading-7 md:tracking-[0.2em]"
            style={jibril.style}
          >
            {title}
          </p>
          <div className="bg-tomato w-2 h-2 rotate-45" />
          <div className="flex gap-4 h-full absolute left-12 items-center">
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
          <div className="flex gap-4 h-full absolute right-12 items-center">
            {loading && <Spinner className="opacity-50 m-0" />}
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
