import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import useCommunity from "@/hooks/helpers/use-community";
import useGetWeb3Balance from "@/hooks/helpers/use-get-web3-balance";
import useOnWithdrawAdventureCurrency from "@/hooks/mutations/use-withdraw-adventure-currency";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import { IBaseDungeon } from "@/types/dungeon";
import { jibril } from "@/utils/fonts";
import { cn } from "@/utils/style-utils";

interface IClaimRewardModalWeb3Props {
  dungeon: IBaseDungeon;
  isOwned?: boolean;
}

const ClaimRewardModalWeb3 = ({ dungeon, isOwned }: IClaimRewardModalWeb3Props) => {
  const { isDefault } = useCommunity();

  const { data: currentCommunity } = useGetCurrentCommunity();

  const adventureBalance = useGetWeb3Balance({
    tokenAccountAddress: dungeon?.adventureTreasuryAddress ?? "",
    mintAddress: currentCommunity?.gameCurrency ?? "",
  });

  const { onWithdrawAdventureCurrency } = useOnWithdrawAdventureCurrency({
    amount: adventureBalance,
    dungeonId: dungeon._id,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn("w-fit", (isDefault || isOwned || adventureBalance === 0) && "hidden")}
          onClick={(e) => e.stopPropagation()}
        >
          Withdraw {adventureBalance} {currentCommunity?.currencyName}
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-12 border border-white/10 bg-black p-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-4">
            <div className="h-2 w-2 shrink-0 rotate-45 bg-primary" />
            <p
              className="mt-1 text-sm uppercase tracking-widest lg:text-2xl lg:tracking-[6.4px]"
              style={jibril.style}
            >
              CLAIM A REWARD
            </p>
            <div className="h-2 w-2 shrink-0 rotate-45 bg-primary" />
          </div>
          <p className="text-center text-sm font-light lg:w-[450px] lg:text-xl lg:tracking-[1.5px]">
            Congrats! You have reached the top of the scoreboard and earned
          </p>
        </div>

        <div className="flex h-32 w-full flex-col items-center justify-center gap-4">
          <Image
            src="/images/web3-reward-animation.gif"
            alt="reward animation"
            width={250}
            height={250}
            className="absolute top-[25%] z-[-5]"
          />
          <p className="z-10 text-5xl" style={jibril.style}>
            {adventureBalance}
          </p>
          <p className="z-10 text-3xl">{currentCommunity?.currencyName}</p>
        </div>

        <DialogFooter className="flex w-full items-center justify-center">
          <Button className="w-56" onClick={onWithdrawAdventureCurrency}>
            CLAIM REWARD
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimRewardModalWeb3;
