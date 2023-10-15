import { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";

import { Dungeon } from "@/components/dungeon";
import Skeleton from "@/components/ui/skeleton";
import useGetDungeon from "@/hooks/use-get-dungeon";
import { IChampion, IMoveMapping } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";

import { Button } from "./ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface IDungeonDetailProps {
  dungeonDetailId: string;
  selectedChampion?: IChampion | undefined;
  takenChampions?: IChampion[];
  onChangeChampion?: (champion: IChampion) => void;
}

const DungeonDetail = ({
  dungeonDetailId,
  selectedChampion,
  takenChampions,
  onChangeChampion,
}: IDungeonDetailProps) => {
  const { data: dungeon, isLoading } = useGetDungeon(dungeonDetailId ?? "");

  const [showActionsId, setShowActionsId] = useState<string>();

  if (isLoading) return <DungeonDetailSkeleton />;

  if (!dungeon) return <div>Something went wrong</div>;

  const isTaken = (champion: IChampion) =>
    takenChampions?.some((champ) => champ._id === champion._id) ?? false;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto border-b-2 border-b-white/20 pr-4">
      <Dungeon dungeon={dungeon} />

      <div className="my-8">
        <p>CHARACTERS</p>
        <div className="mt-8 flex flex-col gap-12 px-6">
          {dungeon.champions.map((champion) => (
            <div
              key={champion._id}
              className={cn(
                "flex flex-col gap-4 rounded-md border-2 border-white bg-white/10 p-6 transition-all duration-200",
                champion._id === selectedChampion?._id && "border-primary",
              )}
            >
              <p className="truncate text-xl font-semibold">{champion.name}</p>
              <p className="truncate font-light">{champion.description}</p>
              <Collapsible
                open={showActionsId === champion._id}
                onOpenChange={(isOpen) => setShowActionsId(isOpen ? champion._id : undefined)}
                className="space-y-2"
              >
                <CollapsibleTrigger className="flex items-center gap-2 font-medium tracking-wide">
                  ACTIONS
                  <FaChevronDown
                    className={cn(
                      "transition-all duration-200",
                      showActionsId === champion._id && "rotate-180",
                    )}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="grid grid-cols-2 gap-4">
                    {moveMappingWithIcons(champion.moveMapping).map((move, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10">
                          {move.icon}
                        </div>
                        <p className="truncate">{move.text}</p>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
              {onChangeChampion && (
                <Button
                  variant={champion._id === selectedChampion?._id ? "primary" : "outline"}
                  className="w-fit"
                  disabled={isTaken(champion)}
                  onClick={() => onChangeChampion(champion)}
                >
                  {isTaken(champion)
                    ? "TAKEN"
                    : champion._id === selectedChampion?._id
                    ? "SELECTED"
                    : "CHOOSE THIS CHARACTER"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DungeonDetail;

const moveMappingWithIcons = (moveMapping: IMoveMapping) => {
  return [
    {
      text: moveMapping.discover_health,
      icon: <AiFillHeart className="h-5 w-5 fill-primary" />,
    },
    {
      text: moveMapping.conversation_with_team,
      icon: <GoPeople className="h-5 w-5 fill-green-500" />,
    },
    {
      text: moveMapping.discover_mana,
      icon: <HiSparkles className="h-5 w-5 fill-info" />,
    },
    {
      text: moveMapping.rest,
      icon: <GiNightSleep className="h-5 w-5 fill-purple-400" />,
    },
  ];
};

export const DungeonDetailSkeleton = () => {
  return (
    <div className="flex w-full flex-1 flex-col overflow-y-auto border-b-2 border-b-white/20 pr-4">
      <Skeleton />
      <div className="my-8">
        <div className="mb-1 h-5 w-16 rounded-lg bg-gray-600" />
        <div className="mt-8 flex flex-col gap-12 px-6">
          {Array.from(
            {
              length: 2,
            },
            (_, i) => (
              <div key={i} className={cn("flex animate-pulse flex-col gap-4 p-6")}>
                <div className="h-6 w-64 rounded-full bg-gray-600" />
                <div className="h-5 w-48 rounded-full bg-gray-600" />

                <div className="flex flex-col gap-4">
                  <div className="h-4 w-32 rounded-full bg-gray-600" />
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from(
                      {
                        length: 4,
                      },
                      (_, i) => (
                        <div key={i} className="h-4 w-64 rounded-full bg-gray-600" />
                      ),
                    )}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};
