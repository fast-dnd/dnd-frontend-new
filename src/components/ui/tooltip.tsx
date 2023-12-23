import React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/utils/style-utils";

const tooltipArrowVariants = cva("absolute hidden border-[6px] group-hover:inline-block", {
  variants: {
    position: {
      top: "bottom-full left-1/2 -translate-x-1/2 border-b-0 border-x-transparent border-t-black",
      bottom: "left-1/2 top-full -translate-x-1/2 border-t-0 border-x-transparent border-b-black",
      left: "right-full top-1/2 -translate-y-1/2 border-r-0 border-y-transparent border-l-black",
      right: "left-full top-1/2 -translate-y-1/2 border-l-0 border-b-transparent border-r-black",
    },
  },
  defaultVariants: {
    position: "top",
  },
});

const tooltipContentVariants = cva(
  "absolute z-50 hidden overflow-hidden whitespace-nowrap rounded bg-black px-3 py-1.5 text-sm text-white shadow-sm shadow-white/20 transition-all duration-200 group-hover:inline-block",
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
