"use client";

import Image from "next/image";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { Game, People, Star1, Timer } from "iconsax-react";
import { MdEdit } from "react-icons/md";

import DiamondDMCurrencyIcon from "@/components/icons/diamond-dm-currency-icon";
import GoldCoinIcon from "@/components/icons/gold-coin-icon";
import Helmet2Icon from "@/components/icons/helmet2-icon";
import SwordsIcon from "@/components/icons/swords-icon";
import { Box } from "@/components/ui/box";
import useAuth from "@/hooks/helpers/use-auth";
import useCommunity from "@/hooks/helpers/use-community";
import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";

import ClaimRewardModal from "../../claim-reward-modal";
import MyAccountSkeleton from "./my-account-skeleton";
import SignOutButton from "./sign-out-button";
import StatisticsCard from "./statistics-card";

const MyAccount = () => {
  const { isDefault } = useCommunity();

  const { data: currentCommunity, isLoading } = useGetCurrentCommunity();

  const { publicKey, wallet } = useWallet();

  const { loggingIn, user } = useAuth();

  if (loggingIn || isLoading) return <MyAccountSkeleton />;

  if (!user || !currentCommunity) return <div>Something went wrong</div>;

  const { account, statistics } = user;

  return (
    <Box
      title="MY ACCOUNT"
      wrapperClassName="flex h-full w-[30%]"
      className="flex h-full w-full flex-col gap-8 overflow-y-auto p-8"
    >
      <div className="flex w-full flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="h-[100px] w-[100px] shrink-0">
            <Image
              src={account.imageUrl || "/images/default-avatar.png"}
              width={100}
              height={100}
              alt="avatar"
              className="h-[100px] w-[100px] rounded-md"
            />
          </div>
          <div className="flex h-full w-full min-w-0 flex-col justify-between gap-2.5">
            <div className="flex w-full flex-col gap-1">
              <p className="truncate text-xl font-bold uppercase">
                {isDefault ? account.username : publicKey?.toBase58().slice(0, 4)}...
                {publicKey?.toBase58().slice(-4, -1)}
              </p>
            </div>
            {isDefault && <p>{account.properties.email}</p>}
            {isDefault ? (
              <div className="flex flex-col gap-2 transition-all duration-200 hover:opacity-80">
                <Link
                  className="flex w-fit items-center gap-2 rounded-md bg-white/5 px-3 py-1"
                  href="/edit-profile"
                >
                  <MdEdit />
                  EDIT
                </Link>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p>Connected with:</p>
                <div className="flex items-center gap-1">
                  <Image
                    src={wallet?.adapter.icon ?? ""}
                    alt={wallet?.adapter.name ?? ""}
                    height={20}
                    width={20}
                  />
                  <p className="font-semibold">{wallet?.adapter.name}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex w-full flex-col gap-2">
          <p className="text-lg font-bold">COINS</p>
          {isDefault ? (
            <div className="flex w-full gap-4">
              <StatisticsCard icon={<GoldCoinIcon />} value={statistics.totalCoins} name="Coins" />
              <StatisticsCard
                icon={<DiamondDMCurrencyIcon />}
                value={statistics.totalDmCoinsEarned}
                name="DM Coins"
              />
            </div>
          ) : (
            <>
              <StatisticsCard
                icon={<GoldCoinIcon />}
                value={statistics.totalCoins}
                name={`$${currentCommunity.name}`}
              />
              <ClaimRewardModal />
            </>
          )}
        </div>

        <div className="flex w-full flex-col gap-2">
          <p className="text-lg font-bold">PLAYER STATS</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <StatisticsCard
              icon={<Helmet2Icon />}
              value={statistics.createdAdventuresCount}
              name="Created adventures"
            />
            <StatisticsCard
              icon={<SwordsIcon />}
              value={statistics.createdCampaignsCount}
              name="Created campaigns"
            />
            <StatisticsCard
              icon={<Game color="#FF5A5A" variant="Bold" />}
              value={statistics.totalGamesPlayed}
              name="Games played"
            />
            <StatisticsCard
              icon={<Timer color="#FF5A5A" variant="Bold" />}
              value={statistics.totalGameplayHours.toFixed(2)}
              name="Hours played"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p className="text-lg font-bold">MASTER STATS</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <StatisticsCard
              icon={<Helmet2Icon />}
              value={statistics.createdAdventuresCount}
              name="Created adventures"
            />
            <StatisticsCard
              icon={<SwordsIcon />}
              value={statistics.createdCampaignsCount}
              name="Created campaigns"
            />
            <StatisticsCard
              icon={<Star1 color="#FF5A5A" variant="Bold" />}
              value={
                statistics.totalAdventureRatings === 0
                  ? 0
                  : statistics.averageAdventureRating + "(" + statistics.totalAdventureRatings + ")"
              }
              name="Avg. adventure rating"
            />
            <StatisticsCard
              icon={<People color="#FF5A5A" variant="Bold" />}
              value={statistics.totalAdventurePlayers}
              name="Adventure players"
            />
          </div>
        </div>
      </div>
      <SignOutButton />
    </Box>
  );
};

export default MyAccount;
