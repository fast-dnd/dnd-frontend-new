import { cn } from "@/utils/style-utils";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import Select, { Props as ReactSelectProps } from "react-select";
import makeAnimated from "react-select/animated";

export interface ComboBoxProps extends ReactSelectProps {
  state?: "error" | "success";
  successMessage?: string;
  errorMessage?: string;
  label?: string;
  animate?: boolean;
}

const animatedComponents = makeAnimated();

const ComboBox = React.forwardRef<HTMLSelectElement, ComboBoxProps>(
  ({ animate, state, label, successMessage, errorMessage, className, ...props }, ref) => {
    return (
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
        <Select
          ref={ref as any}
          components={animate ? animatedComponents : props.components}
          {...props}
        />
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
    );
  },
);

ComboBox.displayName = "ComboBox";

export { ComboBox };
