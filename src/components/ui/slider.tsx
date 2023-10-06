"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/utils/style-utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    label?: string;
    state?: "error" | "success";
  }
>(({ className, label, state, disabled, ...props }, ref) => (
  <div>
    {label && (
      <div
        className={cn(
          "w-fit pb-2 text-sm tracking-[0.07em] backdrop-blur-none",
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
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-white/25">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full bg-white ring-offset-white transition-colors focus-visible:bg-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  </div>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
