import useGetAvatar from "@/hooks/use-get-avatar";
import { IPlayer } from "@/types/dnd";
import Image from "next/image";

const Player = ({ player }: { player: IPlayer }) => {
  const { data: avatarData, isLoading } = useGetAvatar(player.avatarId);

  return (
    <div key={player.accountId} className="flex flex-row gap-6">
      {!isLoading && (
        <Image
          src={avatarData?.imageUrl || "/images/default-avatar.png"}
          width={64}
          height={64}
          alt={`player-${player.accountId}-avatar`}
          className="w-16 h-16"
        />
      )}
      {isLoading && <div className="h-16 w-16" />}

      <div className="flex flex-col gap-1">
        <p className="text-2xl">{player.name}</p>
        <p className="text-xl font-light">{player.champion?.name}</p>
      </div>
    </div>
  );
};

export default Player;
