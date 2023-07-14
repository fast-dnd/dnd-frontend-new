import { cn } from "@/utils/style-utils";
import { Box } from "@/components/ui/box";

import { HomeTabType } from "../../types/home";
import CreateRoom from "../create-room";
import GameHistory from "../game-history";
import JoinRoom from "../join-room";

function PlayTabContent({ homeTab }: { homeTab: HomeTabType }) {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-1 flex-col gap-12 overflow-y-auto px-5 lg:min-w-fit lg:flex-row lg:px-0",
        homeTab !== "PLAY" && "hidden",
      )}
    >
      <Box title="CREATE ROOM" className="flex min-h-0 flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8">
        <CreateRoom />
      </Box>
      <div className="flex h-full flex-1 basis-1/3 flex-col gap-12 lg:min-w-fit">
        <JoinRoom />
        <div className="flex min-h-0 flex-1 overflow-y-auto">
          <Box
            title="GAME HISTORY"
            className="mb-4 flex min-h-0 flex-1 flex-col items-start gap-4 p-4 lg:mb-0 lg:gap-8 lg:p-8"
          >
            <GameHistory />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default PlayTabContent;
