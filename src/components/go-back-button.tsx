import React from "react";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";

import { cn } from "@/utils/style-utils";

const GoBackButton = ({
  onClick,
  className,
  text,
  href,
}: {
  href?: string;
  onClick?: () => void;
  className?: string;
  text?: string;
}) => {
  const Comp = href ? Link : "div";

  return (
    <Comp
      className={cn(
        "flex w-fit cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dark-500 bg-dark-800 px-3 py-2 text-xs text-white",
        className,
      )}
      onClick={onClick}
      href={href ?? ""}
    >
      <AiOutlineLeft />
      <span>{text ?? "BACK"}</span>
    </Comp>
  );
};

export default GoBackButton;
