import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

import { Dungeon } from "@/components/common/dungeon";
import Skeleton from "@/components/ui/skeleton";
import useGetDungeon from "@/hooks/queries/use-get-dungeon";
import { IChampion } from "@/types/dungeon";
import { moveMappingWithIcons } from "@/utils/dungeon/move-mapping-with-icons";
import { cn } from "@/utils/style-utils";

import HelmetIcon from "../icons/helmet-icon";
import { Button } from "../ui/button";

interface IDungeonDetailProps {
  dungeonDetailId: string;
  selectedChampion?: IChampion | undefined;
  takenChampions?: IChampion[];
  onChangeChampion?: (champion: IChampion) => void;
  addFavorite?: boolean;
  isOwned?: boolean;
}

const DungeonDetail = ({
  dungeonDetailId,
  selectedChampion,
  takenChampions,
  onChangeChampion,
  addFavorite,
  isOwned,
}: IDungeonDetailProps) => {
  const { data: dungeon, isLoading } = useGetDungeon(dungeonDetailId ?? "");

  if (isLoading) return <DungeonDetailSkeleton />;

  if (!dungeon) return <div>Something went wrong</div>;

  const isTaken = (champion: IChampion) =>
    takenChampions?.some((champ) => champ._id === champion._id) ?? false;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto border-b-2 border-b-white/20 pr-4">
      <Dungeon dungeon={dungeon} addFavorite={addFavorite} />

      <div className="flex w-full items-center justify-center"></div>

      <div className="my-8">
        {onChangeChampion ? (
          <div className="w-full text-center text-2xl font-bold leading-9">SELECT YOUR HERO</div>
        ) : (
          <p>CHARACTERS</p>
        )}
        <div className="mt-8 grid grid-cols-2 gap-4 px-6">
          {dungeon.champions.map((champion) => (
            <div
              key={champion._id}
              className={cn(
                "flex min-w-0 basis-1/3 flex-col justify-between gap-4 rounded-md border-2 border-white bg-white/10 p-6 transition-all duration-200",
                champion.type === "nft" && "border-gold",
                champion._id === selectedChampion?._id && "border-primary bg-black/50",
              )}
            >
              <div className="flex items-center gap-4">
                {champion.type === "nft" ? (
                  <Image
                    src={champion.imageUrl || "/images/default-avatar.png"}
                    alt={champion.name}
                    width={48}
                    height={48}
                    className="h-24 w-24"
                  />
                ) : (
                  <HelmetIcon className="shrink-0" />
                )}
                <div className="flex flex-col gap-1">
                  <div className="flex w-full justify-between">
                    <p
                      className={cn(
                        "truncate text-xl font-semibold",
                        champion.type === "nft" && "text-gold",
                      )}
                    >
                      {champion.name}
                    </p>
                    {champion.type === "nft" && (
                      <Link
                        className="flex items-center gap-1 rounded-md border border-dashed border-gold bg-gold/10 fill-gold px-3 py-1.5 font-semibold text-gold"
                        href={champion.link || "#"}
                      >
                        NFT
                        <FiExternalLink />
                      </Link>
                    )}
                  </div>
                  <p title={champion.description} className="line-clamp-3 font-light">
                    {champion.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-medium tracking-wide">ACTIONS</p>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                  {moveMappingWithIcons(champion.moveMapping).map((move, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {move.icon}
                      <div className="flex h-[72px] items-center">
                        <p className="line-clamp-3 font-light hover:line-clamp-4">{move.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {onChangeChampion && (
                  <Button
                    variant="primary"
                    className="w-fit"
                    disabled={isTaken(champion)}
                    onClick={() => onChangeChampion(champion)}
                  >
                    {isTaken(champion)
                      ? "TAKEN"
                      : champion._id === selectedChampion?._id
                      ? "SELECTED"
                      : "SELECT THIS CHARACTER"}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DungeonDetail;

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
