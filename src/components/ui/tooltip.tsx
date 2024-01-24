import React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/utils/style-utils";

const tooltipArrowVariants = cva(
  "absolute hidden h-5 w-5 rotate-45 border border-l-0 border-white/20 bg-black shadow-sm shadow-white/20 group-hover:inline-block",
  {
    variants: {
      position: {
        top: "bottom-[calc(100%+5px)] left-1/2 -translate-x-1/2",
        bottom: "left-1/2 top-[calc(100%+5px)] -translate-x-1/2",
        left: "right-[calc(100%+5px)] top-1/2 -translate-y-1/2",
        right: "left-[calc(100%+5px)] top-1/2 -translate-y-1/2",
      },
    },
    defaultVariants: {
      position: "top",
    },
  },
);

const tooltipContentVariants = cva(
  "absolute z-50 hidden overflow-hidden whitespace-nowrap rounded border border-white/20 bg-black px-3 py-1.5 text-sm text-white shadow-sm shadow-white/20 backdrop-blur-md transition-all duration-200 group-hover:inline-block",
  {
    variants: {
      position: {
        top: "bottom-[calc(100%+15px)] left-1/2 -translate-x-1/2",
        bottom: "left-1/2 top-[calc(100%+15px)] -translate-x-1/2",
        left: "right-[calc(100%+15px)] top-1/2 -translate-y-1/2",
        right: "left-[calc(100%+15px)] top-1/2 -translate-y-1/2",
      },
    },
    defaultVariants: {
      position: "top",
    },
  },
);

interface ITooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content">,
    VariantProps<typeof tooltipContentVariants> {
  disabled?: boolean;
  content: React.ReactNode;
  contentClassName?: string;
  triggerClassName?: string;
  arrowClassName?: string;
}

export const Tooltip = React.forwardRef<HTMLDivElement, ITooltipProps>(
  (
    {
      disabled,
      position,
      content,
      className,
      contentClassName,
      triggerClassName,
      arrowClassName,
      children,
      ...props
    },
    ref,
  ) => (
    <div className={cn("group relative cursor-pointer", className)} ref={ref} {...props}>
      <div className={cn(triggerClassName)}>{children}</div>
      {!disabled && (
        <>
          <div className={cn(tooltipContentVariants({ position }), contentClassName)}>
            {content}
          </div>
          <span className={cn(tooltipArrowVariants({ position }), arrowClassName)} />
        </>
      )}
    </div>
  ),
);

Tooltip.displayName = "Tooltip";
