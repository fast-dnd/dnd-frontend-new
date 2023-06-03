import { cn } from "@/utils/style-utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import Spinner from "./spinner";
import { jibril } from "@/utils/fonts";

export const boxVariants = cva(
  "w-full py-2 font-semibold text-xl disabled:bg-opacity-50 disabled:text-opacity-50 disabled:pointer-events-none text-center inline-flex items-center justify-center transition-all duration-300",
  {
    variants: {
      variant: {
        primary: "bg-tomato text-black hover:shadow-tomato/40 hover:shadow-lg",
        outline: "bg-transparent text-white border border-tomato hover:bg-tomato hover:text-black",
        ghost: "bg-transparent text-white",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof boxVariants> {
  title: string;
}

export const Box = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ className, children, title, variant, ...props }, ref) => {
    return (
      <div className={cn("bg-glass backdrop-blur-2xl", className)}>
        <div className="py-6 border-t-2 border-tomato/90 bg-black flex items-center justify-center gap-4">
          <div className="bg-tomato w-2 h-2 rotate-45" />
          <p className="text-xl" style={jibril.style}>
            {title}
          </p>
          <div className="bg-tomato w-2 h-2 rotate-45" />
        </div>
        {children}
      </div>
    );
  }
);

Box.displayName = "Box";
