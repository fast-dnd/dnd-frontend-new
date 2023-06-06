"use client";

import { useEffect, useState } from "react";
import { DungeonTabType, HomeTabType } from "../types/home";
import { IDungeon } from "@/types/dnd";
import dndService, { IRoomData } from "@/services/dndService";

const useHome = () => {
  const [homeTab, setHomeTab] = useState<HomeTabType>("PLAY");
  const [dungeonTab, setDungeonTab] = useState<DungeonTabType>("MY DUNGEONS");
  const [dungeon, setDungeon] = useState<IDungeon>();
  const [roomId, setRoomId] = useState<string>("");
  const [roomHistory, setRoomHistory] = useState<IRoomData[]>([]);

  const [recommendedDungeons, setRecommendedDungeons] = useState<IDungeon[]>(
    []
  );
  const [myDungeons, setMyDungeons] = useState<IDungeon[]>([]);

  useEffect(() => {
    dndService
      .getRecommendedDungeons()
      .then((res) => setRecommendedDungeons(res.data));
    dndService.getDungeons().then((res) => setMyDungeons(res.data));
    dndService.getRooms().then((res) => setRoomHistory(res.data.rooms));
  }, []);

  return {
    homeTab,
    setHomeTab,
    dungeonTab,
    setDungeonTab,
    dungeon,
    setDungeon,
    roomId,
    setRoomId,
    roomHistory,
    recommendedDungeons,
    myDungeons,
    setRecommendedDungeons,
  };
};

export default useHome;
