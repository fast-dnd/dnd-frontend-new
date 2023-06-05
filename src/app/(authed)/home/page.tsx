"use client";

import React from "react";
import { Box } from "@/components/ui/box";
import useHome from "./hooks/use-home";
import Tabs from "./components/tabs";
import { dungeonTabs, homeTabs } from "./types/home";
import Dungeons from "./components/dungeons";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Button } from "@/components/ui/button";

const Home = () => {
  const {
    homeTab,
    setHomeTab,
    dungeonTab,
    setDungeonTab,
    dungeon,
    setDungeon,
    recommendedDungeons,
  } = useHome();

  return (
    <div className="flex flex-col w-full min-h-0 px-16 pb-12">
      <div className="flex items-center justify-center my-16">
        <Tabs tabs={homeTabs} selectedTab={homeTab} setTab={setHomeTab} />
      </div>
      <div className="flex flex-row flex-1 min-h-0 gap-12">
        <Box
          title="CREATE ROOM"
          className="p-8 flex flex-col min-h-0 flex-1 gap-8"
        >
          <Tabs
            tabs={dungeonTabs}
            selectedTab={dungeonTab}
            setTab={setDungeonTab}
          />
          <Dungeons
            dungeons={recommendedDungeons}
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
        <div className="flex flex-col gap-12">
          <Box title="JOIN ROOM"></Box>
        </div>
      </div>
    </div>
  );
};

export default Home;
