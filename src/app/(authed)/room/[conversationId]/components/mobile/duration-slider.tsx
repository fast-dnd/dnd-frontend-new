import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { BiCoffee } from "react-icons/bi";
import { BsFillLightningFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";

import SwordsIcon from "@/components/icons/swords-icon";
import { DungeonDuration } from "@/utils/dungeon/dungeon-options";
import { cn } from "@/utils/style-utils";

const elements = [
  {
    icon: BsFillLightningFill,
    title: "blitz",
    text: "The game and storyline are short",
  },
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
] as const;

const positions = ["left", "center", "right"];

const imageVariants: Variants = {
  left: { x: "-50%", scaleX: 0.7, scaleY: 0.8, zIndex: 3 },
  center: { x: "0%", scale: 1, zIndex: 5 },
  right: { x: "50%", scaleX: 0.7, scaleY: 0.8, zIndex: 3 },
};

interface IDurationSliderProps {
  disabled: boolean;
  duration: DungeonDuration | undefined;
  setDuration: React.Dispatch<React.SetStateAction<DungeonDuration | undefined>>;
}

const positionsFromIndex = (index: number) => {
  return [1, 2, 0].map((pos) => (pos - index + 3) % 3);
};

const indexFromDuration = (duration: DungeonDuration) => {
  return duration === "blitz" ? 0 : duration === "standard" ? 1 : 2;
};

const DurationSlider = ({ disabled, duration, setDuration }: IDurationSliderProps) => {
  const [positionIndexes, setPositionIndexes] = useState(
    positionsFromIndex(indexFromDuration(duration || "blitz")),
  );

  const onSelectDuration = (index: number) => {
    const newDuration: DungeonDuration = elements[index].title;
    if (newDuration === duration) return;

    setDuration(newDuration);
  };

  useEffect(() => {
    setPositionIndexes(positionsFromIndex(indexFromDuration(duration || "blitz")));
  }, [duration]);

  return (
    <div className="flex h-40 w-full justify-center">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className={cn(
            "relative flex min-w-[190px] flex-col items-center rounded-lg bg-black/70 px-2 py-4 backdrop-blur-[7px]",
            duration === element.title && "border-2 border-primary",
            duration !== element.title && "opacity-50",
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
