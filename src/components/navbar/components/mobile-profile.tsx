import Image from "next/image";
import Link from "next/link";
import { PenNib, Plugs, Star, UserCircle } from "@phosphor-icons/react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useWallet } from "@solana/wallet-adapter-react";
import { AiOutlineClose } from "react-icons/ai";
import { FaDice } from "react-icons/fa";
import { toast } from "sonner";

import DiamondDMCurrencyIcon from "@/components/icons/diamond-dm-currency-icon";
import GoldCoinIcon from "@/components/icons/gold-coin-icon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import useAuth from "@/hooks/helpers/use-auth";
import useCommunity from "@/hooks/helpers/use-community";
import useGetWeb3Balance from "@/hooks/helpers/use-get-web3-balance";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";
import useGetLeaderboardMetrics from "@/hooks/queries/use-get-leaderboard-metrics";
import { logout } from "@/utils/auth";

const MobileProfile = ({
  setShopOpen,
}: {
  setShopOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isDefault, communityId } = useCommunity();

  const { publicKey } = useWallet();
  const { data: leaderboardMetrics } = useGetLeaderboardMetrics();

  const { user, loggedIn } = useAuth();

  const { data: currentCommunity } = useGetCurrentCommunity();

  const userBalance = useGetWeb3Balance({
    accountAddress: publicKey?.toString() ?? "",
    mintAddress: currentCommunity?.gameCurrency ?? "",
  });

  const onSignOut = () => {
    logout();
    toast.success("Signed out successfully!");
  };
  const leaderboardMetricsArr = [
    {
      icon: <FaDice size={20} className="fill-white/50" />,
      rank: leaderboardMetrics?.rating.gameplay,
    },
    {
      icon: <Star size={20} weight="fill" className="fill-white/50" />,
      rank: leaderboardMetrics?.rating.influencer,
    },
    {
      icon: <PenNib size={20} weight="fill" className="fill-white/50" />,
      rank: leaderboardMetrics?.rating.contentCreation,
    },
  ];

  if (!loggedIn) return <></>;

  return (
    <Dialog>
      <DialogTrigger className="pointer-events-auto flex shrink-0 items-center gap-2 text-xs uppercase">
        <Image
          src={user?.account.imageUrl || "/images/default-avatar.png"}
          width={32}
          height={32}
          alt="avatar"
          className="size-8 rounded-full border-2 border-white/10 "
        />
      </DialogTrigger>
      <DialogContent
        fromBottom
        alwaysOnTop
        className="pointer-events-auto bottom-0 left-0 top-auto flex w-full max-w-full translate-x-0 translate-y-0 flex-col items-center gap-4 rounded-lg border-t border-t-white/[16%] bg-dark-900 p-4 pt-2.5 focus:ring-0 data-[state=closed]:duration-300 data-[state=open]:duration-300"
      >
        <div className="pointer-events-none absolute -top-9 flex w-full justify-center">
          <Image
            src={user?.account.imageUrl || "/images/default-avatar.png"}
            width={70}
            height={70}
            alt="avatar"
            className="size-[70px] rounded-full border-2 border-white/10 "
          />
        </div>
        <div className="mb-10 flex w-full justify-end">
          <DialogClose>
            <AiOutlineClose />
          </DialogClose>
        </div>
        {leaderboardMetricsArr[0].rank !== undefined && (
          <div className="absolute top-4 mb-2 flex gap-5">
            {leaderboardMetricsArr.map(({ icon, rank }, index) => (
              <div
                key={index}
                className="relative flex size-12 flex-col items-center justify-center rounded-full bg-[#232322]"
              >
                {icon}
                <p className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 font-medium text-white/50">
                  {rank}
                </p>
              </div>
            ))}
          </div>
        )}
        {isDefault ? (
          <>
            <div className="flex w-full gap-2">
              <div className="flex basis-1/2 justify-end">
                <div className="flex min-w-[80px] items-center justify-between gap-2 rounded-md bg-white/5 px-2 py-1">
                  <GoldCoinIcon />
                  <div className="flex flex-1 items-center justify-center">
                    {user?.account.coins ?? "-"}
                  </div>
                  <DialogClose
                    onClick={() => setShopOpen(true)}
                    className="rounded-lg bg-white/10 px-1.5 hover:opacity-70 active:opacity-90 lg:px-2 lg:py-1"
                  >
                    +
                  </DialogClose>
                </div>
              </div>
              <div className="flex basis-1/2">
                <div className="flex min-w-[80px] items-center justify-between gap-1 rounded-md bg-white/5 px-2 py-1">
                  <DiamondDMCurrencyIcon image />
                  <div className="flex flex-1 items-center justify-center">
                    {user?.account.dmCurrency ?? "-"}
                  </div>
                  {/* TODO: shop modal */}
                  {/* <Link
                    href="/shop"
                    className="rounded-lg bg-white/10 px-1.5 hover:opacity-70 active:opacity-90"
                  >
                    +
                  </Link> */}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center gap-3">
              <p className="leading-none">
                {publicKey?.toBase58().slice(0, 4)}...{publicKey?.toBase58().slice(-4, -1)}
              </p>
              {communityId && currentCommunity && (
                <div className="flex items-center gap-1 text-sm leading-none">
                  <Image
                    src={currentCommunity.tokenImgUrl}
                    width={20}
                    height={20}
                    alt={currentCommunity.name + " token image"}
                    className="rounded-full bg-primary-900 p-1"
                  />
                  {userBalance} {currentCommunity.currencyName}
                </div>
              )}
            </div>
            {currentCommunity && (
              <Button
                className="w-fit whitespace-nowrap"
                href={`https://jup.ag/swap/USDC-${currentCommunity.currencyName}`}
                target="_blank"
              >
                ADD MORE {currentCommunity.currencyName}
              </Button>
            )}
          </>
        )}
        <div className="h-0.5 w-full bg-black shadow-lobby" />{" "}
        <Link href="/profile" className="flex items-center gap-2">
          <UserCircle className="size-7" />
          View Profile
        </Link>
        <button className="flex items-center gap-2 tracking-[1.2px]" onClick={onSignOut}>
          <Plugs className="size-7" />
          {isDefault ? "Sign out" : "Disconnect Wallet"}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default MobileProfile;
