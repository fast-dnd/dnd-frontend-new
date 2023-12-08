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
  const { rating } = useAuth();

  const ratingTabValues = [
    {
      name: "gameplay",
      icon: (
        <FaDice
          size={24}
          className={cn(
            "transition-all duration-200",
            selectedRating === "gameplay" && "text-primary",
          )}
        />
      ),
      rank: rating?.rating.gameplay ?? "-",
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
            selectedRating === "influencer" && "text-primary",
          )}
        />
      ),
      rank: rating?.rating.influencer ?? "-",
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
            selectedRating === "contentCreation" && "text-primary",
          )}
        />
      ),
      rank: rating?.rating.contentCreation ?? "-",
      text: "Content Creation Rating",
    },
  ] as const;

  return (
    <div className="flex w-full">
      {ratingTabValues.map((ratingTabValue, index) => (
        <div
          key={index}
          className={cn(
            "relative flex flex-1 cursor-pointer flex-col items-center gap-2 rounded-t-xl border-b-2 border-transparent py-3 transition-all duration-200",
            ratingTabValue.name === selectedRating && "border-primary bg-black",
          )}
          onClick={() => setSelectedRating(ratingTabValue.name)}
        >
          {ratingTabValue.icon}
          <p className="text-3xl font-semibold lg:text-5xl">{ratingTabValue.rank}</p>
          <p className="text-center text-sm font-light lg:text-base">{ratingTabValue.text}</p>
          <div
            className={cn(
              "absolute bottom-0 left-1/2 z-20 h-0 w-0 -translate-x-1/2 translate-y-[100%] border-x-[8px] border-t-[10px] border-x-transparent border-t-primary opacity-0 transition-opacity duration-200",
              ratingTabValue.name === selectedRating && "opacity-100",
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default Tabs;
