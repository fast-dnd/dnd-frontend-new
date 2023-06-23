"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/utils/style-utils";
import { FiChevronDown } from "react-icons/fi";
import { VariantProps, cva } from "class-variance-authority";
import { AiFillCheckCircle } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";

export const selectContainerVariants = cva(
  [
    "relative mb-2 flex items-center bg-transparent py-2 pl-4 text-base border border-white/50 placeholder:text-white/30 pr-2 justify-between",
    "focus:outline-none transition-all duration-300",
    "disabled:pointer-events-none disabled:bg-opacity-20 disabled:text-opacity-20",
    "ring-offset-selectSelected focus:ring-2 focus:ring-selectSelected focus:ring-offset-2",
  ],
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

export interface SelectProps extends VariantProps<typeof selectContainerVariants> {
  StartIcon?: (iconProps: React.SVGProps<SVGSVGElement>) => JSX.Element;
  startIconProps?: React.SVGProps<SVGSVGElement>;
  EndIcon?: (iconProps: React.SVGProps<SVGSVGElement>) => JSX.Element;
  endIconProps?: React.SVGProps<SVGSVGElement>;
  successMessage?: string;
  errorMessage?: string;
  label?: string;
}

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & SelectProps
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
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(selectContainerVariants({ state, className }), "")}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <FiChevronDown className="" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
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
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden border bg-select text-white shadow-md animate-in fade-in-80 duration-300",
        position === "popper" && "translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center py-1.5 pl-8 pr-2 text-sm outline-none bg-select focus:bg-selectHover data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <div className="bg-tomato w-2 h-2 rotate-45" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-selectSelected", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
