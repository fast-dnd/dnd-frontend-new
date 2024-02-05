import { PenNib, Star } from "@phosphor-icons/react";
import { FaDice } from "react-icons/fa";

import useGetLeaderboardMetrics from "@/hooks/queries/use-get-leaderboard-metrics";
import { cn } from "@/utils/style-utils";

import { LeaderboardMetricsType } from "../types/leaderboard-metrics-type";

interface ITabsProps {
  selectedLeaderboardMetric: LeaderboardMetricsType;
  setSelectedLeaderboardMetric: React.Dispatch<React.SetStateAction<LeaderboardMetricsType>>;
}

const Tabs = ({ selectedLeaderboardMetric, setSelectedLeaderboardMetric }: ITabsProps) => {
  const { data: leaderboardMetrics } = useGetLeaderboardMetrics();

  const leaderboardMetricsTabValues = [
    {
      name: "gameplay",
      icon: (
        <FaDice
          size={24}
          className={cn(
            "transition-all duration-200",
            selectedLeaderboardMetric === "gameplay" && "text-primary",
          )}
        />
      ),
      rank: leaderboardMetrics?.rating.gameplay ?? "-",
      text: "Gameplay Rating",
    },
    {
      name: "influencer",
      icon: (
        <Star
          size={24}
          weight="fill"
          className={cn(
            "transition-all duration-200",
            selectedLeaderboardMetric === "influencer" && "text-primary",
          )}
        />
      ),
      rank: leaderboardMetrics?.rating.influencer ?? "-",
      text: "Influencer Rating",
    },
    {
      name: "contentCreation",
      icon: (
        <PenNib
          size={24}
          weight="fill"
          className={cn(
            "transition-all duration-200",
            selectedLeaderboardMetric === "contentCreation" && "text-primary",
          )}
        />
      ),
      rank: leaderboardMetrics?.rating.contentCreation ?? "-",
      text: "Content Creation Rating",
    },
  ] as const;

  return (
    <div className="flex w-full">
      {leaderboardMetricsTabValues.map((leaderboardMetricsTabValue, index) => (
        <div
          key={index}
          className={cn(
            "relative flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-t-xl border-b-2 border-transparent py-3 transition-all duration-200",
            leaderboardMetricsTabValue.name === selectedLeaderboardMetric &&
              "border-primary bg-black",
          )}
          onClick={() => setSelectedLeaderboardMetric(leaderboardMetricsTabValue.name)}
        >
          {leaderboardMetricsTabValue.icon}
          <p className="text-3xl font-semibold lg:text-5xl">{leaderboardMetricsTabValue.rank}</p>
          <p className="text-center text-sm font-light lg:text-base">
            {leaderboardMetricsTabValue.text}
          </p>
          <div
            className={cn(
              "absolute bottom-0 left-1/2 z-20 h-0 w-0 -translate-x-1/2 translate-y-[100%] border-x-[8px] border-t-[10px] border-x-transparent border-t-primary opacity-0 transition-opacity duration-200",
              leaderboardMetricsTabValue.name === selectedLeaderboardMetric && "opacity-100",
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default Tabs;
