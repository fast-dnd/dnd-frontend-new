import Skeleton from "@/components/ui/skeleton";

import { useGetRoomHistory } from "../hooks/use-get-home-data";
import RoomItem from "./room-item";

const GameHistory = () => {
  const { data: roomHistory, isLoading } = useGetRoomHistory();

  if (isLoading) {
    return (
      <div className="no-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto">
        <Skeleton small />
        <Skeleton small />
      </div>
    );
  }

  if (!roomHistory) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  return (
    <div className="no-scrollbar flex w-full flex-col gap-2 overflow-y-auto lg:-mt-4">
      {roomHistory.rooms.map((room) => (
        <RoomItem room={room} key={room.conversationId} />
      ))}
      <div />
    </div>
  );
};

export default GameHistory;
