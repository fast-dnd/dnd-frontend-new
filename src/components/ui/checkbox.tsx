"use client";

import { cn } from "@/utils/style-utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

export const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border-2 border-white/40 ring-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-transparent data-[state=checked]:text-white data-[state=checked]:border-white transition-all duration-300",
);

export const checkboxContainerVariants = cva(
  "relative flex items-center gap-2 py-4 px-5 text-base bg-white/5 transition-all duration-300",
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

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof checkboxVariants>,
    VariantProps<typeof checkboxContainerVariants> {
  successMessage?: string;
  errorMessage?: string;
  label?: string;
  boxClassName?: string;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & CheckboxProps
>(
  (
    { successMessage, errorMessage, label, state, disabled, boxClassName, className, ...props },
    ref,
  ) => (
    <div className="flex flex-col gap-1">
      <div
        className={cn(
          checkboxContainerVariants({ state, className }),
          disabled && "pointer-events-none bg-opacity-20 text-opacity-20",
        )}
      >
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(checkboxVariants(), boxClassName)}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            className={cn("flex items-center justify-center text-white")}
          >
            <FaCheck />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <p
          className={cn(
            "font-semibold text-base uppercase tracking-widest md:tracking-normal",
            state === "error" && "text-error",
            state === "success" && "text-success",
          )}
        >
          {label}
        </p>
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
  ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
