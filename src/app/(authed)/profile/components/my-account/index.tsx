"use client";

import Image from "next/image";
import Link from "next/link";
import { Game, People, Star1, Timer } from "iconsax-react";
import { MdEdit } from "react-icons/md";

import Coin from "@/components/coin";
import Helmet2Icon from "@/components/icons/helmet2-icon";
import SwordsIcon from "@/components/icons/swords-icon";
import { Box } from "@/components/ui/box";
import useGetAccount from "@/hooks/use-get-account";

import MyAccountSkeleton from "./my-account-skeleton";
import SignOutButton from "./sign-out-button";
import StatisticsCard from "./statistics-card";

const MyAccount = () => {
  const { data: account, isLoading } = useGetAccount();

  if (isLoading) return <MyAccountSkeleton />;

  if (!account) return <div>Something went wrong</div>;

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
              src={account.account.imageUrl || "/images/default-avatar.png"}
              width={100}
              height={100}
              alt="avatar"
              className="h-[100px] w-[100px] rounded-md"
            />
          </div>
          <div className="flex w-full min-w-0 flex-col gap-2.5">
            <div className="flex w-full flex-col gap-1">
              <p className="truncate text-xl font-bold uppercase">{account.account.username}</p>
              <p>Level {account.account.level}</p>
            </div>
            <p>{account.account.properties.email}</p>
            <div className="flex flex-col gap-2 transition-all duration-200 hover:opacity-80">
              <Link
                className="flex w-fit items-center gap-2 rounded-md bg-white/5 px-3 py-1"
                href="/edit-profile"
              >
                <MdEdit />
                EDIT
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex w-full flex-col gap-2">
          <p className="text-lg font-bold">COINS</p>
          <div className="flex w-full gap-4">
            <StatisticsCard
              icon={<Coin silver />}
              value={account.statistics.totalCoins}
              name="Coins"
            />
            <StatisticsCard
              icon={<Coin />}
              value={account.statistics.totalDmCoinsEarned}
              name="DM Coins"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p className="text-lg font-bold">PLAYER STATS</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <StatisticsCard
              icon={<Helmet2Icon />}
              value={account.statistics.createdAdventuresCount}
              name="Created adventures"
            />
            <StatisticsCard
              icon={<SwordsIcon />}
              value={account.statistics.createdCampaignsCount}
              name="Created campaigns"
            />
            <StatisticsCard
              icon={<Game color="#FF5A5A" variant="Bold" />}
              value={account.statistics.totalGamesPlayed}
              name="Games played"
            />
            <StatisticsCard
              icon={<Timer color="#FF5A5A" variant="Bold" />}
              value={account.statistics.totalGameplayHours.toFixed(2)}
              name="Hours played"
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <p className="text-lg font-bold">MASTER STATS</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <StatisticsCard
              icon={<Helmet2Icon />}
              value={account.statistics.createdAdventuresCount}
              name="Created adventures"
            />
            <StatisticsCard
              icon={<SwordsIcon />}
              value={account.statistics.createdCampaignsCount}
              name="Created campaigns"
            />
            <StatisticsCard
              icon={<Star1 color="#FF5A5A" variant="Bold" />}
              value={
                account.statistics.totalAdventureRatings === 0
                  ? 0
                  : account.statistics.averageAdventureRating +
                    "(" +
                    account.statistics.totalAdventureRatings +
                    ")"
              }
              name="Avg. adventure rating"
            />
            <StatisticsCard
              icon={<People color="#FF5A5A" variant="Bold" />}
              value={account.statistics.totalAdventurePlayers}
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
