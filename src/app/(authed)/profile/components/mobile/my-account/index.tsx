import Image from "next/image";
import Link from "next/link";
import { Game, People, Star1, Timer } from "iconsax-react";
import { MdEdit } from "react-icons/md";

import DiamondDMCurrencyIcon from "@/components/icons/diamond-dm-currency-icon";
import GoldCoinIcon from "@/components/icons/gold-coin-icon";
import Helmet2Icon from "@/components/icons/helmet2-icon";
import SwordsIcon from "@/components/icons/swords-icon";
import useAuth from "@/hooks/helpers/use-auth";

import MyAccountSkeleton from "./my-account-skeleton";
import StatisticsCard from "./statistics-card";

const MobileMyAccount = () => {
  const { loggingIn, user } = useAuth();

  if (loggingIn) return <MyAccountSkeleton />;

  if (!user) return <div>Something went wrong</div>;

  const { account, statistics } = user;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex w-full gap-4">
        <div className="h-[160px] w-[160px] shrink-0">
          <Image
            src={account.imageUrl || "/images/default-avatar.png"}
            width={160}
            height={160}
            alt="avatar"
            className="h-[160px] w-[160px] rounded-md"
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <p className="truncate text-xl font-bold uppercase">{account.username}</p>
          <p className="text-xs text-primary">{account.properties.email}</p>
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

      <div className="h-0.5 bg-black shadow-lobby" />

      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <p className="text-lg font-bold">COINS</p>
          <div className="flex w-full gap-4">
            <StatisticsCard icon={<GoldCoinIcon />} value={statistics.totalCoins} name="Coins" />
            <StatisticsCard
              icon={<DiamondDMCurrencyIcon image />}
              value={statistics.totalDmCoinsEarned}
              name="DM Coins"
            />
          </div>
        </div>
      </div>

      <div className="h-0.5 bg-black shadow-lobby" />

      <div className="flex w-full flex-col gap-2">
        <p className="text-lg font-bold">PLAYER STATS</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <StatisticsCard
            icon={<Helmet2Icon className="h-2/3 w-2/3" />}
            value={statistics.createdAdventuresCount}
            name="Created adventures"
          />
          <StatisticsCard
            icon={<SwordsIcon className="h-2/3 w-2/3" />}
            value={statistics.createdCampaignsCount}
            name="Created campaigns"
          />
          <StatisticsCard
            icon={<Game color="#FF5A5A" variant="Bold" className="h-2/3 w-2/3" />}
            value={statistics.totalGamesPlayed}
            name="Games played"
          />
          <StatisticsCard
            icon={<Timer color="#FF5A5A" variant="Bold" className="h-2/3 w-2/3" />}
            value={statistics.totalGameplayHours.toFixed(2)}
            name="Hours played"
          />
        </div>
      </div>

      <div className="h-0.5 bg-black shadow-lobby" />

      <div className="flex w-full flex-col gap-2">
        <p className="text-lg font-bold">MASTER STATS</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <StatisticsCard
            icon={<Helmet2Icon className="h-2/3 w-2/3" />}
            value={statistics.createdAdventuresCount}
            name="Created adventures"
          />
          <StatisticsCard
            icon={<SwordsIcon className="h-2/3 w-2/3" />}
            value={statistics.createdCampaignsCount}
            name="Created campaigns"
          />
          <StatisticsCard
            icon={<Star1 color="#FF5A5A" variant="Bold" className="h-2/3 w-2/3" />}
            value={
              statistics.totalAdventureRatings === 0
                ? 0
                : statistics.averageAdventureRating + "(" + statistics.totalAdventureRatings + ")"
            }
            name="Avg. adventure rating"
          />
          <StatisticsCard
            icon={<People color="#FF5A5A" variant="Bold" className="h-2/3 w-2/3" />}
            value={statistics.totalAdventurePlayers}
            name="Adventure players"
          />
        </div>
      </div>
    </div>
  );
};

export default MobileMyAccount;
