import { IPlayer } from "@/types/dnd";
import Image from "next/image";

const Player = ({ player }: { player: IPlayer }) => {
  return (
    <div key={player.accountId} className="flex flex-row gap-6">
      <Image
        src={player.avatarImageUrl || "/images/default-avatar.png"}
        width={83}
        height={83}
        alt={`player-${player.accountId}-avatar`}
        className="h-[70px] w-[70px] md:h-[83px] md:w-[83px]"
      />

      <div className="flex flex-col gap-1">
        <p className="text-lg md:text-2xl">{player.name}</p>
        {player.champion && (
          <p className="text-base md:text-xl line-clamp-2">
            {player.champion.name} -{" "}
            <span className="text-sm md:text-base font-light">{player.champion.description}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Player;
