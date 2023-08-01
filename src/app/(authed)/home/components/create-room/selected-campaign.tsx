import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ICampaign, IDungeon } from "@/types/dungeon";
import useGetCampaign from "@/hooks/use-get-campaign";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";

import { homeStore } from "../../stores/tab-store";
import CreateRoomDungeon from "./create-room-dungeon";

interface SelectedCampaignProps {
  selectedCampaign: ICampaign;
  dungeon: IDungeon | undefined;
  setDungeon: React.Dispatch<React.SetStateAction<IDungeon | undefined>>;
}

const SelectedCampaign = ({ selectedCampaign, dungeon, setDungeon }: SelectedCampaignProps) => {
  const router = useRouter();
  const { data: campaign, isLoading } = useGetCampaign(selectedCampaign._id);
  const [loadingEdit, setLoadingEdit] = useState(false);

  if (isLoading) {
    return (
      <div className="flex max-h-[350px] flex-1 flex-col gap-4 overflow-y-auto lg:max-h-full lg:pr-8">
        <Skeleton amount={3} />
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pr-0 lg:gap-8 lg:pr-4">
      <div className="flex flex-row gap-8 rounded-md border border-white/10 lg:border-0">
        <Image
          src={selectedCampaign.imageUrl || "/images/default-dungeon.png"}
          alt={selectedCampaign.name ?? "campaign"}
          width={180}
          height={180}
          className="hidden lg:block lg:h-[180px] lg:w-[180px]"
        />
        <div className="flex w-full flex-col gap-2 pr-4 lg:gap-4 lg:py-4">
          <div className="hidden flex-row justify-between lg:flex">
            <p className="order-1 truncate text-center text-lg font-medium uppercase leading-7 tracking-widest lg:text-left lg:text-[22px] lg:tracking-[0.15em]">
              {selectedCampaign.name}
            </p>
          </div>
          <p className="order-1 truncate text-center text-lg font-medium uppercase leading-7 tracking-widest lg:hidden lg:text-left lg:text-[22px] lg:tracking-[0.15em]">
            {selectedCampaign.name}
          </p>

          <p className="order-2 line-clamp-2 break-all pr-2 text-center text-lg font-light tracking-widest lg:order-3 lg:text-left">
            {selectedCampaign.description}
          </p>
        </div>
        {homeStore.subTab.get() === "owned" && (
          <Button
            isLoading={loadingEdit}
            variant="primary"
            className="h-9 w-full px-8 lg:h-14 lg:w-fit"
            onClick={() => {
              setLoadingEdit(true);
              router.push(`/create-campaign/${selectedCampaign._id}`);
            }}
          >
            EDIT
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-4 pl-4 pr-0 lg:gap-8 lg:pl-8 lg:pr-4">
        {campaign.dungeons.map((d) => (
          <CreateRoomDungeon
            dungeon={d as IDungeon}
            selectedDungeon={dungeon}
            setSelectedDungeon={setDungeon}
            key={d._id}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectedCampaign;
