import { PiSlidersFill } from "react-icons/pi";

import useGetDungeons from "@/hooks/queries/use-get-dungeons";
import { cn } from "@/utils/style-utils";

import MobileAdventure from "./mobile-adventure";

const MobileAdventures = ({
  adventureDetailId,
  setAdventureDetailId,
  featured,
  closingId,
  featuredOpened,
  setFeaturedOpened,
}: {
  adventureDetailId?: string | undefined;
  setAdventureDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  featured?: boolean;
  closingId?: string | undefined;
  featuredOpened: boolean;
  setFeaturedOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    data: dungeonsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useGetDungeons({ filter: "top" || "owned" });

  if (isError) return <div>Something went wrong</div>;

  if (isLoading)
    return (
      <div className={cn("flex animate-pulse flex-col gap-4 px-4 py-2", featured && "py-6 pr-0")}>
        <div className="h-5 w-40 rounded bg-gray-600" />
        <div className={cn("flex flex-col gap-4 overflow-hidden", featured && "flex-row")}>
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className={cn(
                "h-[102px] w-full shrink-0 rounded-lg bg-gray-600",
                featured && "h-52 w-48",
              )}
            />
          ))}
        </div>
      </div>
    );

  const content = dungeonsData.pages.map((page) =>
    page.dungeons.map((dungeon, i) => {
      if (page.dungeons.length === i + 1) {
        //todo ref when last
        return (
          <MobileAdventure
            featured={featured}
            closingId={closingId}
            key={dungeon._id}
            adventure={dungeon}
            adventureDetailId={adventureDetailId}
            setAdventureDetailId={setAdventureDetailId}
            featuredOpened={featuredOpened}
            setFeaturedOpened={setFeaturedOpened}
          />
        );
      }
      return (
        <MobileAdventure
          featured={featured}
          closingId={closingId}
          key={dungeon._id}
          adventure={dungeon}
          adventureDetailId={adventureDetailId}
          setAdventureDetailId={setAdventureDetailId}
          featuredOpened={featuredOpened}
          setFeaturedOpened={setFeaturedOpened}
        />
      );
    }),
  );

  return (
    <div className={cn("flex flex-col gap-2 px-4 py-2", featured && "py-6 pr-0")}>
      {featured ? (
        <p className="text-sm font-medium uppercase">TOP PICKS THIS MONTH</p>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium uppercase">ALL ADVENTURES</p>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[8%] bg-black">
            <PiSlidersFill />
          </div>
        </div>
      )}

      <div
        className={cn(
          "flex flex-col gap-4",
          adventureDetailId && "overflow-y-hidden",
          featured && "flex-row overflow-x-auto",
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default MobileAdventures;
