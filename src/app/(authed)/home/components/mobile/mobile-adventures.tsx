import { useState } from "react";
import { useDebounce } from "usehooks-ts";

import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import useGetDungeons from "@/hooks/queries/use-get-dungeons";
import { cn } from "@/utils/style-utils";

import { tabStore } from "../../stores/tab-store";
import { MobileAdventure } from "./mobile-adventure";
import MobileFilter from "./mobile-filter";
import MobileSearch from "./mobile-search";

interface IMobileAdventuresProps {
  adventureDetailId?: string | undefined;
  setAdventureDetailId: React.Dispatch<React.SetStateAction<string | undefined>>;
  closingId?: string | undefined;
  animate?: boolean;
}

const MobileAdventures = ({
  adventureDetailId,
  setAdventureDetailId,
  closingId,
  animate,
}: IMobileAdventuresProps) => {
  const [featuredOpened, setFeaturedOpened] = useState(false);
  const [opening, setOpening] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchName, setSearchName] = useState<string>();
  const debouncedName = useDebounce<string | undefined>(searchName, 500);

  const [filter, setFilter] = useState(false);
  const subTab = tabStore.subTab.use();

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
  } = useGetDungeons({ filter: subTab || "owned", name: debouncedName });

  const { lastObjectRef: lastAdventureRef } = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });

  if (isError || featuredError) return <div>Something went wrong</div>;

  const featuredContent = featuredAdventuresData?.pages[0].dungeons.map((adventure) => (
    <MobileAdventure
      featured
      closingId={closingId}
      key={`featured${adventure._id}`}
      adventure={adventure}
      adventureDetailId={adventureDetailId}
      setAdventureDetailId={setAdventureDetailId}
      featuredOpened={featuredOpened}
      setFeaturedOpened={setFeaturedOpened}
      opening={opening}
      setOpening={setOpening}
      animate={animate}
      addFavorite
    />
  ));

  const content = adventuresData?.pages.map((page) =>
    page.dungeons.map((adventure, i) => {
      if (page.dungeons.length === i + 1) {
        return (
          <MobileAdventure
            closingId={closingId}
            key={`${subTab}${adventure._id}`}
            ref={lastAdventureRef}
            adventure={adventure}
            adventureDetailId={adventureDetailId}
            setAdventureDetailId={setAdventureDetailId}
            featuredOpened={featuredOpened}
            setFeaturedOpened={setFeaturedOpened}
            opening={opening}
            setOpening={setOpening}
            animate={animate}
            addFavorite
          />
        );
      }
      return (
        <MobileAdventure
          closingId={closingId}
          key={`${subTab}${adventure._id}`}
          adventure={adventure}
          adventureDetailId={adventureDetailId}
          setAdventureDetailId={setAdventureDetailId}
          featuredOpened={featuredOpened}
          setFeaturedOpened={setFeaturedOpened}
          opening={opening}
          setOpening={setOpening}
          animate={animate}
          addFavorite
        />
      );
    }),
  );

  return (
    <div>
      {featuredLoading ? (
        <div className={cn("flex animate-pulse flex-col gap-4 py-6 pl-4")}>
          <div className="h-5 w-40 rounded bg-gray-600" />
          <div className={cn("flex gap-4 overflow-hidden")}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className={cn("h-52 w-48 shrink-0 rounded-lg bg-gray-600")} />
            ))}
          </div>
        </div>
      ) : (
        <div className={cn("flex flex-col gap-2 py-6 pl-4")}>
          <p className="text-sm font-medium uppercase">TOP PICKS THIS MONTH</p>
          <div className="flex flex-row gap-4 overflow-x-auto pr-4">{featuredContent}</div>
          <div
            className={cn(
              "pointer-events-none absolute right-0 z-20 h-60 w-16 bg-gradient-to-l from-dark-900 to-transparent",
              adventureDetailId && "hidden",
            )}
          />
        </div>
      )}

      <div className="h-0.5 w-full bg-black shadow-lobby" />

      <div className={cn("flex flex-col gap-2 px-4 py-2")}>
        <div className="relative flex items-center gap-2">
          <div
            className={cn(
              "flex flex-1 opacity-100 transition-opacity duration-300",
              searchOpen && "opacity-0",
            )}
          >
            {isLoading ? (
              <div className="h-5 w-40 rounded bg-gray-600" />
            ) : (
              <p className="text-sm font-medium uppercase">{subTab} ADVENTURES</p>
            )}
          </div>
          <MobileSearch open={searchOpen} setOpen={setSearchOpen} setSearchName={setSearchName} />
          <MobileFilter open={filter} setOpen={setFilter} />
        </div>
        {isLoading ? (
          <div className={cn("flex flex-col gap-4 overflow-hidden")}>
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className={cn("h-[102px] w-full shrink-0 rounded-lg bg-gray-600")} />
            ))}
          </div>
        ) : (
          <div className={cn("flex flex-col gap-4")}>{content}</div>
        )}
      </div>
    </div>
  );
};
export default MobileAdventures;
