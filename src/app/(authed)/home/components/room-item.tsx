import { IRoomArrayElement } from "@/services/room-service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineRight } from "react-icons/ai";

const RoomItem = (props: { room: IRoomArrayElement }) => {
  const { room } = props;
  const router = useRouter();

  return (
    <div className="flex flex-row items-center gap-4 w-full hover:bg-white/10 p-4 rounded-md transition-colors duration-300">
      <Image
        src={room.dungeon.imageUrl || "/images/default-dungeon.png"}
        alt={"Game"}
        width={80}
        height={80}
        className="h-20"
      />
      <div className="flex flex-col gap-1 flex-1 justify-center">
        <p className="leading-5 font-medium tracking-widest uppercase">{room.dungeon.name}</p>
        <p className="text-sm tracking-[0.15em] text-white/50 uppercase">{room.avatar.name}</p>
        {room.state === "CLOSED" && (
          <p className="text-sm tracking-[0.15em] text-white/50 uppercase">FINISHED</p>
        )}
        {room.state === "GAMING" && (
          <p className="text-sm tracking-[0.15em] text-tomato/50 uppercase">
            RESUME (TURN {room.turn + 1})
          </p>
        )}
      </div>
      {room.state === "GAMING" && (
        <AiOutlineRight
          className="cursor-pointer text-tomato/50 h-8 w-5 hover:text-tomato transition-colors duration-300"
          preserveAspectRatio="none"
          onClick={() => router.push(`/game/${room.conversationId}`)}
        />
      )}
    </div>
  );
};

export default RoomItem;
