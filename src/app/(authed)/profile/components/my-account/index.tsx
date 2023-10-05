"use client";

import Image from "next/image";
import Link from "next/link";
import { Game, People, Star1, Timer } from "iconsax-react";
import { MdEdit } from "react-icons/md";

import Coin from "@/components/coin";
import Helmet2Icon from "@/components/icons/helmet2-icon";
import SkeletonIcon from "@/components/icons/skeleton-icon";
import SwordsIcon from "@/components/icons/swords-icon";
import { Box } from "@/components/ui/box";
import useGetAccount from "@/hooks/use-get-account";

import SignOutButton from "./sign-out-button";
import StatisticsCard from "./statistics-card";

const MyAccount = () => {
  const { data: account, isLoading } = useGetAccount();

  if (isLoading) return <MyAccountSkeleton />;

  if (!account) return <div>Something went wrong</div>;

  return (
    <Box
      title="MY ACCOUNT"
      wrapperClassName="flex h-full basis-1/3"
      className="flex h-full flex-col gap-8 overflow-y-auto p-8"
    >
      <div className="flex flex-col gap-8">
        <div className="flex gap-4">
          <div className="my-auto h-fit w-fit">
            <Image
              src={account.account.imageUrl || "/images/default-avatar.png"}
              width={100}
              height={100}
              alt="avatar"
              className="h-[100px] w-[100px] rounded-md"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-col gap-1">
              <p className="text-xl font-bold uppercase">{account.account.username}</p>
              <p>Level {account.account.level}</p>
            </div>
            <p>{account.account.properties.email}</p>
            <div className="flex flex-col gap-2">
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

const MyAccountSkeleton = () => {
  return (
    <Box
      title="MY ACCOUNT"
      wrapperClassName="flex h-full basis-1/3"
      className="flex h-full flex-col gap-8 overflow-y-hidden p-8"
    >
      <div className="flex flex-col gap-8">
        <div className="flex animate-pulse items-center gap-4">
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-md bg-gray-600">
            <SkeletonIcon className="h-12 w-12 text-gray-200" />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="h-5 w-48 rounded-full bg-gray-600" />
              <div className="h-5 w-32 rounded-full bg-gray-600" />
            </div>

            <div className="h-5 w-64 rounded-full bg-gray-600" />
            <div className="h-7 w-20 rounded-lg bg-gray-600" />
          </div>
        </div>
      </div>

      <div className="flex animate-pulse flex-col gap-6">
        <div className="flex w-full flex-col gap-2">
          <div className="mb-1 h-6 w-20 rounded-lg bg-gray-600" />
          <div className="flex w-full gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-600" />
            <div className="h-20 w-full rounded-lg bg-gray-600" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="mb-1 h-6 w-32 rounded-lg bg-gray-600" />
          <div className="flex w-full gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-600" />
            <div className="h-20 w-full rounded-lg bg-gray-600" />
          </div>
          <div className="flex w-full gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-600" />
            <div className="h-20 w-full rounded-lg bg-gray-600" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="mb-1 h-6 w-36 rounded-lg bg-gray-600" />
          <div className="flex w-full gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-600" />
            <div className="h-20 w-full rounded-lg bg-gray-600" />
          </div>
          <div className="flex w-full gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-600" />
            <div className="h-20 w-full rounded-lg bg-gray-600" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 animate-pulse items-end justify-center">
        <div className="h-14 w-40 rounded-lg bg-gray-600" />
      </div>
    </Box>
  );
};

export default MyAccount;
