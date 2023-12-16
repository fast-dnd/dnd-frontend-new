"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/utils/style-utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    label?: string;
    minText?: string;
    maxText?: string;
    state?: "error" | "success";
  }
>(({ className, label, minText, maxText, state, disabled, ...props }, ref) => (
  <div className="flex flex-col gap-2">
    {label && (
      <div
        className={cn(
          "w-fit text-sm tracking-[0.07em]",
          state === "error" && "text-error",
          state === "success" && "text-success",
          disabled && "opacity-50",
        )}
      >
        {label}
      </div>
    )}
    <SliderPrimitive.Root
      ref={ref}
      className={cn("nozoom slider relative flex touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-white/25 lg:h-2">
        <SliderPrimitive.Range className="absolute h-full bg-white lg:bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block h-3 w-3 rounded-full bg-white ring-offset-white transition-colors focus-visible:bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 lg:h-4 lg:w-4 lg:focus-visible:bg-primary"
        aria-label={props["aria-label"]}
      />
    </SliderPrimitive.Root>
    {(minText || maxText) && (
      <div className="flex justify-between text-sm opacity-50">
        <span>{minText}</span>
        <span>{maxText}</span>
      </div>
    )}
  </div>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
