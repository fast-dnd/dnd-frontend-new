import React, { useState } from "react";
import { Copy } from "iconsax-react";

import DeleteModal from "@/components/delete-modal";
import Spinner from "@/components/ui/spinner";
import useCopy from "@/hooks/helpers/use-copy";
import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import useGetDungeons from "@/hooks/queries/use-get-dungeons";
import { IBaseDungeon } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";

import { MobileAdventure } from "@/app/(authed)/home/components/mobile/mobile-adventure";
import MobileAdventureDetail from "@/app/(authed)/home/components/mobile/mobile-adventure-detail";

const Adventures = () => {
  const [adventureDetailId, setAdventureDetailId] = useState<string>();
  const [closingId, setClosingId] = useState<string>();
  const [opening, setOpening] = useState(false);

  const { copied, onCopy } = useCopy();

  const onClose = adventureDetailId
    ? () => {
        setClosingId(adventureDetailId);
        setAdventureDetailId(undefined);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setTimeout(() => setClosingId(undefined), 500);
      }
    : undefined;

  const {
    data: adventuresData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useGetDungeons({ filter: "owned" });

  const { lastObjectRef: lastAdventureRef } = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });

  if (isError) return <div>Something went wrong</div>;

  if (isLoading)
    return (
      <div className={cn("flex animate-pulse flex-col gap-4 px-4 py-2")}>
        <div className={cn("flex flex-col gap-4 overflow-hidden")}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex flex-col gap-1 bg-transparent">
              <div className={cn("h-[102px] w-full shrink-0 rounded-lg bg-gray-600")} />
              <div className="flex w-full gap-1">
                <div className="h-5 w-40 animate-pulse rounded bg-gray-600" />
                <div className="h-5 w-40 animate-pulse rounded bg-gray-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  const content = adventuresData.pages.map((page) =>
    page.dungeons.map((adventure, i) => {
      if (page.dungeons.length === i + 1) {
        return (
          <AdventureWrapper
            key={adventure._id}
            adventure={adventure}
            adventureDetailId={adventureDetailId}
            opening={opening}
            onCopy={onCopy}
          >
            <MobileAdventure
              key={adventure._id}
              ref={lastAdventureRef}
              closingId={closingId}
              adventure={adventure}
              adventureDetailId={adventureDetailId}
              setAdventureDetailId={setAdventureDetailId}
              opening={opening}
              setOpening={setOpening}
            />
          </AdventureWrapper>
        );
      }
      return (
        <AdventureWrapper
          key={adventure._id}
          adventure={adventure}
          adventureDetailId={adventureDetailId}
          opening={opening}
          onCopy={onCopy}
        >
          <MobileAdventure
            key={adventure._id}
            closingId={closingId}
            adventure={adventure}
            adventureDetailId={adventureDetailId}
            setAdventureDetailId={setAdventureDetailId}
            opening={opening}
            setOpening={setOpening}
          />
        </AdventureWrapper>
      );
    }),
  );

  return adventuresData.pages[0].dungeons.length === 0 ? (
    <NoAdventures />
  ) : (
    <div className="relative flex w-full flex-1 flex-col gap-4">
      {content}
      <MobileAdventureDetail
        hideStartButton
        onClose={onClose}
        adventureDetailId={adventureDetailId}
      />

      {isFetchingNextPage && (
        <div className="flex h-10 justify-center">
          <Spinner className="m-0 h-8 w-8" />
        </div>
      )}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 bg-dark-900 opacity-0 transition-all duration-500",
          adventureDetailId && "pointer-events-auto opacity-100",
        )}
      />
    </div>
  );
};

interface IAdventureWrapperProps {
  children: React.ReactNode;
  adventure: IBaseDungeon;
  adventureDetailId?: string | undefined;
  opening: boolean;
  onCopy: (text: string) => void;
}

const AdventureWrapper = ({
  children,
  adventure,
  adventureDetailId,
  opening,
  onCopy,
}: IAdventureWrapperProps) => (
  <div
    className={cn(
      "flex flex-col gap-0.5",
      !!adventureDetailId && "pointer-events-none",
      !!adventureDetailId && adventureDetailId !== adventure._id && !opening && "hidden",
    )}
  >
    {children}
    <div
      className={cn(
        "flex w-full gap-0.5 opacity-100 transition-all duration-500",
        !!adventureDetailId && !opening && "opacity-0",
      )}
    >
      <button
        className="flex w-1/2 items-center justify-center gap-1 rounded-bl-md bg-black py-1"
        onClick={() => onCopy(adventure._id)}
      >
        Copy ID
        <Copy variant="Bold" />
      </button>
      <DeleteModal id={adventure._id} type="adventure" />
    </div>
  </div>
);

export default Adventures;

const NoAdventures = () => (
  <div className="relative flex w-full flex-1 items-center justify-center">
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
      <p className="text-center text-lg font-semibold uppercase leading-7 tracking-widest lg:text-xl">
        No Adventures Carved Out Yet!
      </p>
      <p className="text-center text-sm font-normal lg:text-base">
        To create an adventure switch to your desktop and follow a step-by-step process.
      </p>
    </div>
  </div>
);
