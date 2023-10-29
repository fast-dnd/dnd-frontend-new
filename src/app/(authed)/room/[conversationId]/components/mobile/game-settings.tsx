import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { BiCoffee } from "react-icons/bi";
import { BsFillLightningFill } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { useReadLocalStorage } from "usehooks-ts";

import SwordsIcon from "@/components/icons/swords-icon";
import { DungeonDuration } from "@/utils/dungeon-options";
import { cn } from "@/utils/style-utils";

import useChampionInfo from "../../hooks/use-champion-info";
import useOnRoomChange from "../../hooks/use-on-room-change";
import usePlayerInfo from "../../hooks/use-player-info";
import useRoomSocket from "../../hooks/use-room-socket";

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

const GameSettings = ({ conversationId }: { conversationId: string }) => {
  const { selectedChampion, roomData } = useChampionInfo({ conversationId });

  const { duration, setDuration } = usePlayerInfo(roomData);

  const { gameStarting } = useRoomSocket(conversationId);

  const accountId = useReadLocalStorage<string>("accountId");

  const isAdmin = accountId === roomData?.playerState[0].accountId;

  const { generateAudio, generateImages, setGenerateImages, setGenerateAudio, updatingRoom } =
    useOnRoomChange({
      conversationId,
      duration,
      roomData,
      isAdmin,
    });

  const positions = ["center", "left", "right"];

  const [positionIndexes, setPositionIndexes] = useState([0, 1, 2]);

  const imageVariants: Variants = {
    center: { x: "0%", scale: 1, zIndex: 5 },
    left: { x: "-50%", scaleX: 0.7, scaleY: 0.8, zIndex: 3 },
    right: { x: "50%", scaleX: 0.7, scaleY: 0.8, zIndex: 3 },
  };

  const onSelectDuration = (index: number) => {
    const duration: DungeonDuration = index === 0 ? "standard" : index === 1 ? "long" : "blitz";

    setDuration(duration);

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
    <div
      className={cn(
        "flex flex-1 flex-col items-center gap-4 bg-primary-900 px-8 py-4 text-sm",
        !selectedChampion && "hidden",
      )}
    >
      <p className="uppercase">Game settings</p>
      <div className="flex h-40 w-full justify-center">
        {elements.map((element, index) => (
          <motion.div
            key={index}
            className={cn(
              "relative flex min-w-[190px] flex-col items-center rounded-md bg-black/70 px-2 py-4 backdrop-blur-[7px]",
              duration === element.title && "border-2 border-primary",
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
      <div className="-mx-8 h-1 w-[calc(100%_+_4rem)] bg-black shadow-lobby" />
      <div className="flex w-full items-center gap-6">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Images:</p>
          <div className="relative h-[39px] w-[94px]">
            <div className="absolute left-0 top-0 h-[39px] w-[94px] rounded-full border border-white/10 bg-black backdrop-blur-[10px]" />
            <div className="absolute left-[12px] top-[10px]  text-sm font-semibold text-white text-opacity-25">
              ON
            </div>
            <div className="absolute left-[57px] top-[2px] h-[35px] w-[35px]">
              <div className="absolute left-0 top-0 h-[35px] w-[35px] rounded-full border border-white/10 bg-rose-500 backdrop-blur-[10px]" />
              <div className="absolute left-[8px] top-[7px] inline-flex h-5 w-5 items-center justify-center">
                <div className="relative h-5 w-5"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">Audio:</p>
          <div>awd</div>
        </div>
      </div>
    </div>
  );
};

export default GameSettings;
