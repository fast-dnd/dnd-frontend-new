"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AiFillCheckCircle } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

import { cn } from "@/utils/style-utils";

export const selectContainerVariants = cva(
  [
    "relative mb-2 flex items-center justify-between rounded-md border border-white/50 bg-transparent py-2 pl-4 pr-2 text-base placeholder:text-white/30",
    "transition-all duration-300 focus:outline-none",
    "disabled:pointer-events-none disabled:opacity-20",
    "ring-offset-primary-200 focus:ring-2 focus:ring-primary-200 focus:ring-offset-2",
  ],
  {
    variants: {
      state: {
        error: "border border-error/100 focus-within:border-error/100 hover:border-error/100",
        success:
          "border border-success/100 focus-within:border-success/100 hover:border-success/100",
      },
    },
  },
);

export interface SelectProps extends VariantProps<typeof selectContainerVariants> {
  label?: string;
  successMessage?: string;
  errorMessage?: string;
  options: { value: string; label: React.ReactNode }[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Select({
  state,
  label,
  successMessage,
  errorMessage,
  options,
  value,
  onChange,
  disabled,
  className,
}: SelectProps) {
  return (
    <div className="relative">
      {label && (
        <div
          className={cn(
            "w-fit pb-2 text-sm tracking-[0.07em]",
            state === "error" && "text-error",
            state === "success" && "text-success",
            disabled && "opacity-50",
          )}
        >
          {label}
        </div>
      )}
      <div className={cn(selectContainerVariants({ state, className }))}>
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          className="w-full bg-transparent outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-select text-white">
              {typeof option.label === "string" ? option.label : option.value}
            </option>
          ))}
        </select>
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
  );
}
