"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style-utils";
import AddDungeon from "./components/add-dungeon";
import Avatars from "./components/avatars";
import CreateRoom from "./components/create-room";
import Dungeons from "./components/dungeons";
import GameHistory from "./components/game-history";
import JoinRoom from "./components/join-room";
import Tabs from "./components/tabs";
import { useTabStore } from "./stores/tab-store";

const Home = () => {
  const { homeTab } = useTabStore((state) => state);

  return (
    <div className="flex flex-col w-full min-h-0 h-full px-16 pb-12">
      <div className="flex items-center justify-center my-16">
        <Tabs homeOrDungeons="home" selectedTab={homeTab} />
      </div>

      <div
        className={cn(
          "flex flex-row flex-1 min-w-fit min-h-0 h-full gap-12",
          homeTab !== "PLAY" && "hidden",
        )}
      >
        <Box title="CREATE ROOM" className="p-8 flex flex-col min-h-0 flex-1 gap-8">
          <CreateRoom />
        </Box>
        <div className="flex flex-col flex-1 basis-1/3 h-full min-w-fit gap-12">
          <JoinRoom />
          <div className="flex flex-1 min-h-0">
            <Box
              title="GAME HISTORY"
              className="flex flex-col items-start min-h-0 flex-1 px-8 pt-8 gap-8"
            >
              <GameHistory />
            </Box>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "flex flex-row flex-1 min-w-fit min-h-0 h-full gap-12",
          homeTab !== "MY KINGDOM" && "hidden",
        )}
      >
        <div className="flex h-full flex-1 basis-1/4">
          <Box title="MY AVATARS" className="flex flex-col flex-1 min-h-0 gap-8 p-8">
            <Avatars />
            <Button disabled={true} variant={"outline"}>
              GET MORE
            </Button>
          </Box>
        </div>
        <div className="flex flex-1 basis-2/3">
          <Box title="MY DUNGEONS" className="flex flex-col flex-1 min-h-0 gap-8 p-8">
            <Dungeons />
            <AddDungeon />
          </Box>
        </div>
      </div>
    </div>
  );
};
// TODO: update "my kingdom" dungeons
export default Home;
