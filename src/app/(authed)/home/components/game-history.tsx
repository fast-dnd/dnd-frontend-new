import Skeleton from "@/components/ui/skeleton";
import { useGetRoomHistory } from "../hooks/use-get-home-data";
import RoomItem from "./room-item";

const GameHistory = () => {
  const { data: roomHistory, isLoading } = useGetRoomHistory();

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 gap-8 overflow-y-auto no-scrollbar">
        <Skeleton small />
        <Skeleton small />
      </div>
    );
  }

  if (!roomHistory) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-white text-5xl">Something went wrong</div>
      </div>
    );
  }

  return (
    <div className="md:-mt-4 flex flex-col w-full gap-2 overflow-y-auto no-scrollbar">
      {roomHistory.rooms.map((room) => (
        <RoomItem room={room} key={room.conversationId} />
      ))}
      <div />
    </div>
  );
};

export default GameHistory;
