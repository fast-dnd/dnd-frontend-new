"use client";

import { useEffect, useState } from "react";
import { DungeonTabType, HomeTabType } from "../types/home";
import { IDungeon } from "@/types/dnd";
import dndService from "@/services/dndService";

const useHome = () => {
  const [homeTab, setHomeTab] = useState<HomeTabType>("PLAY");
  const [dungeonTab, setDungeonTab] = useState<DungeonTabType>("MY DUNGEONS");
  const [dungeon, setDungeon] = useState<IDungeon>();

  const [recommendedDungeons, setRecommendedDungeons] = useState<IDungeon[]>(
    []
  );

  useEffect(() => {
    dndService
      .getRecommendedDungeons()
      .then((res) => setRecommendedDungeons(res.data));
  }, []);

  return {
    homeTab,
    setHomeTab,
    dungeonTab,
    setDungeonTab,
    dungeon,
    setDungeon,
    recommendedDungeons,
    setRecommendedDungeons,
  };
};

export default useHome;
