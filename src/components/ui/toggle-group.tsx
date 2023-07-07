import { cn } from "@/utils/style-utils";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import * as React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

export interface ToggleGroupProps {
  state?: "error" | "success";
  successMessage?: string;
  errorMessage?: string;
  label?: string;
}

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & ToggleGroupProps
>(({ state, label, successMessage, errorMessage, className, children, ...props }, ref) => (
  <div className="">
    {label && (
      <div
        className={cn(
          "bg-white/10 backdrop-blur-none text-sm tracking-[0.07em] px-4 py-1 w-fit",
          state === "error" && "text-error",
          state === "success" && "text-success",
        )}
      >
        {label}
      </div>
    )}
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Root>
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
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = ToggleGroupPrimitive.Item;

export { ToggleGroup, ToggleGroupItem };
