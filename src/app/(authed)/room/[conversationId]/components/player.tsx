import Image from "next/image";

import { IPlayer } from "@/types/room";
import Spinner from "@/components/ui/spinner";

const Player = ({ player }: { player: IPlayer }) => {
  return (
    <div key={player.accountId} className="flex flex-row gap-6">
      <Image
        src={player.imageUrl || "/images/default-avatar.png"}
        width={83}
        height={83}
        alt={`player-${player.accountId}-avatar`}
        className="h-[70px] w-[70px] rounded-md lg:h-[83px] lg:w-[83px]"
      />

      <div className="flex flex-col justify-between">
        <p className="text-lg lg:text-2xl">{player.name}</p>
        {player.champion ? (
          <p className="line-clamp-2 text-base lg:text-xl">
            {player.champion.name} -{" "}
            <span className="text-sm font-light lg:text-base">{player.champion.description}</span>
          </p>
        ) : (
          <div className="flex gap-2">
            <Spinner className="h-8 w-8" />
            <p>Choosing hero...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
