import React from "react";
import { cn } from "@/utils/style-utils";
import { cva, VariantProps } from "class-variance-authority";

import Spinner from "./spinner";

export const buttonVariants = cva(
  "disabled:border-current/50 disabled:bg-current/50 disabled:text-current/50 inline-flex w-full flex-row items-center justify-center py-2 text-center text-xl font-semibold uppercase tracking-wider transition-all duration-300 disabled:pointer-events-none lg:tracking-normal",
  {
    variants: {
      variant: {
        primary:
          "border border-tomato bg-tomato text-black hover:shadow-basic active:bg-tomato/90 active:shadow-none disabled:border-transparent",
        outline:
          "border border-tomato bg-transparent text-white hover:bg-tomato hover:text-black active:bg-tomato/90",
        ghost:
          "border border-transparent bg-transparent font-normal tracking-[0.08em] text-white/50 hover:text-white active:text-white/75",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, href, isLoading, children, variant, ...props }, ref) => {
    if (href) {
      return (
        <a href={href} className={cn(buttonVariants({ variant, className }))}>
          {children}
        </a>
      );
    } else
      return (
        <button
          disabled={isLoading || disabled}
          className={cn(buttonVariants({ variant, className }))}
          ref={ref}
          {...props}
        >
          {isLoading && <Spinner />}
          {children}
        </button>
      );
  },
);

Button.displayName = "Button";
