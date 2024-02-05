import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import Select, { Props as ReactSelectProps } from "react-select";
import makeAnimated from "react-select/animated";

import { cn } from "@/utils/style-utils";

export interface ComboBoxProps extends ReactSelectProps {
  state?: "error" | "success";
  successMessage?: string;
  errorMessage?: string;
  label?: string;
  animate?: boolean;
}

const animatedComponents = makeAnimated();

const ComboBox = React.forwardRef<HTMLSelectElement, ComboBoxProps>(
  (
    { animate, state, label, successMessage, errorMessage, isDisabled, className, ...props },
    ref,
  ) => {
    return (
      <div className="">
        {label && (
          <div
            className={cn(
              "w-fit pb-2 text-sm tracking-[0.07em]",
              state === "error" && "text-error",
              state === "success" && "text-success",
              isDisabled && "opacity-50",
            )}
          >
            {label}
          </div>
        )}
        <Select
          ref={ref as any}
          components={animate ? animatedComponents : props.components}
          {...props}
        />
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
  },
);

ComboBox.displayName = "ComboBox";

export { ComboBox };
