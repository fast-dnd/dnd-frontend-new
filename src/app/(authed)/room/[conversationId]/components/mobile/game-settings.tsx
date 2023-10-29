import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { BiCoffee } from "react-icons/bi";
import { BsFillLightningFill } from "react-icons/bs";

import SwordsIcon from "@/components/icons/swords-icon";
import { cn } from "@/utils/style-utils";

import useChampionInfo from "../../hooks/use-champion-info";

const elements = [
  {
    icon: <SwordsIcon className="mb-4 h-auto w-12" />,
    title: "STANDARD",
    text: "Standard game duration and storyline",
  },
  {
    icon: <BiCoffee className="mb-4 h-auto w-12" />,
    title: "LONG",
    text: "The game and storyline are long",
  },
  {
    icon: <BsFillLightningFill className="mb-4 h-auto w-12" />,
    title: "BLITZ",
    text: "The game and storyline are short",
  },
] as const;

const GameSettings = ({ conversationId }: { conversationId: string }) => {
  const { selectedChampion } = useChampionInfo({ conversationId });

  const positions = ["center", "left1", "right1"];

  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2]);

  const imageVariants: Variants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left1: { x: "-50%", scale: 0.7, zIndex: 3 },
    right1: { x: "50%", scale: 0.7, zIndex: 3 },
  };

  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center gap-4 bg-primary-900 px-8 py-4 text-sm",
        !selectedChampion && "hidden",
      )}
    >
      <p className="uppercase">Game settings</p>
      <div className="flex w-full justify-center">
        {elements.map((element, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center rounded-md bg-black/70 px-2 py-4 backdrop-blur-[7px]"
            initial="center"
            animate={positions[positionIndexes[index]]}
            variants={imageVariants}
            transition={{ duration: 0.5 }}
            style={{ width: "40%", position: "absolute" }}
            onClick={() => {
              console.log(index);
              // if center element is clicked, do nothing
              // if left element is clicked, move all elements to the left by 1 (while keeping the order so that the leftmost element becomes the rightmost element)
              // if right element is clicked, move all elements to the right by 1 (while keeping the order so that the rightmost element becomes the leftmost element)
              if (index === 0) return;
              else if (index === 2) {
                setPositionIndexes((prevIndexes) => {
                  const updatedIndexes = prevIndexes.map((prevIndex) => (prevIndex + 1) % 3);
                  return updatedIndexes;
                });
              } else if (index === 1) {
                setPositionIndexes((prevIndexes) => {
                  const updatedIndexes = prevIndexes.map((prevIndex) => (prevIndex + 2) % 3);
                  return updatedIndexes;
                });
              }
            }}
          >
            {element.icon}
            <p className="text-lg font-semibold">{element.title}</p>
            <p className="max-w-[160px] text-center text-sm font-light">{element.text}</p>
          </motion.div>
        ))}
      </div>
      {/* <div className="flex flex-col items-center rounded-md bg-black/70 px-2 py-4 backdrop-blur-[7px]">
        <SwordsIcon className="mb-4 h-auto w-12" />
        <p className="text-lg font-semibold">Game Mode</p>
        <p className="max-w-[160px] text-center text-sm font-light">
          Standard game duration and storyline
        </p>
      </div> */}
    </div>
  );
};

export default GameSettings;
