"use client";

import React from "react";
import Link from "next/link";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/utils/style-utils";

import { useSoundSystem } from "../common/music-settings-modal/sound-system";
import Spinner from "./spinner";

export enum SoundEffect {
  DICE_ROLL = "dice-roll",
  CLICK_ARROW = "click-arrow",
  BONUS_REACHED = "bonus-reached",
}

const SOUND_PATHS: Record<SoundEffect, string> = {
  [SoundEffect.DICE_ROLL]: "/sounds/dice-roll.mp3",
  [SoundEffect.CLICK_ARROW]: "/sounds/arrow-whoosh.wav",
  [SoundEffect.BONUS_REACHED]: "/sounds/bonus-reached.wav",
};

export const buttonVariants = cva(
  "inline-flex w-full flex-row items-center justify-center rounded-md py-2 text-center text-sm font-bold uppercase tracking-wider transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 lg:text-xl lg:tracking-normal",
  {
    variants: {
      variant: {
        primary:
          "border border-primary bg-primary-700 text-white hover:shadow-basic focus:ring-2 focus:ring-primary-200 focus:ring-offset-2 active:bg-primary-600 active:shadow-none disabled:border-transparent",
        outline:
          "border-2 border-primary bg-transparent text-white hover:bg-primary focus:ring-2 focus:ring-primary-200 focus:ring-offset-2 active:border-primary-600 active:bg-transparent active:shadow-basic disabled:bg-transparent",
        ghost:
          "border border-transparent bg-transparent font-normal tracking-[0.08em] text-white/50 hover:text-white active:text-white/75",
        google: "border-2 border-white/30 bg-white/10 hover:bg-white/20 active:bg-white/25",
        sidebar: "bg-white/5",
      },
      size: {
        xs: "px-6 py-2 text-xs",
        sm: "px-6 py-2 text-sm",
        base: "px-6 py-3",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top" | (string & {});
  isLoading?: boolean;
  sound?: SoundEffect;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, href, isLoading, children, variant, sound, onClick, ...props }, ref) => {
    const { soundEnabled, soundVolume } = useSoundSystem();
    const composedClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
      console.log("SOUND ENABLED", soundEnabled);
      if (sound && soundEnabled) {
        console.log("PLAYING SOUND BRO");
        const audio = new Audio(SOUND_PATHS[sound]);
        audio.volume = soundVolume / 100;
        console.log("AUDIO VOLUME:", audio.volume);
        audio.play().catch(console.error);
      }
      if (onClick) onClick(e);
    };
    if (href) {
      return (
        <Link
          href={href}
          className={cn(buttonVariants({ variant, className }), disabled && "opacity-50")}
          target={props.target}
        >
          {children}
        </Link>
      );
    } else
      return (
        <button
          disabled={isLoading || disabled}
          className={cn(buttonVariants({ variant, className }), disabled && "opacity-50")}
          ref={ref}
          {...props}
          onClick={composedClickHandler}
        >
          {isLoading && <Spinner />}
          {children}
        </button>
      );
  },
);

Button.displayName = "Button";
