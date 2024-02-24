import SkeletonIcon from "@/components/icons/skeleton-icon";
import useAutoScrollToBottom from "@/hooks/helpers/use-auto-scroll-to-bottom";
import { IDungeonDetail } from "@/types/dungeon";
import { IRoomDetail } from "@/types/room";
import { jibril } from "@/utils/fonts";

import useUpdateStories from "../../hooks/use-update-stories";
import ImageModal from "../modals/image-modal";
import StyledAudio from "./styled-audio";

interface IStoriesProps {
  roomData: IRoomDetail;
  dungeonData: IDungeonDetail;
  lastStory?: string;
}

const Stories = ({ roomData, dungeonData, lastStory }: IStoriesProps) => {
  const { stories } = useUpdateStories({ roomData, lastStory });
  const { autoBottomScrollDiv } = useAutoScrollToBottom([roomData, stories]);

  return (
    <div className="flex w-full flex-1 flex-col gap-8 lg:overflow-y-auto lg:pr-6">
      <StoryList roomData={roomData} dungeonData={dungeonData} stories={stories} />
      <div ref={autoBottomScrollDiv} />
    </div>
  );
};

interface IStoryListProps {
  roomData: IRoomDetail;
  dungeonData: IDungeonDetail;
  stories: string[];
}

const StoryList = ({ roomData, dungeonData, stories }: IStoryListProps) => {
  return (
    <>
      {stories.map((story, i) => {
        const generatedImage = roomData.generatedImages[i];

        return (
          <div
            key={i}
            className="flex w-full flex-col gap-4 rounded-md bg-primary-900 p-4 lg:gap-8 lg:p-6"
          >
            <div className="flex w-full items-center gap-1.5 lg:gap-3">
              <div className="size-2 shrink-0 rotate-45 bg-white max-lg:hidden" />
              <p
                className="mt-0.5 line-clamp-2 max-w-full text-2xl font-semibold uppercase tracking-[0.2em] max-lg:hidden"
                style={jibril.style}
              >
                <span className="whitespace-nowrap text-white/40">
                  ROUND {i + 1}/{roomData.maxRounds + 1}
                </span>
                <span>&zwnj; {dungeonData.locations[Math.floor(i / 2)]?.name}</span>
              </p>
              <p className="mt-0.5 max-w-full font-semibold uppercase tracking-tight lg:hidden">
                <span className="whitespace-nowrap text-white/30">
                  ROUND {i + 1}/{roomData.maxRounds + 1}
                </span>
                <span>&zwnj; {dungeonData.locations[Math.floor(i / 2)]?.name}</span>
              </p>
              <div className="size-2 shrink-0 rotate-45 bg-white max-lg:hidden" />
            </div>

            <div className="w-full">
              {roomData.generateImages && i % 2 === 0 && (
                <div className="mb-4 flex aspect-video w-full shrink-0 justify-center lg:float-left lg:mr-6 lg:inline-block lg:aspect-square lg:size-72">
                  {generatedImage && generatedImage.length > 0 ? (
                    <ImageModal image={generatedImage} />
                  ) : (
                    <div className="flex size-full animate-pulse items-center justify-center rounded bg-gray-600">
                      <SkeletonIcon className="size-24 text-gray-200" />
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
          </div>
        );
      })}
    </>
  );
};

export default Stories;
