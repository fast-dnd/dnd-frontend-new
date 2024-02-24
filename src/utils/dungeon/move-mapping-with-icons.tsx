import { AiFillHeart } from "react-icons/ai";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";

import { IMoveMapping } from "@/types/dungeon";

export const moveMappingWithIcons = (moveMapping: IMoveMapping) => {
  return [
    {
      header: "Heal action",
      text: moveMapping.discover_health,
      icon: (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-primary bg-primary/10">
          <AiFillHeart className="size-4 fill-primary" />
        </div>
      ),
    },
    {
      header: "Round bonus action",
      text: moveMapping.conversation_with_team,
      icon: (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-green-500 bg-primary/10">
          <GoPeople className="size-4 fill-green-500" />
        </div>
      ),
    },
    {
      header: "Mana action",
      text: moveMapping.discover_mana,
      icon: (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-info bg-primary/10">
          <HiSparkles className="size-4 fill-info" />
        </div>
      ),
    },
    {
      header: "Rest action",
      text: moveMapping.rest,
      icon: (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md border border-purple-400 bg-primary/10">
          <GiNightSleep className="size-4 fill-purple-400" />
        </div>
      ),
    },
  ];
};
