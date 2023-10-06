import QuillIcon from "@/components/icons/quill-icon";
import RoomItem from "@/components/room-item";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";
import Spinner from "@/components/ui/spinner";
import useGetRoomHistory from "@/hooks/use-get-room-history";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

const GameHistory = ({ showFull = false }: { showFull?: boolean }) => {
  const {
    data: roomsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useGetRoomHistory();

  const { lastObjectRef: lastRoomItemRef } = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });

  if (isLoading) {
    return (
      <div className="no-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto">
        {showFull && <div className="mb-3 h-5 w-32 animate-pulse rounded-xl bg-gray-600" />}
        <Skeleton small amount={2} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  const content = showFull
    ? roomsData.pages.map((page) =>
        page.rooms.map((room, i) => {
          if (page.rooms.length === i + 1) {
            return <RoomItem key={room.conversationId} room={room} ref={lastRoomItemRef} />;
          }
          return <RoomItem key={room.conversationId} room={room} />;
        }),
      )
    : roomsData.pages[0].rooms
        .slice(0, 2)
        .map((room) => <RoomItem key={room.conversationId} room={room} />);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      {showFull && <p className="uppercase">Games played: {roomsData?.pages[0].total ?? "--"}</p>}

      <div className="flex h-full flex-col gap-4 overflow-y-auto pb-2 pr-4">
        {roomsData.pages[0].rooms.length === 0 ? (
          <ZeroGames />
        ) : (
          <>
            {content}
            {isFetchingNextPage && (
              <div className="flex h-10 justify-center">
                <Spinner className="m-0 h-8 w-8" />
              </div>
            )}
            {!showFull && (
              <Button href="/profile?activeTab=GAME+HISTORY" variant="outline">
                SHOW ENTIRE GAME HISTORY
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GameHistory;

const ZeroGames = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-full w-[490px] flex-col items-center justify-start gap-5 p-5 lg:gap-8 lg:p-8">
        <QuillIcon />
        <p className="text-center text-lg font-semibold uppercase leading-7 tracking-[3.30px] lg:text-xl">
          No Games in Your History... FOR NOW
        </p>
        <p className="text-center text-sm font-normal leading-7 tracking-widest text-white/50 lg:text-base">
          Your tale is yet to be written, adventurer. Set forth and embark on your first epic
          journey.
        </p>
      </div>
    </div>
  );
};
