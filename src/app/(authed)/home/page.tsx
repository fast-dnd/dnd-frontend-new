"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/style-utils";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import HowToPlay from "@/components/how-to-play";

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

const Home = () => {
  const router = useRouter();
  const { homeTab, displayHowToPlay, setDisplayHowToPlay } = useHomeStore((state) => state);

  const [getMoreLoading, setGetMoreLoading] = useState(false);

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto lg:px-16 lg:pb-12">
      <HomeMobileNavbar />

      <div className="my-6 hidden items-center justify-center lg:flex">
        <Tabs homeOrDungeons="home" selectedTab={homeTab} />
      </div>

      {homeTab === "HOW TO PLAY" && <HowToPlay />}

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

      <div
        className={cn(
          "flex h-full min-h-0 flex-1 flex-col gap-12 overflow-y-auto px-5 lg:min-w-fit lg:flex-row lg:px-0",
          homeTab !== "MY KINGDOM" && "hidden",
        )}
      >
        <div className="flex h-full flex-1 basis-1/4">
          <Box
            title="MY AVATARS"
            className="flex min-h-0 flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8"
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
            className="mb-4 flex min-h-0 flex-1 flex-col gap-4 p-4 lg:mb-0 lg:gap-8 lg:p-8"
          >
            <Dungeons />
            <AddDungeon />
          </Box>
        </div>
      </div>

      <div
        className={cn(
          "flex min-h-0 flex-1 flex-row justify-center gap-12 px-5 lg:px-0",
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
