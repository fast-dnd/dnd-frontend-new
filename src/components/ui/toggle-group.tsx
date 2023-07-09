import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { AiFillCheckCircle } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

import { cn } from "@/utils/style-utils";

export interface ToggleGroupProps {
  state?: "error" | "success";
  successMessage?: string;
  errorMessage?: string;
  label?: string;
}

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & ToggleGroupProps
>(
  (
    { state, label, successMessage, errorMessage, className, disabled, children, ...props },
    ref,
  ) => (
    <div className="">
      {label && (
        <div
          className={cn(
            "w-fit bg-white/10 px-4 py-1 text-sm tracking-[0.07em] backdrop-blur-none",
            state === "error" && "text-error",
            state === "success" && "text-success",
          )}
        >
          {label}
        </div>
      )}
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center",
          disabled && "pointer-events-none opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Root>
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

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = ToggleGroupPrimitive.Item;

export { ToggleGroup, ToggleGroupItem };
