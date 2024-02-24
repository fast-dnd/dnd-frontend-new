import React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

export const boxVariants = cva("rounded-b-md bg-glass backdrop-blur-2xl");

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  title: string;
  wrapperClassName?: string;
  titleClassName?: string;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ wrapperClassName, titleClassName, className, children, title, ...props }, ref) => {
    return (
      <div className={cn("flex w-full flex-col", wrapperClassName)}>
        <div
          className={cn(
            "relative flex items-center justify-center gap-4 rounded-t-md bg-dark-900 px-4 py-6",
            titleClassName,
          )}
        >
          <div className="size-2 rotate-45 bg-primary" />
          <p
            className="mt-1 max-w-[90%] truncate leading-none tracking-widest lg:text-xl lg:leading-7 lg:tracking-[0.2em]"
            style={jibril.style}
          >
            {title}
          </p>
          <div className="size-2 rotate-45 bg-primary" />
        </div>
        <div className={cn(boxVariants({ className }))} ref={ref} {...props}>
          {children}
        </div>
      </div>
    );
  },
);

Box.displayName = "Box";
