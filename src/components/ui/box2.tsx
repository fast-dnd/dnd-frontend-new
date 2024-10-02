import React from "react";
import { cva, VariantProps } from "class-variance-authority";

import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

export const boxVariants = cva("rounded-b-md bg-glass backdrop-blur-xl");

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof boxVariants> {
  title: string;
  wrapperClassName?: string;
  titleClassName?: string;
}

export const Box2 = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ wrapperClassName, titleClassName, className, children, title, ...props }, ref) => {
    return (
      <div
        className={cn("glass-effect-2", "flex w-full flex-col", wrapperClassName)}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'  viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%23000000' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%230e0344' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%231c0f51' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%232a1a5d' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%2337256a' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23443077' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "cover",
          // backgroundAttachment: "fixed",
        }}
      >
        <div
          className={cn(
            "relative flex items-center justify-center gap-4 rounded-t-md bg-dark-800 px-4 py-6",
            titleClassName,
          )}
        >
          <div className="size-2 rotate-45 bg-primary" />
          <p
            className="mt-1 max-w-[90%] truncate leading-none tracking-widest lg:text-xl lg:leading-7 lg:tracking-[0.2em]"
            style={jibril.style}
          >
            {title}
          </p>
          <div className="size-2 rotate-45 bg-primary" />
        </div>
        <div className={cn(boxVariants({ className }))} ref={ref} {...props}>
          {children}
        </div>
      </div>
    );
  },
);

Box2.displayName = "Box2";
