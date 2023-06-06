"use client";

import React from "react";
import { Box } from "@/components/ui/box";
import useHome from "./hooks/use-home";
import Tabs from "./components/tabs";
import { dungeonTabs, homeTabs } from "./types/home";
import Dungeons from "./components/dungeons";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GameHistory from "./components/game-history";
import Avatars from "./components/avatars";

// TODO: redirect to create-avatar if there are no avatars

const Home = () => {
  const {
    homeTab,
    setHomeTab,
    dungeonTab,
    setDungeonTab,
    dungeon,
    roomId,
    setRoomId,
    setDungeon,
    roomHistory,
    recommendedDungeons,
    myDungeons,
    kingdom,
    dungeonId,
    setDungeonId,
  } = useHome();

  return (
    <div className="flex flex-col w-full min-h-0 h-full px-16 pb-12">
      <div className="flex items-center justify-center my-16">
        <Tabs tabs={homeTabs} selectedTab={homeTab} setTab={setHomeTab} />
      </div>
      {homeTab === "PLAY" && (
        <div className="flex flex-row flex-1 min-w-fit min-h-0 h-full gap-12">
          <Box
            title="CREATE ROOM"
            className="p-8 flex flex-col min-h-0 flex-1 gap-8"
          >
            <Tabs
              tabs={dungeonTabs}
              selectedTab={dungeonTab}
              setTab={setDungeonTab}
              onTabClick={() => setDungeon(undefined)}
            />
            <Dungeons
              dungeons={
                dungeonTab === "TOP DUNGEONS" ? recommendedDungeons : myDungeons
              }
              selectedDungeon={dungeon}
              setDungeon={setDungeon}
            />
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-4 items-center text-white/50 cursor-pointer">
                <AiOutlineQuestionCircle className="text-2xl" />
                <p className="leading-7 tracking-[0.15em]  uppercase">
                  HOW TO PLAY
                </p>
              </div>
              <Button className="px-8 w-fit">CREATE</Button>
            </div>
          </Box>
          <div className="flex flex-col flex-1 basis-1/3 h-full min-w-fit gap-12">
            <Box title="JOIN ROOM" className="flex flex-col gap-8 p-8">
              <Input
                label="Room ID"
                onChange={(e) => setRoomId(e.target.value)}
              />
              <Button
                disabled={roomId.length === 0}
                variant={roomId ? "primary" : "outline"}
              >
                JOIN
              </Button>
            </Box>
            <div className="flex flex-1 min-h-0">
              <Box
                title="GAME HISTORY"
                className="flex min-h-0 flex-1 px-8 pt-8"
              >
                <GameHistory roomHistory={roomHistory} />
              </Box>
            </div>
          </div>
        </div>
      )}
      {homeTab === "MY KINGDOM" && (
        <div className="flex flex-row flex-1 min-w-fit min-h-0 h-full gap-12">
          <div className="flex h-full flex-1 basis-1/4">
            <Box
              title="MY AVATARS"
              className="flex flex-col flex-1 min-h-0 gap-8 p-8"
            >
              <Avatars kingdom={kingdom} />
              <Button disabled={true} variant={"outline"}>
                GET MORE
              </Button>
            </Box>
          </div>
          <div className="flex flex-1 basis-2/3">
            <Box
              title="MY DUNGEONS"
              className="flex flex-col flex-1 min-h-0 gap-8 p-8"
            >
              <Dungeons dungeons={myDungeons} />
              <div className="flex flex-row gap-8">
                <div className="flex flex-row gap-8 w-full">
                  <Input
                    placeholder="Enter dungeon ID..."
                    onChange={(e) => setDungeonId(e.target.value)}
                    className="h-12 m-0"
                  />
                  <Button
                    disabled={!dungeonId}
                    variant={dungeonId ? "primary" : "outline"}
                    className="w-fit px-4"
                  >
                    ADD
                  </Button>
                </div>
                <Button className="w-fit px-8">CREATE</Button>
              </div>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
};
// TODO: update "my kingdom" dungeons
export default Home;
