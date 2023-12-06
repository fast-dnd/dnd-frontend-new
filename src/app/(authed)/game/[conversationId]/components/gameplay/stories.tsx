import { useState } from "react";
import { Scroll } from "@phosphor-icons/react";
import { CaretCircleDown } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "framer-motion";

import SkeletonIcon from "@/components/icons/skeleton-icon";
import useAutoScrollToBottom from "@/hooks/helpers/use-auto-scroll-to-bottom";
import { IDungeonDetail } from "@/types/dungeon";
import { IRoomDetail } from "@/types/room";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

import useUpdateStories from "../../hooks/use-update-stories";
import ImageModal from "../modals/image-modal";
import StyledAudio from "./styled-audio";

export interface StoriesProps {
  roomData: IRoomDetail;
  dungeonData: IDungeonDetail;
  lastStory?: string;
}

const Stories = ({ roomData, dungeonData, lastStory }: StoriesProps) => {
  const { stories } = useUpdateStories({ roomData, lastStory });
  const { autoBottomScrollDiv } = useAutoScrollToBottom([roomData, stories]);

  const [openedMission, setOpenedMission] = useState(-1);

  return (
    <div className="flex w-full flex-1 flex-col gap-8 pr-4 lg:overflow-y-auto lg:pr-6">
      {stories.map((story, i) => {
        const generatedImage = roomData.generatedImages[i];

        return (
          <div
            key={i}
            className="flex w-full flex-col gap-4 rounded-md bg-black p-4 lg:gap-8 lg:p-6"
          >
            <div className="flex w-full items-center gap-1.5 lg:gap-3">
              <div className="inline-block h-2 w-2 shrink-0 rotate-45 bg-white" />
              <div
                className="mt-0.5 line-clamp-2 max-w-full text-lg font-semibold uppercase tracking-[0.2em] lg:flex lg:truncate lg:text-2xl"
                style={jibril.style}
              >
                <span className="mr-2 whitespace-nowrap text-white/30 lg:text-white/40">
                  ROUND {i + 1}/{roomData.maxRounds + 1}
                </span>
                <span className="lg:truncate">
                  {dungeonData.locations[Math.floor(i / 2)]?.name}
                </span>
              </div>
              <div className="h-2 w-2 shrink-0 rotate-45 bg-white" />
            </div>
            <div className="lg:hidden">
              <div
                onClick={() => {
                  if (openedMission === i) setOpenedMission(-1);
                  else setOpenedMission(i);
                }}
                className="flex w-full cursor-pointer items-center justify-between rounded-t-md bg-primary px-1.5 py-0.5 text-sm uppercase"
              >
                <div className="flex items-center gap-1">
                  <Scroll className="h-5 w-5" /> Round mission
                </div>
                <CaretCircleDown
                  className={cn(
                    "h-5 w-5 opacity-50 transition-transform duration-300",
                    openedMission === i && "rotate-180",
                  )}
                />
              </div>
              <AnimatePresence initial={false}>
                {openedMission === i && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="rounded-b-md bg-dark-900"
                  >
                    <div className="flex flex-col gap-2 p-3">
                      <p className="text-sm font-semibold leading-tight">
                        {dungeonData.locations[Math.floor(i / 2)]?.mission}
                      </p>
                      <div className="w-fit whitespace-nowrap rounded-full bg-white/[16%] px-2 py-1 text-xs">
                        If accomplished final score will be higher.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="w-full">
              {roomData.generateImages && i % 2 === 0 && (
                <div className="mb-4 flex aspect-video w-full shrink-0 justify-center lg:float-left lg:mr-6 lg:inline-block lg:aspect-square lg:h-72 lg:w-72">
                  {generatedImage && generatedImage.length > 0 ? (
                    <ImageModal image={generatedImage} />
                  ) : (
                    <div className="flex h-full w-full animate-pulse items-center justify-center rounded bg-gray-600">
                      <SkeletonIcon className="h-24 w-24 text-gray-200" />
                    </div>
                  )}
                </div>
              )}

              <div className="tracking-widest lg:text-[22px] lg:leading-8">
                {roomData.generateAudio && (
                  <div className="mb-4 max-lg:w-full">
                    <StyledAudio audio={roomData.generatedAudio[i]} />
                  </div>
                )}
                {story}
              </div>
            </div>
            <div className="max-lg:hidden">
              <div
                onClick={() => {
                  if (openedMission === i) setOpenedMission(-1);
                  else setOpenedMission(i);
                }}
                className="flex w-full cursor-pointer items-center justify-between rounded-t-md bg-primary px-3 py-1.5 uppercase"
              >
                <div className="flex items-center gap-2">
                  <Scroll className="h-7 w-7" /> Round mission
                </div>
                <CaretCircleDown
                  className={cn(
                    "h-7 w-7 opacity-50 transition-transform duration-300",
                    openedMission === i && "rotate-180",
                  )}
                />
              </div>
              <AnimatePresence initial={false}>
                {openedMission === i && (
                  <motion.div
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: "auto" },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="rounded-b-md bg-dark-900"
                  >
                    <div className="flex items-center justify-between gap-4 p-4">
                      <p className="text-xl font-light">
                        {dungeonData.locations[Math.floor(i / 2)]?.mission}
                      </p>
                      <div className="whitespace-nowrap rounded-full bg-white/[16%] px-3 py-2">
                        If accomplished final score will be higher.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
      <div ref={autoBottomScrollDiv} />
    </div>
  );
};

export default Stories;
