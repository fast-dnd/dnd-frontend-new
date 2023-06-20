import Skeleton from "@/components/ui/skeleton";
import useGetDungeon from "@/hooks/use-get-dungeon";
import useGetRoomData from "@/hooks/use-get-room-data";
import { IRoomData } from "@/services/room-service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineRight } from "react-icons/ai";

const RoomItem = (props: { room: IRoomData }) => {
  const { room } = props;
  const router = useRouter();
  const { data: roomData } = useGetRoomData(room.conversationId);
  const { data: dungeonData } = useGetDungeon(room.dungeonId);

  if (!roomData || !dungeonData) return <Skeleton small />;

  const player = roomData.playerState.find(
    (plyr) => plyr.accountId === localStorage.getItem("accountId"),
  );

  return (
    <div className="flex flex-row items-center gap-4 w-full hover:bg-white/10 p-4 rounded-md transition-colors duration-300">
      <Image
        src={"" || "/images/bg-cover.png"}
        alt={"Game"}
        width={80}
        height={80}
        className="h-20"
      />
      <div className="flex flex-col gap-1 flex-1 justify-center">
        <p className="leading-5 font-medium tracking-widest uppercase">{dungeonData.name}</p>
        <p className="text-sm tracking-[0.15em] text-white/50 uppercase">{player?.name}</p>
        {room.state === "CLOSED" && (
          <p className="text-sm tracking-[0.15em] text-white/50 uppercase">FINISHED</p>
        )}
        {room.state === "GAMING" && (
          <p className="text-sm tracking-[0.15em] text-tomato/50 uppercase">
            RESUME (TURN {room.currentRound + 1})
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
