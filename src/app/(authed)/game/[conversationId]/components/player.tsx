import useGetAvatar from "@/hooks/use-get-avatar";
import { IPlayer } from "@/types/dnd";
import Image from "next/image";
import { BsFillLightningFill } from "react-icons/bs";
import { VscHeartFilled } from "react-icons/vsc";
import { HiSparkles } from "react-icons/hi";
import { RiCopperCoinFill } from "react-icons/ri";
import { cn } from "@/utils/style-utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MdCheck, MdOutlineContentCopy } from "react-icons/md";

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
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex gap-2 text-lg items-center cursor-default">
                  <VscHeartFilled />
                  <span className="mt-0.5">{player.health}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Health</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex gap-2 text-lg items-center cursor-default">
                  <BsFillLightningFill />
                  <span className="mt-0.5">{player.bonusForNextRound}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Bonus - will be applied on next roll</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex gap-2 text-lg items-center cursor-default">
                  <HiSparkles />
                  <span className="mt-0.5">{player.mana}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mana - can be used on any roll</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex gap-2 text-lg items-center cursor-default">
                  <RiCopperCoinFill />
                  <span className="mt-0.5">{player.gold}</span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Gold that you have aquired till now</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
