import { cn } from "@/utils/style-utils";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

import { HomeTabType, KingdomTabType } from "../../stores/tab-store";
import AddCampaign from "../add-campaign";
import AddDungeon from "../add-dungeon";
import Avatars from "../avatars";
import KingdomCampaigns from "../kingdom-campaigns";
import KingdomDungeons from "../kingdom-dungeons";
import KingdomNavbar from "../kingdom-dungeons/kingdom-navbar";
import KingdomRewards from "../kingdom-rewards";

const KingdomTabContent = ({
  homeTab,
  kingdomTab,
}: {
  homeTab: HomeTabType;
  kingdomTab: KingdomTabType;
}) => {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-1 flex-col gap-12 overflow-y-auto px-5 lg:min-w-fit lg:flex-row lg:px-0",
        homeTab !== "MY KINGDOM" && "hidden",
      )}
    >
      <div className="flex h-full flex-1 basis-1/4">
        <Box title="MY AVATARS" className="flex min-h-0 flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8">
          <Avatars />
          <Button href="/create-avatar">GET MORE</Button>
        </Box>
      </div>
      <div className="flex flex-1 basis-2/3">
        <Box
          title="MY COLLECTION"
          className="mb-4 flex min-h-0 flex-col gap-4 p-4 lg:mb-0 lg:flex-1 lg:gap-8 lg:p-8"
        >
          <KingdomNavbar kingdomTab={kingdomTab} />
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col gap-4 lg:gap-8",
              kingdomTab !== "dungeons" && "hidden",
            )}
          >
            <KingdomDungeons />
            <AddDungeon />
          </div>
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col gap-4 lg:gap-8",
              kingdomTab !== "campaigns" && "hidden",
            )}
          >
            <KingdomCampaigns />
            <AddCampaign />
          </div>
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col gap-4 lg:gap-8",
              kingdomTab !== "rewards" && "hidden",
            )}
          >
            <KingdomRewards />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default KingdomTabContent;
