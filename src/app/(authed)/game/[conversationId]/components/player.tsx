import useGetAvatar from "@/hooks/use-get-avatar";
import { IPlayer } from "@/types/dnd";
import Image from "next/image";
import { BsFillLightningFill } from "react-icons/bs";
import { VscHeartFilled } from "react-icons/vsc";
import { HiSparkles } from "react-icons/hi";
import { RiCopperCoinFill } from "react-icons/ri";
import { cn } from "@/utils/style-utils";

const Player = (props: { player: IPlayer }) => {
  const { player } = props;

  const { data: avatarData } = useGetAvatar(player.avatarId);

  return (
    <div className={cn("flex relative gap-6", player.health <= 0 && "opacity-50")}>
      <Image
        src={avatarData?.imageUrl || "/images/default-avatar.png"}
        alt={player.name}
        width={90}
        height={90}
      />

      <div className="flex flex-col gap-1.5">
        <p className="font-semibold text-xl tracking-[0.07em] uppercase">{player.name}</p>
        <p className="font-light tracking-[0.15em]">{player.champion.name}</p>
        <div className="flex gap-8">
          <div className="flex gap-2 text-lg items-center">
            <VscHeartFilled />
            <span className="mt-0.5">{player.health}</span>
          </div>
          <div className="flex gap-2 text-lg items-center">
            <BsFillLightningFill />
            <span className="mt-0.5">{player.mana}</span>
          </div>
          <div className="flex gap-2 text-lg items-center">
            <HiSparkles />
            <span className="mt-0.5">{player.health}</span>
          </div>
          <div className="flex gap-2 text-lg items-center">
            <RiCopperCoinFill />
            <span className="mt-0.5">{player.gold}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
