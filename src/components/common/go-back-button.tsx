"use client";

import React, { MouseEventHandler } from "react";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";

import { cn } from "@/utils/style-utils";

import { useSoundSystem } from "./music-settings-modal/sound-system";

interface IGoBackButtonProps {
  onClick?: () => void;
  className?: string;
  text?: string;
  href?: string;
}

const GoBackButton = ({ onClick, className, text, href }: IGoBackButtonProps) => {
  const Comp = href ? Link : "div";
  const { soundEnabled, soundVolume } = useSoundSystem();

  const composedClickHandler: MouseEventHandler<HTMLAnchorElement | HTMLDivElement> = (e) => {
    if (soundEnabled) {
      const audio = new Audio("/sounds/click.wav");
      audio.volume = soundVolume / 100;
      audio.play().catch(console.error);
    }
    if (onClick) onClick();
  };
  return (
    <Comp
      className={cn(
        "flex w-fit cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dark-500 bg-dark-800 px-3 py-2 text-xs text-white transition-all duration-200 hover:opacity-80",
        className,
      )}
      onClick={composedClickHandler}
      href={href ?? ""}
    >
      <AiOutlineLeft />
      <span>{text ?? "BACK"}</span>
    </Comp>
  );
};

export default GoBackButton;
