import useGetRoomHistory from "@/hooks/use-get-room-history";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";
import QuillIcon from "@/components/icons/quill-icon";
import RoomItem from "@/components/room-item";

const GameHistory = () => {
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

  if (isError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="no-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto">
        <Skeleton amount={2} small />
      </div>
    );
  }

  const content = roomsData.pages.map((page) =>
    page.rooms.map((room, i) => {
      if (page.rooms.length === i + 1) {
        return <RoomItem key={room.conversationId} room={room} ref={lastRoomItemRef} />;
      }
      return <RoomItem key={room.conversationId} room={room} />;
    }),
  );

  if (roomsData.pages[0].rooms.length === 0) {
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
  }

  return (
    <>
      {content}
      {isFetchingNextPage && <div className="flex w-full text-center text-2xl">Loading...</div>}

      <Button href="/profile?activeTab=GAME+HISTORY" variant="outline">
        SHOW ENTIRE GAME HISTORY
      </Button>
    </>
  );
};

export default GameHistory;
