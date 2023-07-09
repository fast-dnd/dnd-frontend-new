import { cn } from "@/utils/style-utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import Spinner from "./spinner";

export const buttonVariants = cva(
  "flex-row w-full uppercase py-2 font-semibold text-xl disabled:border-opacity-50 disabled:bg-opacity-50 disabled:text-opacity-50 disabled:pointer-events-none text-center inline-flex items-center justify-center transition-all duration-300 tracking-wider lg:tracking-normal",
  {
    variants: {
      variant: {
        primary:
          "bg-tomato border border-tomato text-black disabled:border-transparent hover:shadow-basic active:shadow-none active:bg-tomato/90",
        outline:
          "bg-transparent text-white border border-tomato hover:bg-tomato hover:text-black active:bg-tomato/90",
        ghost:
          "bg-transparent border border-transparent text-white/50 hover:text-white font-normal tracking-[0.08em] active:text-white/75",
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
