import Image from "next/image";

import { IPlayer } from "@/types/game";

const Player = ({ player }: { player: IPlayer }) => {
  return (
    <div key={player.accountId} className="flex flex-row gap-6">
      <Image
        src={player.avatarImageUrl || "/images/default-avatar.png"}
        width={83}
        height={83}
        alt={`player-${player.accountId}-avatar`}
        className="h-[70px] w-[70px] lg:h-[83px] lg:w-[83px]"
      />

      <div className="flex flex-col gap-1">
        <p className="text-lg lg:text-2xl">{player.name}</p>
        {player.champion && (
          <p className="line-clamp-2 text-base lg:text-xl">
            {player.champion.name} -{" "}
            <span className="text-sm font-light lg:text-base">{player.champion.description}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Player;
