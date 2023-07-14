import Skeleton from "@/components/ui/skeleton";
import QuillIcon from "@/components/icons/quill-icon";

import { useGetRoomHistory } from "../hooks/use-get-home-data";
import RoomItem from "./room-item";

const GameHistory = () => {
  const { data: roomHistory, isLoading } = useGetRoomHistory();

  if (isLoading) {
    return (
      <div className="no-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto">
        <Skeleton amount={2} small />
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

  if (roomHistory.rooms.length === 0) {
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
    <div className="no-scrollbar flex w-full flex-col gap-2 overflow-y-auto lg:-mt-4">
      {roomHistory.rooms.map((room) => (
        <RoomItem room={room} key={room.conversationId} />
      ))}
    </div>
  );
};

export default GameHistory;
