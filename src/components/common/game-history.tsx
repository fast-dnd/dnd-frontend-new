import React from "react";

import RoomItem from "@/components/common/room-item";
import QuillIcon from "@/components/icons/quill-icon";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";
import Spinner from "@/components/ui/spinner";
import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import useGetRoomHistory from "@/hooks/queries/use-get-room-history";

const GameHistory = ({ showFull = false }) => {
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
    return <Skeleton small amount={2} />;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  const content = showFull
    ? roomsData.pages.map((page) =>
        page.rooms.map((room, i) => (
          <RoomItem key={room.conversationId} room={room} ref={lastRoomItemRef} />
        )),
      )
    : roomsData.pages[0].rooms
        .slice(0, 3)
        .map((room) => <RoomItem key={room.conversationId} room={room} />);

  return (
    <div className="flex flex-1 flex-col gap-6">
      {showFull && <p>Games played: {roomsData?.pages[0].total ?? "--"}</p>}
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto">
        {content}
        {isFetchingNextPage && <Spinner />}
        {!showFull && (
          <>
            <Button href="/profile?activeTab=GAME HISTORY">SHOW ENTIRE GAME HISTORY</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameHistory;

const ZeroGames = () => (
  <div>
    <QuillIcon />
    <p>No Games in Your History... FOR NOW</p>
  </div>
);
