"use client";

import * as React from "react";
import { cn } from "@/utils/style-utils";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cva, VariantProps } from "class-variance-authority";
import { AiFillCheckCircle } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";

export const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border-2 border-white/40 ring-gray-600 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-white data-[state=checked]:bg-transparent data-[state=checked]:text-white",
);

export const checkboxContainerVariants = cva(
  "relative flex items-center gap-2 bg-white/5 px-5 py-4 text-base transition-all duration-300",
  {
    variants: {
      state: {
        error:
          "border border-error border-opacity-100 focus-within:border-error focus-within:border-opacity-100 hover:border-error hover:border-opacity-100",
        success:
          "border border-success border-opacity-100 focus-within:border-success focus-within:border-opacity-100 hover:border-success hover:border-opacity-100",
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
          disabled && "bg-current/20 text-current/20 pointer-events-none",
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
            "text-base font-semibold uppercase tracking-widest lg:tracking-normal",
            state === "error" && "text-error",
            state === "success" && "text-success",
          )}
        >
          {label}
        </p>
      </div>
      {successMessage && (
        <p className="inline-flex flex-row items-center justify-start gap-2 text-sm text-success">
          <AiFillCheckCircle /> {successMessage}
        </p>
      )}
      {errorMessage && (
        <p className="inline-flex flex-row items-center justify-start gap-2 text-sm text-error">
          <GiCancel /> {errorMessage}
        </p>
      )}
    </div>
  ),
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
