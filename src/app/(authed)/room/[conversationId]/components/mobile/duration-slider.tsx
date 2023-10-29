import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import { BiCoffee } from "react-icons/bi";
import { BsFillLightningFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";

import SwordsIcon from "@/components/icons/swords-icon";
import { IRoomDetail } from "@/types/room";
import { DungeonDuration } from "@/utils/dungeon-options";
import { cn } from "@/utils/style-utils";

import usePlayerInfo from "../../hooks/use-player-info";

const elements = [
  {
    icon: SwordsIcon,
    title: "standard",
    text: "Standard game duration and storyline",
  },
  {
    icon: BiCoffee,
    title: "long",
    text: "The game and storyline are long",
  },
  {
    icon: BsFillLightningFill,
    title: "blitz",
    text: "The game and storyline are short",
  },
] as const;

const positions = ["center", "left", "right"];

const imageVariants: Variants = {
  center: { x: "0%", scale: 1, zIndex: 5 },
  left: { x: "-50%", scaleX: 0.7, scaleY: 0.8, zIndex: 3 },
  right: { x: "50%", scaleX: 0.7, scaleY: 0.8, zIndex: 3 },
};

interface IDurationSliderProps {
  roomData: IRoomDetail | undefined;
  disabled: boolean;
}

const DurationSlider = ({ roomData, disabled }: IDurationSliderProps) => {
  const { duration, setDuration } = usePlayerInfo(roomData);

  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2]);

  const onSelectDuration = (index: number) => {
    const duration: DungeonDuration = index === 0 ? "standard" : index === 1 ? "long" : "blitz";

    setDuration(duration);

    // TODO: fix animation
    console.log(positionIndexes);
    // if center element is clicked, do nothing
    // if left element is clicked, move all elements to the left by 1 (while keeping the order so that the leftmost element becomes the rightmost element)
    // if right element is clicked, move all elements to the right by 1 (while keeping the order so that the rightmost element becomes the leftmost element)
    if (index === 0) return;
    setPositionIndexes((prevIndexes) => {
      const updatedIndexes = prevIndexes.map((prevIndex) => (prevIndex + prevIndexes[index]) % 3);
      return updatedIndexes;
    });
  };

  return (
    <div className="flex h-40 w-full justify-center">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={cn(
            "relative flex min-w-[190px] flex-col items-center rounded-md bg-black/70 px-2 py-4 backdrop-blur-[7px]",
            duration === element.title && "border-2 border-primary",
            disabled && "pointer-events-none opacity-40",
          )}
          initial="center"
          animate={positions[positionIndexes[index]]}
          variants={imageVariants}
          transition={{ duration: 0.5 }}
          style={{ width: "40%", position: "absolute" }}
          onClick={() => onSelectDuration(index)}
        >
          {duration === element.title && (
            <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-br-md bg-primary">
              <GiCheckMark className="h-6 w-6" />
            </div>
          )}
          <element.icon
            className={cn(
              "mb-4 h-auto w-12 fill-white",
              duration === element.title && "fill-primary",
            )}
          />
          <p className="text-lg font-semibold uppercase">{element.title}</p>
          <p className="max-w-[160px] text-center text-sm font-light">{element.text}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DurationSlider;
