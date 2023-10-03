import useGetRoomHistory from "@/hooks/use-get-room-history";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
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

  if (isError) return <div>Something went wrong</div>;

  if (isLoading) {
    return (
      <div className="no-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto">
        <div className="mb-2 h-6 w-32 animate-pulse rounded-full bg-gray-600 " />
        <Skeleton small amount={2} />
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

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6">
      <p className="uppercase">Games played: {roomsData?.pages[0].total ?? "--"}</p>
      <div className="flex h-full flex-col gap-4 overflow-y-auto">
        {roomsData.pages[0].rooms.length === 0 ? (
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
        ) : (
          <>
            {content}
            {isFetchingNextPage && (
              <div className="flex w-full text-center text-2xl">Loading...</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GameHistory;
