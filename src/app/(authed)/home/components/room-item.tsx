import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineRight } from "react-icons/ai";

import { IRoomArrayElement } from "@/types/room";
import Spinner from "@/components/ui/spinner";

const RoomItem = ({ room }: { room: IRoomArrayElement }) => {
  const router = useRouter();

  const [loadingRoom, setLoadingRoom] = useState(false);

  const onRoomClick = () => {
    setLoadingRoom(true);
    router.push(`/game/${room.conversationId}`);
  };

  return (
    <div className="flex w-full flex-row items-center gap-4 rounded-md p-4 transition-colors duration-300 hover:bg-white/10">
      <Image
        src={room.dungeon.imageUrl || "/images/default-dungeon.png"}
        alt={"Game"}
        width={80}
        height={80}
        className="h-20"
      />
      <div className="flex flex-1 flex-col justify-center gap-1">
        <p className="line-clamp-2 w-48 font-medium uppercase leading-5 tracking-widest lg:line-clamp-none lg:w-auto">
          {room.dungeon.name}
        </p>
        <p className="w-48 truncate text-sm uppercase tracking-[0.15em] text-white/50 lg:w-auto">
          {room.avatar.name}
        </p>
        {room.state === "CLOSED" && (
          <p className="text-sm uppercase tracking-[0.15em] text-white/50">FINISHED</p>
        )}
        {room.state === "GAMING" && (
          <p className="text-sm uppercase tracking-[0.15em] text-tomato/50">
            RESUME (TURN {room.turn + 1})
          </p>
        )}
      </div>
      {room.state === "GAMING" && (
        <>
          {loadingRoom ? (
            <Spinner className="m-0 h-8 w-8" />
          ) : (
            <AiOutlineRight
              className="h-8 w-5 cursor-pointer text-tomato/50 transition-colors duration-300 hover:text-tomato"
              preserveAspectRatio="none"
              onClick={onRoomClick}
            />
          )}
        </>
      )}
    </div>
  );
};

export default RoomItem;
