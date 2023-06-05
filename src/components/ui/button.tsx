import { cn } from "@/utils/style-utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";
import Spinner from "./spinner";

export const buttonVariants = cva(
  "w-full py-2 font-semibold text-xl disabled:bg-opacity-50 disabled:text-opacity-50 disabled:pointer-events-none text-center inline-flex items-center justify-center transition-all duration-300",
  {
    variants: {
      variant: {
        primary: "bg-tomato text-black hover:shadow-basic",
        outline:
          "bg-transparent text-white border border-tomato hover:bg-tomato hover:text-black",
        ghost: "bg-transparent text-white",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, disabled, href, isLoading, children, variant, ...props },
    ref
  ) => {
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
  }
);

Button.displayName = "Button";
