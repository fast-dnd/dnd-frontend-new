import Adventures from "@/components/common/adventures";
import GoBackButton from "@/components/common/go-back-button";
import { Box } from "@/components/ui/box";
import { IBaseDungeon } from "@/types/dungeon";

import { campaignFormStore } from "../stores/campaign-form-store";

const SelectAdventuresCard = ({ isEditing }: { isEditing: boolean }) => {
  const addedToCampaign = campaignFormStore.dungeons.use();

  const addToCampaign = (dungeon: IBaseDungeon) => {
    if (addedToCampaign.some((added) => added._id === dungeon._id)) {
      campaignFormStore.dungeons.set((dungeons) => dungeons.filter((d) => d._id !== dungeon._id));
    } else campaignFormStore.dungeons.set((dungeons) => [...dungeons, dungeon]);
  };

  return (
    <div className="flex h-full w-[65%]">
      <Box
        title={isEditing ? "EDIT Campaign" : "CREATE Campaign"}
        className="mb-4 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 lg:mb-0 lg:gap-6 lg:p-8"
        wrapperClassName="w-[95%] lg:w-full mx-auto"
      >
        <GoBackButton href="/profile?activeTab=CAMPAIGNS" />
        <div className="flex flex-row items-center justify-between gap-8">
          <p className="w-full text-lg font-semibold uppercase leading-7 tracking-[0.15em] lg:text-[22px]">
            CREATE CAMPAIGN <span className="text-white/50">/ SELECT ADVENTURES</span>
          </p>
        </div>
        <div className="hidden w-full border-t border-white/20 lg:block" />
        <Adventures addToCampaign={addToCampaign} addedToCampaign={addedToCampaign} />
      </Box>
    </div>
  );
};

export default SelectAdventuresCard;
