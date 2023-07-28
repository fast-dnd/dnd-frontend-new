import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

import { ICampaign } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";

const CreateRoomCampaign = ({
  campaign,
  selectedCampaign,
  setSelectedCampaign,
}: {
  campaign: ICampaign;
  selectedCampaign: ICampaign | undefined;
  setSelectedCampaign: Dispatch<SetStateAction<ICampaign | undefined>>;
}) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer flex-row gap-8 rounded-md border border-white/10 p-4 pr-0 transition-all duration-300 hover:bg-white/5 lg:border-0",
        campaign === selectedCampaign && "bg-white/5",
      )}
      onClick={() => setSelectedCampaign(selectedCampaign === campaign ? undefined : campaign)}
    >
      <Image
        src={campaign.imageUrl || "/images/default-dungeon.png"}
        alt={campaign.name}
        width={180}
        height={180}
        className="hidden lg:block lg:h-[180px] lg:w-[180px]"
      />
      <div className="flex w-full flex-col gap-2 pr-4 lg:gap-4 lg:py-4">
        <div className="hidden flex-row justify-between lg:flex">
          <p className="order-1 truncate text-center text-lg font-medium uppercase leading-7 tracking-widest lg:text-left lg:text-[22px] lg:tracking-[0.15em]">
            {campaign.name}
          </p>
        </div>
        <p className="order-1 truncate text-center text-lg font-medium uppercase leading-7 tracking-widest lg:hidden lg:text-left lg:text-[22px] lg:tracking-[0.15em]">
          {campaign.name}
        </p>

        <p className="order-2 line-clamp-2 break-all pr-2 text-center text-lg font-light tracking-widest lg:order-3 lg:text-left">
          {campaign.description}
        </p>
      </div>
    </div>
  );
};

export default CreateRoomCampaign;
