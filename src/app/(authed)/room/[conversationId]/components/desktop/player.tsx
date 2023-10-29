import Image from "next/image";

import Spinner from "@/components/ui/spinner";
import { IPlayer } from "@/types/room";

const Player = ({ player }: { player: IPlayer }) => {
  return (
    <div key={player.accountId} className="flex w-full flex-row gap-6">
      <Image
        src={player.imageUrl || "/images/default-avatar.png"}
        width={83}
        height={83}
        alt={`player-${player.accountId}-avatar`}
        className="h-[70px] w-[70px] rounded-md lg:h-[83px] lg:w-[83px]"
      />

      <div className="flex w-full min-w-0 flex-col justify-between">
        <p className="truncate text-lg lg:text-2xl">{player.name}</p>
        {player.champion ? (
          <p className="line-clamp-2 text-base lg:text-xl">
            {player.champion.name} -{" "}
            <span className="text-sm font-light lg:text-base">{player.champion.description}</span>
          </p>
        ) : (
          <div className="mb-2 flex items-center gap-2">
            <Spinner className="m-0 h-5 w-5" />
            <p className="mt-0.5">Choosing character...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
