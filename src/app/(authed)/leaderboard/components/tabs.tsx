import { PenNib, Star } from "@phosphor-icons/react";
import { FaDice } from "react-icons/fa";

import useAuth from "@/hooks/helpers/use-auth";
import { cn } from "@/utils/style-utils";

import { RatingType } from "../types/rating-type";

interface ITabsProps {
  selectedRating: RatingType;
  setSelectedRating: React.Dispatch<React.SetStateAction<RatingType>>;
}

const Tabs = ({ selectedRating, setSelectedRating }: ITabsProps) => {
  const { user } = useAuth();

  const ratingTabValues = [
    {
      name: "gameplay",
      icon: <FaDice size={24} color={selectedRating === "gameplay" ? "#FF5A5A" : undefined} />,
      rank: user?.ranking.gameplay.rank ?? "-",
      text: "Gameplay Rating",
    },
    {
      name: "influencer",
      icon: (
        <Star
          size={24}
          weight="fill"
          color={selectedRating === "influencer" ? "#FF5A5A" : undefined}
        />
      ),
      rank: user?.ranking.influencer.rank ?? "-",
      text: "Influencer Rating",
    },
    {
      name: "contentCreation",
      icon: (
        <PenNib
          size={24}
          weight="fill"
          color={selectedRating === "contentCreation" ? "#FF5A5A" : undefined}
        />
      ),
      rank: user?.ranking.contentCreation.rank ?? "-",
      text: "Content Creation Rating",
    },
  ] as const;

  return (
    <div className="flex w-full">
      {ratingTabValues.map((ratingTabValue, index) => (
        <div
          key={index}
          className={cn(
            "relative flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-t-xl py-3",
            ratingTabValue.name === selectedRating &&
              "border-b-2 border-primary bg-black transition-all duration-200",
          )}
          onClick={() => setSelectedRating(ratingTabValue.name)}
        >
          {ratingTabValue.icon}
          <p className="text-3xl font-semibold lg:text-5xl">{ratingTabValue.rank}</p>
          <p className="text-center text-sm font-light lg:text-base">{ratingTabValue.text}</p>
          {ratingTabValue.name === selectedRating && (
            <div
              className={cn(
                "absolute bottom-0 left-1/2 z-20 h-0 w-0 -translate-x-1/2 translate-y-[100%] border-x-[8px] border-t-[10px] border-x-transparent border-t-primary",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
