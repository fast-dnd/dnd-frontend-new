import RoomItem from "@/components/common/room-item";
import QuillIcon from "@/components/icons/quill-icon";
import SkeletonIcon from "@/components/icons/skeleton-icon";
import Spinner from "@/components/ui/spinner";
import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import useGetRoomHistory from "@/hooks/queries/use-get-room-history";
import { cn } from "@/utils/style-utils";

const History = () => {
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
      <div className={cn("flex animate-pulse flex-col gap-4 px-4 py-2")}>
        <div className={cn("flex flex-col gap-4 overflow-hidden")}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex gap-4 bg-transparent">
              <div className="flex h-[100px] w-[100px] items-center justify-center rounded-md bg-gray-600">
                <SkeletonIcon className="h-20 w-20 text-gray-200" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="h-7 w-32 rounded-lg bg-gray-600" />
                <div className="h-5 w-20 rounded-lg bg-gray-600" />
              </div>
            </div>
          ))}
        </div>
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

  const content = roomsData.pages.map((page) =>
    page.rooms.map((room, i) => {
      if (page.rooms.length === i + 1) {
        return <RoomItem key={room.conversationId} room={room} ref={lastRoomItemRef} />;
      }
      return <RoomItem key={room.conversationId} room={room} />;
    }),
  );

  return roomsData.pages[0].rooms.length === 0 ? (
    <ZeroGames />
  ) : (
    <div className="relative flex w-full flex-1 flex-col gap-4">
      {content}

      {isFetchingNextPage && (
        <div className="flex h-10 justify-center">
          <Spinner className="m-0 h-8 w-8" />
        </div>
      )}
    </div>
  );
};

export default History;

const ZeroGames = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-full w-[490px] flex-col items-center justify-start gap-5 p-5 lg:gap-8 lg:p-8">
        <QuillIcon />
        <p className="text-center text-lg font-semibold uppercase leading-7 tracking-widest lg:text-xl">
          No Games in Your History... FOR NOW
        </p>
        <p className="text-center text-sm font-normal leading-7 lg:text-base">
          Your tale is yet to be written, adventurer. Set forth and embark on your first epic
          journey.
        </p>
      </div>
    </div>
  );
};
