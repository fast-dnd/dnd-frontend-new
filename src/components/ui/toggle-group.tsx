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
  labelClassName?: string;
}

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & ToggleGroupProps
>(
  (
    {
      state,
      label,
      labelClassName,
      successMessage,
      errorMessage,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => (
    <div>
      {label && (
        <div
          className={cn(
            "w-fit pb-2 text-sm tracking-[0.07em] backdrop-blur-none",
            state === "error" && "text-error",
            state === "success" && "text-success",
            disabled && "opacity-50",
            labelClassName,
          )}
        >
          {label}
        </div>
      )}
      <ToggleGroupPrimitive.Root
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2",
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

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        "flex w-full items-center justify-center gap-2 rounded-md border border-white/25 px-6 py-2 text-sm transition-all duration-300 data-[state=on]:border-primary lg:px-10 lg:text-base",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
