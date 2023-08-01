import { useState } from "react";
import Image from "next/image";

import useCopy from "@/hooks/use-copy";
import useGetDungeon from "@/hooks/use-get-dungeon";
import Spinner from "@/components/ui/spinner";

import CampaignDungeonDesktopActions from "./campaign-dungeon-desktop-actions";

const CreateCampaignDungeon = ({
  dungeonId,
  onDelete,
}: {
  dungeonId: string;
  onDelete: () => void;
}) => {
  const { data: dungeon, isLoading } = useGetDungeon(dungeonId);
  const [copied, setCopied] = useCopy();

  const [showDesktopActions, setShowDesktopActions] = useState(true);

  const onCopy = () => {
    navigator.clipboard.writeText(dungeonId);
    setCopied(true);
  };

  if (isLoading)
    return (
      <div className="flex flex-row gap-8 rounded-md border border-white/10 p-4 pr-0 transition-all duration-300 hover:bg-white/5 lg:border-0">
        <Spinner />
      </div>
    );

  if (!dungeon)
    return (
      <div className="flex cursor-pointer flex-row gap-8 rounded-md border border-white/10 p-4 pr-0 transition-all duration-300 hover:bg-white/5 lg:border-0">
        Something went wrong.
      </div>
    );

  return (
    <div className="flex cursor-pointer flex-row gap-8 rounded-md border border-white/10 p-4 pr-0 transition-all duration-300 hover:bg-white/5 lg:border-0">
      <Image
        src={dungeon.imageUrl || "/images/default-dungeon.png"}
        alt={dungeon.name}
        width={90}
        height={90}
        className="hidden lg:block lg:h-[90px] lg:w-[90px]"
      />
      <div className="flex w-full flex-col gap-2 pr-4 lg:gap-4">
        <div className="flex">
          <div className="hidden flex-row justify-between lg:flex">
            <p className="order-1 truncate text-center text-lg font-medium uppercase leading-7 tracking-widest lg:text-left lg:text-[22px] lg:tracking-[0.15em]">
              {dungeon.name}
            </p>
          </div>
          <p className="order-1 truncate text-center text-lg font-medium uppercase leading-7 tracking-widest lg:hidden lg:text-left lg:text-[22px] lg:tracking-[0.15em]">
            {dungeon.name}
          </p>
          <CampaignDungeonDesktopActions
            copied={copied}
            onCopy={onCopy}
            showDesktopActions={showDesktopActions}
            onDelete={onDelete}
          />
        </div>

        <div className="order-4 flex flex-wrap gap-2 lg:gap-4">
          {dungeon.tags.map((tag) => (
            <div key={tag} className="border-[1.5px] border-white/25">
              <p className="px-1.5 py-1 text-sm capitalize leading-7 tracking-[2.4px] lg:px-3">
                {tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateCampaignDungeon;
