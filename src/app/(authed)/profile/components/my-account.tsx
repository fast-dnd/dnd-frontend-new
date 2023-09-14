"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Game, People, Star1, Timer } from "iconsax-react";
import { MdEdit } from "react-icons/md";

import useGetAccount from "@/hooks/use-get-account";
import { Box } from "@/components/ui/box";

const MyAccount = () => {
  const { data: account, isLoading } = useGetAccount();

  if (isLoading) return <div>Loading...</div>;

  if (!account) return <div>Something went wrong</div>;

  return (
    <Box title="MY ACCOUNT" wrapperClassName="flex basis-1/3 pb-12" className="p-8">
      <div className="flex flex-col gap-8">
        <div className="flex gap-4">
          <Image
            src={account.account.imageUrl || "/images/default-avatar.png"}
            width={120}
            height={120}
            alt="avatar"
            className="rounded-md"
          />
          <div className="flex flex-col gap-4">
            <p className="text-xl font-bold">{account.account.username}</p>
            <p>Level {account.account.level}</p>
            <Link
              className="flex w-fit items-center gap-2 rounded-md bg-white/5 px-3 py-2"
              href="/edit-profile"
            >
              <MdEdit />
              EDIT
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-4 gap-4">
          <StatisticsCard
            icon={<Image src="/images/dm-coin.png" alt="dm-coin" height={30} width={30} />}
            value={account.statistics.totalCoins}
            name="Coins"
          />
          <StatisticsCard
            icon={<Image src="/images/dm-coin.png" alt="dm-coin" height={30} width={30} />}
            value={account.statistics.totalDmCoinsEarned}
            name="DM Coins"
          />
          <StatisticsCard
            icon={icons.helmet}
            value={account.statistics.createdAdventuresCount}
            name="Created adventures"
          />
          <StatisticsCard
            icon={icons.swords}
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
          <StatisticsCard
            icon={<Game color="#FF5A5A" variant="Bold" />}
            value={account.statistics.totalGamesPlayed}
            name="Games played"
          />
          <StatisticsCard
            icon={<Timer color="#FF5A5A" variant="Bold" />}
            value={account.statistics.totalGameplayHours}
            name="Hours played"
          />
        </div>
      </div>
    </Box>
  );
};

export default MyAccount;

const StatisticsCard = ({
  icon,
  value,
  name,
}: {
  icon: React.ReactNode;
  value: string | number;
  name: string;
}) => {
  return (
    <div className="flex items-center gap-5 rounded-md bg-primary-900 px-4 py-6">
      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl font-bold">{value || "-- --"}</p>
        <p className="text-sm text-white/50">{name}</p>
      </div>
    </div>
  );
};

export const icons = {
  helmet: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.25 12.9168V17.9168L17.0833 16.2502L15.8333 13.7502C15.8333 13.7502 17.3838 10.2318 16.2342 7.12058C15.3709 4.78522 13.0294 3.65593 11.4169 2.87826C10.7926 2.57716 10.2776 2.32877 10 2.0835V11.6668L11.2112 9.54725C11.4929 9.05433 12.0171 8.75016 12.5846 8.75016C13.4583 8.75016 14.1667 9.45808 14.1667 10.3318V10.3322C14.1667 10.8997 13.8625 11.4239 13.3696 11.7056L11.25 12.9168ZM11.7887 6.78887C11.8668 6.71073 11.9728 6.66683 12.0833 6.66683C12.1938 6.66683 12.2998 6.71073 12.378 6.78887C12.4561 6.86701 12.5 6.97299 12.5 7.0835C12.5 7.194 12.4561 7.29998 12.378 7.37812C12.2998 7.45626 12.1938 7.50016 12.0833 7.50016C11.9728 7.50016 11.8668 7.45626 11.7887 7.37812C11.7106 7.29998 11.6667 7.194 11.6667 7.0835C11.6667 6.97299 11.7106 6.86701 11.7887 6.78887ZM13.4554 6.78887C13.5335 6.71073 13.6395 6.66683 13.75 6.66683C13.8605 6.66683 13.9665 6.71073 14.0446 6.78887C14.1228 6.86701 14.1667 6.97299 14.1667 7.0835C14.1667 7.194 14.1228 7.29998 14.0446 7.37812C13.9665 7.45626 13.8605 7.50016 13.75 7.50016C13.6395 7.50016 13.5335 7.45626 13.4554 7.37812C13.3772 7.29998 13.3333 7.194 13.3333 7.0835C13.3333 6.97299 13.3772 6.86701 13.4554 6.78887ZM15.122 6.78887C15.2002 6.71073 15.3062 6.66683 15.4167 6.66683C15.5272 6.66683 15.6332 6.71073 15.7113 6.78887C15.7894 6.86701 15.8333 6.97299 15.8333 7.0835C15.8333 7.194 15.7894 7.29998 15.7113 7.37812C15.6332 7.45626 15.5272 7.50016 15.4167 7.50016C15.3062 7.50016 15.2002 7.45626 15.122 7.37812C15.0439 7.29998 15 7.194 15 7.0835C15 6.97299 15.0439 6.86701 15.122 6.78887Z"
        fill="#FF5A5A"
        fillOpacity="0.7"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.74984 12.9168V17.9168L2.9165 16.2502L4.1665 13.7502C4.1665 13.7502 2.61609 10.2318 3.76567 7.12058C4.62893 4.78522 6.97044 3.65593 8.5829 2.87826C9.20721 2.57716 9.72223 2.32877 9.99984 2.0835V11.6668L8.78859 9.54725C8.50692 9.05433 7.98275 8.75016 7.41525 8.75016C6.5415 8.75016 5.83317 9.45808 5.83317 10.3318V10.3322C5.83317 10.8997 6.13734 11.4239 6.63025 11.7056L8.74984 12.9168ZM4.28854 6.78887C4.36668 6.71073 4.47266 6.66683 4.58317 6.66683C4.69368 6.66683 4.79966 6.71073 4.8778 6.78887C4.95594 6.86701 4.99984 6.97299 4.99984 7.0835C4.99984 7.194 4.95594 7.29998 4.8778 7.37812C4.79966 7.45626 4.69368 7.50016 4.58317 7.50016C4.47266 7.50016 4.36668 7.45626 4.28854 7.37812C4.2104 7.29998 4.1665 7.194 4.1665 7.0835C4.1665 6.97299 4.2104 6.86701 4.28854 6.78887ZM5.95521 6.78887C6.03335 6.71073 6.13933 6.66683 6.24984 6.66683C6.36034 6.66683 6.46632 6.71073 6.54446 6.78887C6.6226 6.86701 6.6665 6.97299 6.6665 7.0835C6.6665 7.194 6.6226 7.29998 6.54446 7.37812C6.46632 7.45626 6.36034 7.50016 6.24984 7.50016C6.13933 7.50016 6.03335 7.45626 5.95521 7.37812C5.87707 7.29998 5.83317 7.194 5.83317 7.0835C5.83317 6.97299 5.87707 6.86701 5.95521 6.78887ZM7.62188 6.78887C7.70002 6.71073 7.806 6.66683 7.9165 6.66683C8.02701 6.66683 8.13299 6.71073 8.21113 6.78887C8.28927 6.86701 8.33317 6.97299 8.33317 7.0835C8.33317 7.194 8.28927 7.29998 8.21113 7.37812C8.13299 7.45626 8.02701 7.50016 7.9165 7.50016C7.806 7.50016 7.70002 7.45626 7.62188 7.37812C7.54374 7.29998 7.49984 7.194 7.49984 7.0835C7.49984 6.97299 7.54374 6.86701 7.62188 6.78887Z"
        fill="#FF5A5A"
        fillOpacity="0.7"
      />
      <path
        d="M11.2112 9.54708L10 11.6667V1.25C10 1.25 11.4929 9.05417 11.2112 9.54708Z"
        fill="#FF5A5A"
      />
      <path
        d="M8.78879 9.54708L10 11.6667V1.25C10 1.25 8.50713 9.05417 8.78879 9.54708Z"
        fill="#FF5A5A"
        fillOpacity="0.5"
      />
    </svg>
  ),
  swords: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
      <path
        d="M5.24594 10.0217L8.64045 13.2007L7.28379 14.4716L8.64218 15.744L7.28411 17.0154L4.90793 14.79L2.19153 17.3332L0.833496 16.0618L3.5499 13.5186L1.17301 11.294L2.53103 10.0226L3.88873 11.293L5.24594 10.0217ZM1.35775 0.666504L4.76285 0.669516L16.1107 11.2935L17.4693 10.0226L18.8274 11.294L16.4508 13.519L19.1668 16.0618L17.8088 17.3332L15.0928 14.7904L12.7162 17.0154L11.3582 15.744L12.7156 14.472L1.36039 3.84109L1.35775 0.666504ZM15.2406 0.666594L18.6426 0.669516L18.6444 3.83686L14.7526 7.47933L11.357 4.30131L15.2406 0.666594Z"
        fill="#FF5A5A"
      />
    </svg>
  ),
};
