import { useState } from "react";
import { PiSlidersFill } from "react-icons/pi";

import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import useGetDungeons from "@/hooks/queries/use-get-dungeons";
import { cn } from "@/utils/style-utils";

import { MobileAdventure } from "./mobile-adventure";

const MobileAdventures = ({
  adventureDetailId,
  setAdventureDetailId,
  closingId,
  animate,
}: {
  adventureDetailId: string | undefined;
  setAdventureDetailId: React.Dispatch<React.SetStateAction<string | undefined>>;
  closingId?: string | undefined;
  animate?: boolean;
}) => {
  const [featuredOpened, setFeaturedOpened] = useState(false);
  const [opening, setOpening] = useState(false);

  const {
    data: featuredAdventuresData,
    isError: featuredError,
    isLoading: featuredLoading,
  } = useGetDungeons({ filter: "top" });

  const {
    data: adventuresData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useGetDungeons({ filter: "top" || "owned" }); //todo

  const { lastObjectRef: lastAdventureRef } = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });
  if (isError || featuredError) return <div>Something went wrong</div>;

  if (isLoading || featuredLoading)
    return (
      <div>
        <div className={cn("flex animate-pulse flex-col gap-4 py-6 pl-4")}>
          <div className="h-5 w-40 rounded bg-gray-600" />
          <div className={cn("flex gap-4 overflow-hidden")}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className={cn("h-52 w-48 shrink-0 rounded-lg bg-gray-600")} />
            ))}
          </div>
        </div>
        <div className="h-0.5 w-full bg-black shadow-lobby" />
        <div className={cn("flex animate-pulse flex-col gap-4 px-4 py-2")}>
          <div className="h-5 w-40 rounded bg-gray-600" />
          <div className={cn("flex flex-col gap-4 overflow-hidden")}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className={cn("h-[102px] w-full shrink-0 rounded-lg bg-gray-600")} />
            ))}
          </div>
        </div>
      </div>
    );

  const featuredContent = featuredAdventuresData.pages.map((page) =>
    page.dungeons.map((adventure, i) => {
      if (page.dungeons.length === i + 1) {
        return (
          <MobileAdventure
            featured
            closingId={closingId}
            key={adventure._id}
            ref={lastAdventureRef}
            adventure={adventure}
            adventureDetailId={adventureDetailId}
            setAdventureDetailId={setAdventureDetailId}
            featuredOpened={featuredOpened}
            setFeaturedOpened={setFeaturedOpened}
            opening={opening}
            setOpening={setOpening}
            animate={animate}
          />
        );
      }
      return (
        <MobileAdventure
          featured
          closingId={closingId}
          key={adventure._id}
          adventure={adventure}
          adventureDetailId={adventureDetailId}
          setAdventureDetailId={setAdventureDetailId}
          featuredOpened={featuredOpened}
          setFeaturedOpened={setFeaturedOpened}
          opening={opening}
          setOpening={setOpening}
          animate={animate}
        />
      );
    }),
  );

  const content = adventuresData.pages.map((page) =>
    page.dungeons.map((adventure, i) => {
      if (page.dungeons.length === i + 1) {
        return (
          <MobileAdventure
            closingId={closingId}
            key={adventure._id}
            ref={lastAdventureRef}
            adventure={adventure}
            adventureDetailId={adventureDetailId}
            setAdventureDetailId={setAdventureDetailId}
            featuredOpened={featuredOpened}
            setFeaturedOpened={setFeaturedOpened}
            opening={opening}
            setOpening={setOpening}
            animate={animate}
          />
        );
      }
      return (
        <MobileAdventure
          closingId={closingId}
          key={adventure._id}
          adventure={adventure}
          adventureDetailId={adventureDetailId}
          setAdventureDetailId={setAdventureDetailId}
          featuredOpened={featuredOpened}
          setFeaturedOpened={setFeaturedOpened}
          opening={opening}
          setOpening={setOpening}
          animate={animate}
        />
      );
    }),
  );

  return (
    <div>
      <div className={cn("flex flex-col gap-2 py-6 pl-4")}>
        <p className="text-sm font-medium uppercase">TOP PICKS THIS MONTH</p>

        <div className={cn("flex flex-row gap-4 overflow-x-auto pr-4")}>{featuredContent}</div>
      </div>
      <div className="h-0.5 w-full bg-black shadow-lobby" />
      <div className={cn("flex flex-col gap-2 px-4 py-2")}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium uppercase">ALL ADVENTURES</p>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[8%] bg-black">
            <PiSlidersFill />
          </div>
        </div>

        <div className={cn("flex flex-col gap-4")}>{content}</div>
      </div>
    </div>
  );
};
export default MobileAdventures;
