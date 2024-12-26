import Image from "next/image";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { useReadLocalStorage } from "usehooks-ts";

import { Dungeon } from "@/components/common/dungeon";
import useGetDungeon from "@/hooks/queries/use-get-dungeon";
import { IChampion } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";

import { Button, SoundEffect } from "../../ui/button";
import CreateHeroModal from "./components/create-hero-modal";
import { DungeonDetailSkeleton } from "./components/dungeon-detail-skeleton";

interface IDungeonDetailProps {
  dungeonDetailId: string;
  selectedChampion?: IChampion | undefined;
  takenChampions?: IChampion[];
  onChangeChampion?: (champion: IChampion) => void;
  addFavorite?: boolean;
  isOwned?: boolean;
  conversationId?: string;
}

const DungeonDetail = ({
  dungeonDetailId,
  selectedChampion,
  takenChampions,
  onChangeChampion,
  addFavorite,
  isOwned,
  conversationId,
}: IDungeonDetailProps) => {
  const { data: dungeon, isLoading } = useGetDungeon(dungeonDetailId ?? "");

  const customChampion = useReadLocalStorage<IChampion | null>("customChampion");

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
          <div className="w-full text-center text-2xl font-bold leading-9">
            SELECT YOUR CHARACTER
          </div>
        ) : (
          <p>CHARACTERS</p>
        )}
        <div className="mt-8 grid grid-cols-2 gap-4 px-6">
          {dungeon.champions.map((champion) => (
            <div
              key={champion._id}
              className={cn(
                "glass-effect",
                "flex min-w-0 basis-1/3 flex-col justify-between gap-4 rounded-md p-6 transition-all duration-200",
                champion.type === "nft" && "border-gold",
                champion._id === selectedChampion?._id && "border-primary bg-black/100",
              )}
            >
              <div className="flex items-center gap-4">
                {champion.type === "nft" ? (
                  <Image
                    src={champion.imageUrl || "/images/default-avatar.png"}
                    alt={champion.name}
                    width={48}
                    height={48}
                    className="size-24"
                  />
                ) : (
                  <Image
                    src={champion.imageUrl || "/images/default-avatar.png"}
                    alt={champion.name}
                    width={84}
                    height={84}
                    className="size-24 rounded-full"
                  />
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
                {onChangeChampion && (
                  <Button
                    variant="primary"
                    className="w-fit"
                    disabled={isTaken(champion)}
                    sound={SoundEffect.CLICK_ARROW}
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
          {conversationId && (
            <div
              className={cn(
                "glass-effect",
                "flex h-fit min-w-0 basis-1/3 flex-col justify-between gap-4 rounded-md p-6 transition-all duration-200",
                customChampion && "border-gold",
                customChampion?._id === selectedChampion?._id && " bg-black/100",
              )}
            >
              <div className="flex items-center gap-4">
                <Image
                  src={
                    customChampion && customChampion.imageUrl
                      ? customChampion.imageUrl
                      : "/images/default-avatar.png"
                  }
                  alt={customChampion ? customChampion.name : ""}
                  width={84}
                  height={84}
                  className="size-24 rounded-full"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex w-full justify-between">
                    <p className={cn("truncate text-xl font-semibold")}>
                      {customChampion ? customChampion.name : "CREATE YOUR OWN CHARACTER"}
                    </p>
                  </div>
                  <p className="line-clamp-3 font-light">
                    {customChampion
                      ? customChampion.description
                      : "Give your character distinctive traits and abilities to enhance the thrill and challenge of your gaming experience. Transform your play with a character that's truly your own."}
                  </p>
                </div>
              </div>
              {customChampion && <div className="flex flex-col gap-4"></div>}

              <CreateHeroModal
                conversationId={conversationId}
                onChangeChampion={onChangeChampion}
                selectedChampion={selectedChampion}
                takenChampions={takenChampions}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DungeonDetail;
