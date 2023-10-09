import GameHistory from "@/components/game-history";
import { Box } from "@/components/ui/box";

import CreateRoom from "./components/create-room";
import JoinRoom from "./components/join-room";

const Page = () => {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-12 overflow-y-auto px-5 pb-12 lg:flex-row lg:px-0">
      <CreateRoom />
      <div className="flex h-full w-1/4 flex-1 flex-col gap-12">
        <JoinRoom />
        <div className="flex min-h-0 flex-1 overflow-y-auto">
          <Box
            title="GAME HISTORY"
            wrapperClassName="w-full"
            className="mb-4 flex min-h-0 flex-1 lg:mb-0 lg:gap-8 lg:p-8"
          >
            <GameHistory />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Page;
