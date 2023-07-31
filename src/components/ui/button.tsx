import React from "react";
import Link from "next/link";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/utils/style-utils";

import Spinner from "./spinner";

export const buttonVariants = cva(
  "inline-flex w-full flex-row items-center justify-center rounded-md py-2 text-center text-xl font-bold uppercase tracking-wider transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 lg:tracking-normal",
  {
    variants: {
      variant: {
        primary:
          "border border-primary bg-primary text-black hover:shadow-basic focus:ring-2 focus:ring-primary-200 focus:ring-offset-2 active:bg-primary-600 active:shadow-none disabled:border-transparent",
        outline:
          "border-2 border-primary bg-transparent text-white hover:bg-primary focus:ring-2 focus:ring-primary-200 focus:ring-offset-2 active:border-primary-600 active:bg-transparent active:shadow-basic",
        ghost:
          "border border-transparent bg-transparent font-normal tracking-[0.08em] text-white/50 hover:text-white active:text-white/75",
      },
      size: {
        xs: "px-6 py-2 text-xs",
        sm: "px-6 py-2 text-sm",
        base: "px-6 py-3",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
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
        <Link href={href} className={cn(buttonVariants({ variant, className }))}>
          {children}
        </Link>
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
