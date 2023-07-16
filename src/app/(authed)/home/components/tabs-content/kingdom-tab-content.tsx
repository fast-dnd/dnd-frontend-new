import { cn } from "@/utils/style-utils";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

import { HomeTabType } from "../../types/home";
import AddDungeon from "../add-dungeon";
import Avatars from "../avatars";
import KingdomDungeons from "../kingdom-dungeons";

const KingdomTabContent = ({ homeTab }: { homeTab: HomeTabType }) => {
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
          title="MY DUNGEONS"
          className="mb-4 flex min-h-0 flex-1 flex-col gap-4 p-4 lg:mb-0 lg:gap-8 lg:p-8"
        >
          <KingdomDungeons />
          <AddDungeon />
        </Box>
      </div>
    </div>
  );
};

export default KingdomTabContent;
