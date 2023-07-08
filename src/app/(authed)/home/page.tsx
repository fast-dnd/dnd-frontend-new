"use client";

import HowToPlay from "@/components/how-to-play";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/style-utils";
import { useRouter } from "next/navigation";
import AddDungeon from "./components/add-dungeon";
import Avatars from "./components/avatars";
import CreateRoom from "./components/create-room";
import Dungeons from "./components/dungeons";
import GameHistory from "./components/game-history";
import HomeMobileNavbar from "./components/home-mobile-navbar";
import JoinRoom from "./components/join-room";
import Settings from "./components/settings";
import Tabs from "./components/tabs";
import { useHomeStore } from "./stores/tab-store";
import { useState } from "react";

const Home = () => {
  const router = useRouter();
  const { homeTab, displayHowToPlay, setDisplayHowToPlay } = useHomeStore((state) => state);

  const [getMoreLoading, setGetMoreLoading] = useState(false);

  return (
    <div className="flex flex-col w-full min-h-0 h-full md:px-16 md:pb-12 overflow-y-auto">
      <HomeMobileNavbar />

      <div className="hidden md:flex items-center justify-center my-6">
        <Tabs homeOrDungeons="home" selectedTab={homeTab} />
      </div>

      {homeTab === "HOW TO PLAY" && <HowToPlay />}

      <div
        className={cn(
          "px-5 md:px-0 flex flex-col md:flex-row flex-1 md:min-w-fit min-h-0 h-full gap-12 overflow-y-auto",
          homeTab !== "PLAY" && "hidden",
        )}
      >
        <Box title="CREATE ROOM" className="flex flex-col min-h-0 flex-1 gap-4 p-4 md:gap-8 md:p-8">
          <CreateRoom />
        </Box>
        <div className="flex flex-col flex-1 basis-1/3 h-full md:min-w-fit gap-12">
          <JoinRoom />
          <div className="flex flex-1 min-h-0 overflow-y-auto">
            <Box
              title="GAME HISTORY"
              className="flex flex-col items-start min-h-0 flex-1 gap-4 p-4 md:gap-8 md:p-8 mb-4 md:mb-0"
            >
              <GameHistory />
            </Box>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "px-5 md:px-0 flex flex-col md:flex-row flex-1 md:min-w-fit min-h-0 h-full gap-12 overflow-y-auto",
          homeTab !== "MY KINGDOM" && "hidden",
        )}
      >
        <div className="flex h-full flex-1 basis-1/4">
          <Box
            title="MY AVATARS"
            className="flex flex-col flex-1 min-h-0 gap-4 p-4 md:gap-8 md:p-8"
          >
            <Avatars />
            <Button
              isLoading={getMoreLoading}
              onClick={() => {
                setGetMoreLoading(true);
                router.push("/create-avatar");
              }}
            >
              GET MORE
            </Button>
          </Box>
        </div>
        <div className="flex flex-1 basis-2/3">
          <Box
            title="MY DUNGEONS"
            className="flex flex-col flex-1 min-h-0 gap-4 md:gap-8 p-4 md:p-8 mb-4 md:mb-0"
          >
            <Dungeons />
            <AddDungeon />
          </Box>
        </div>
      </div>

      <div
        className={cn(
          "px-5 md:px-0 flex flex-row flex-1 justify-center min-h-0 gap-12",
          homeTab !== "SETTINGS" && "hidden",
        )}
      >
        <Settings />
      </div>
    </div>
  );
};
// TODO: update "my kingdom" dungeons
export default Home;
