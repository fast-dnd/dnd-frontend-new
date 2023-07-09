import React from "react";
import { cn } from "@/utils/style-utils";
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
              "w-fit bg-white/10 px-4 py-1 text-sm tracking-[0.07em] backdrop-blur-none",
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
