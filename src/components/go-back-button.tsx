import React from "react";
import { AiOutlineLeft } from "react-icons/ai";

import { cn } from "@/utils/style-utils";

const GoBackButton = ({ onClick, className }: { onClick: () => void; className?: string }) => {
  return (
    <div
      className={cn(
        "mb-8 flex w-fit cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dark-500 bg-dark-800 px-3 py-2 text-white",
        className,
      )}
      onClick={onClick}
    >
      <AiOutlineLeft />
      <span>BACK</span>
    </div>
  );
};

export default GoBackButton;
