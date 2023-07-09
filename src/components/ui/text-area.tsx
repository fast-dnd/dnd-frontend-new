import React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { AiFillCheckCircle } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

import { cn } from "@/utils/style-utils";

export const textAreaVariants = cva(
  "disabled:text-opacity-35 mr-1 flex w-full overflow-auto bg-transparent outline-none placeholder:text-white/30",
);

export const textAreaContainerVariants = cva(
  [
    "relative mb-2 flex items-center border border-white/50 bg-transparent py-2 pl-4 text-sm lg:text-base",
    "transition-all duration-300 focus-within:border-tomato/100",
  ],
  {
    variants: {
      state: {
        error: "border border-error/100 focus-within:border-error/100 hover:border-error/100",
        success:
          "border border-success border-opacity-100 focus-within:border-success/100 hover:border-success/100",
      },
    },
  },
);

export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textAreaVariants>,
    VariantProps<typeof textAreaContainerVariants> {
  StartIcon?: (iconProps: React.SVGProps<SVGSVGElement>) => JSX.Element;
  startIconProps?: React.SVGProps<SVGSVGElement>;
  EndIcon?: (iconProps: React.SVGProps<SVGSVGElement>) => JSX.Element;
  endIconProps?: React.SVGProps<SVGSVGElement>;
  successMessage?: string;
  errorMessage?: string;
  label?: string;
  canResize?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      state,
      StartIcon,
      startIconProps,
      EndIcon,
      endIconProps,
      successMessage,
      errorMessage,
      label,
      canResize,
      disabled,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="flex w-full flex-col">
        {label && (
          <div
            className={cn(
              "w-fit bg-white/10 px-4 py-1 text-sm tracking-[0.07em] backdrop-blur-none",
              state === "error" && "text-error",
              state === "success" && "text-success",
            )}
          >
            {label}
          </div>
        )}
        <div
          className={cn(
            textAreaContainerVariants({ state, className }),
            disabled && "bg-current/20 text-current/20 pointer-events-none",
          )}
        >
          {StartIcon && (
            <div className="mr-2 flex justify-center">
              <StartIcon {...startIconProps} />
            </div>
          )}
          <textarea
            className={cn("h-full", !canResize && "resize-none", textAreaVariants())}
            ref={ref}
            {...props}
          />
          {EndIcon && (
            <div className="mr-4 flex justify-center">
              <EndIcon {...endIconProps} />
            </div>
          )}
        </div>
        {successMessage && (
          <p className="inline-flex flex-row items-center justify-start gap-2 text-sm text-success">
            <AiFillCheckCircle /> {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="inline-flex flex-row items-center justify-start gap-2 text-sm text-error">
            <GiCancel /> {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
