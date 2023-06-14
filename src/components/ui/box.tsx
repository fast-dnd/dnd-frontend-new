import { cn } from "@/utils/style-utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import Spinner from "./spinner";
import { jibril } from "@/utils/fonts";

export const boxVariants = cva("bg-glass backdrop-blur-2xl");

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  title: string;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, children, title, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full">
        <div className="py-6 border-t-2 border-tomato/90 bg-black flex items-center justify-center gap-4">
          <div className="bg-tomato w-2 h-2 rotate-45" />
          <p className="text-xl leading-7 tracking-[0.2em]" style={jibril.style}>
            {title}
          </p>
          <div className="bg-tomato w-2 h-2 rotate-45" />
        </div>
        <div className={cn(boxVariants({ className }))} ref={ref} {...props}>
          {children}
        </div>
      </div>
    );
  },
);

Box.displayName = "Box";
