import { cva, VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "@/utils/style-utils";
import { AiFillCheckCircle } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

export const textAreaVariants = cva(
  "bg-transparent outline-none placeholder:text-white/30 w-full flex disabled:text-opacity-35 mr-1 overflow-auto",
);

export const textAreaContainerVariants = cva(
  [
    "relative mb-2 flex items-center bg-transparent py-2 pl-4 text-sm md:text-base border border-white/50",
    "focus-within:border-tomato hover:focus-within:border-opacity-100 transition-all duration-300",
  ],
  {
    variants: {
      state: {
        error:
          "border-error border border-opacity-100 hover:border-error hover:border-opacity-100 focus-within:border-error focus-within:border-opacity-100",
        success:
          "border-success border border-opacity-100 hover:border-success hover:border-opacity-100 focus-within:border-success focus-within:border-opacity-100",
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
      <div className="flex flex-col w-full">
        {label && (
          <div
            className={cn(
              "bg-white/10 backdrop-blur-none text-sm tracking-[0.07em] px-4 py-1 w-fit",
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
            disabled && "pointer-events-none bg-opacity-20 text-opacity-20",
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
          <p className="text-sm inline-flex flex-row items-center justify-start gap-2 text-success">
            <AiFillCheckCircle /> {successMessage}
          </p>
        )}
        {errorMessage && (
          <p className="text-sm inline-flex flex-row items-center justify-start gap-2 text-error">
            <GiCancel /> {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

TextArea.displayName = "TextArea";
