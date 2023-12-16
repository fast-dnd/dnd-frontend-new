"use client";

import React from "react";
import { useDebounce } from "usehooks-ts";

import { Dungeon } from "@/components/dungeon";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";
import Spinner from "@/components/ui/spinner";
import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import useGetDungeons from "@/hooks/queries/use-get-dungeons";
import { IBaseDungeon } from "@/types/dungeon";

import { SubTabType } from "@/app/(authed)/home/stores/tab-store";

interface IAdventuresProps {
  setDungeonDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  filter?: SubTabType;
  addToCampaign?: (dungeonName: IBaseDungeon) => void;
  addedToCampaign?: IBaseDungeon[];
  isOwned?: boolean;
  showActions?: boolean;
  searchName?: string;
  addFavorite?: boolean;
}

const Adventures = ({
  setDungeonDetailId,
  filter,
  addToCampaign,
  addedToCampaign,
  isOwned,
  showActions,
  searchName,
  addFavorite,
}: IAdventuresProps) => {
  const debouncedName = useDebounce<string | undefined>(searchName, 500);

  const {
    data: dungeonsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useGetDungeons({ filter: filter || "owned", name: debouncedName });

  const { lastObjectRef: lastDungeonRef } = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });
  if (isError) return <div>Something went wrong</div>;

  if (isLoading)
    return (
      <div className="no-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto">
        <Skeleton amount={2} />
      </div>
    );

  const content = dungeonsData.pages.map((page) =>
    page.dungeons.map((dungeon, i) => {
      if (page.dungeons.length === i + 1) {
        return (
          <Dungeon
            key={dungeon._id}
            dungeon={dungeon}
            setDungeonDetailId={setDungeonDetailId}
            ref={lastDungeonRef}
            addToCampaign={addToCampaign}
            isAddedToCampaign={addedToCampaign?.some((added) => added._id === dungeon._id)}
            isOwned={isOwned}
            showActions={showActions}
            addFavorite={addFavorite}
          />
        );
      }
      return (
        <Dungeon
          key={dungeon._id}
          dungeon={dungeon}
          setDungeonDetailId={setDungeonDetailId}
          addToCampaign={addToCampaign}
          isAddedToCampaign={addedToCampaign?.some((added) => added._id === dungeon._id)}
          isOwned={isOwned}
          showActions={showActions}
          addFavorite={addFavorite}
        />
      );
    }),
  );
  return dungeonsData.pages[0].dungeons.length === 0 ? (
    <NoAdventures />
  ) : (
    <div className="flex w-full flex-1 flex-col gap-8 overflow-y-auto pr-4">
      {content}
      {isFetchingNextPage && (
        <div className="flex h-10 justify-center">
          <Spinner className="m-0 h-8 w-8" />
        </div>
      )}
    </div>
  );
};

export default Adventures;

const NoAdventures = () => (
  <div className="flex w-full flex-1 items-center justify-center">
    <div className="flex h-full w-[490px] flex-col items-center justify-start gap-5 p-5 lg:gap-3 lg:p-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="61"
        height="60"
        viewBox="0 0 61 60"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M34.25 38.75V53.75L51.75 48.75L48 41.25C48 41.25 52.6513 30.695 49.2025 21.3613C46.6127 14.3552 39.5882 10.9673 34.7508 8.63429C32.8779 7.73099 31.3328 6.98582 30.5 6.25V35L34.1337 28.6413C34.9787 27.1625 36.5512 26.25 38.2537 26.25C40.875 26.25 43 28.3738 43 30.995V30.9963C43 32.6988 42.0875 34.2713 40.6088 35.1163L34.25 38.75ZM35.8661 20.3661C36.1005 20.1317 36.4185 20 36.75 20C37.0815 20 37.3995 20.1317 37.6339 20.3661C37.8683 20.6005 38 20.9185 38 21.25C38 21.5815 37.8683 21.8995 37.6339 22.1339C37.3995 22.3683 37.0815 22.5 36.75 22.5C36.4185 22.5 36.1005 22.3683 35.8661 22.1339C35.6317 21.8995 35.5 21.5815 35.5 21.25C35.5 20.9185 35.6317 20.6005 35.8661 20.3661ZM40.8661 20.3661C41.1005 20.1317 41.4185 20 41.75 20C42.0815 20 42.3995 20.1317 42.6339 20.3661C42.8683 20.6005 43 20.9185 43 21.25C43 21.5815 42.8683 21.8995 42.6339 22.1339C42.3995 22.3683 42.0815 22.5 41.75 22.5C41.4185 22.5 41.1005 22.3683 40.8661 22.1339C40.6317 21.8995 40.5 21.5815 40.5 21.25C40.5 20.9185 40.6317 20.6005 40.8661 20.3661ZM45.8661 20.3661C46.1005 20.1317 46.4185 20 46.75 20C47.0815 20 47.3995 20.1317 47.6339 20.3661C47.8683 20.6005 48 20.9185 48 21.25C48 21.5815 47.8683 21.8995 47.6339 22.1339C47.3995 22.3683 47.0815 22.5 46.75 22.5C46.4185 22.5 46.1005 22.3683 45.8661 22.1339C45.6317 21.8995 45.5 21.5815 45.5 21.25C45.5 20.9185 45.6317 20.6005 45.8661 20.3661Z"
          fill="white"
          fillOpacity="0.7"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26.75 38.75V53.75L9.25 48.75L13 41.25C13 41.25 8.34875 30.695 11.7975 21.3613C14.3873 14.3552 21.4118 10.9673 26.2492 8.63429C28.1221 7.73099 29.6672 6.98582 30.5 6.25V35L26.8662 28.6413C26.0212 27.1625 24.4487 26.25 22.7463 26.25C20.125 26.25 18 28.3738 18 30.995V30.9963C18 32.6988 18.9125 34.2713 20.3912 35.1163L26.75 38.75ZM13.3661 20.3661C13.6005 20.1317 13.9185 20 14.25 20C14.5815 20 14.8995 20.1317 15.1339 20.3661C15.3683 20.6005 15.5 20.9185 15.5 21.25C15.5 21.5815 15.3683 21.8995 15.1339 22.1339C14.8995 22.3683 14.5815 22.5 14.25 22.5C13.9185 22.5 13.6005 22.3683 13.3661 22.1339C13.1317 21.8995 13 21.5815 13 21.25C13 20.9185 13.1317 20.6005 13.3661 20.3661ZM18.3661 20.3661C18.6005 20.1317 18.9185 20 19.25 20C19.5815 20 19.8995 20.1317 20.1339 20.3661C20.3683 20.6005 20.5 20.9185 20.5 21.25C20.5 21.5815 20.3683 21.8995 20.1339 22.1339C19.8995 22.3683 19.5815 22.5 19.25 22.5C18.9185 22.5 18.6005 22.3683 18.3661 22.1339C18.1317 21.8995 18 21.5815 18 21.25C18 20.9185 18.1317 20.6005 18.3661 20.3661ZM23.3661 20.3661C23.6005 20.1317 23.9185 20 24.25 20C24.5815 20 24.8995 20.1317 25.1339 20.3661C25.3683 20.6005 25.5 20.9185 25.5 21.25C25.5 21.5815 25.3683 21.8995 25.1339 22.1339C24.8995 22.3683 24.5815 22.5 24.25 22.5C23.9185 22.5 23.6005 22.3683 23.3661 22.1339C23.1317 21.8995 23 21.5815 23 21.25C23 20.9185 23.1317 20.6005 23.3661 20.3661Z"
          fill="white"
          fillOpacity="0.7"
        />
        <path
          d="M34.1337 28.6413L30.5 35V3.75C30.5 3.75 34.9787 27.1625 34.1337 28.6413Z"
          fill="white"
        />
        <path
          d="M26.8664 28.6413L30.5001 35V3.75C30.5001 3.75 26.0214 27.1625 26.8664 28.6413Z"
          fill="white"
          fillOpacity="0.5"
        />
      </svg>
      <p className="text-center text-lg font-semibold uppercase leading-7 tracking-[3.30px] lg:text-xl">
        No Adventures Carved Out Yet!
      </p>
      <p className="text-center text-sm font-normal lg:text-base">
        Every legendary story starts in a mysterious dungeon. Dive into your imagination and craft
        your first adventure. Fill its corridors with challenges, secrets, and tales that
        adventurers yearn to explore!
      </p>
      <Button href="/create-adventure">CREATE NEW ADVENTURE</Button>
    </div>
  </div>
);
