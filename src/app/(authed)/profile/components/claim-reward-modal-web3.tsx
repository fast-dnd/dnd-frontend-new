import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import useCommunity from "@/hooks/helpers/use-community";
import useGetTokenAccountBalance from "@/hooks/helpers/use-get-token-account-balance";
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

  const adventureBalance = useGetTokenAccountBalance(dungeon?.adventureTreasuryAddress ?? "");

  const { onWithdrawAdventureCurrency } = useOnWithdrawAdventureCurrency({
    amount: adventureBalance,
    dungeonId: dungeon._id,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn("w-fit", (isDefault || !isOwned) && "hidden")}
          onClick={(e) => e.stopPropagation()}
        >
          Withdraw {adventureBalance} {currentCommunity?.currencyName}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="flex flex-col gap-12 border border-white/10 bg-black p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-4">
            <div className="size-2 shrink-0 rotate-45 bg-primary" />
            <p
              className="mt-1 text-sm uppercase tracking-widest lg:text-2xl lg:tracking-[6.4px]"
              style={jibril.style}
            >
              WITHDRAW FUNDS
            </p>
            <div className="size-2 shrink-0 rotate-45 bg-primary" />
          </div>
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
          <Button
            className="w-64"
            onClick={(e) => {
              e.stopPropagation();
              onWithdrawAdventureCurrency();
            }}
          >
            WITHDRAW FUNDS
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClaimRewardModalWeb3;
