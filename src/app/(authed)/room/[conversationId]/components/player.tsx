import useGetAvatar from "@/hooks/use-get-avatar";
import { IPlayer } from "@/types/dnd";
import Image from "next/image";

const Player = ({ player }: { player: IPlayer }) => {
  return (
    <div key={player.accountId} className="flex flex-row gap-6">
      <Image
        src={player.avatarImageUrl || "/images/default-avatar.png"}
        width={64}
        height={64}
        alt={`player-${player.accountId}-avatar`}
        className="w-16 h-16"
      />

      <div className="flex flex-col gap-1">
        <p className="text-2xl">{player.name}</p>
        <p className="text-xl font-light">{player.champion?.name}</p>
      </div>
    </div>
  );
};

export default Player;
