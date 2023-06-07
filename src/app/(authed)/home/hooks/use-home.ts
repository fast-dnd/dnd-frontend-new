"use client";

import { useEffect, useState } from "react";
import { DungeonTabType, HomeTabType } from "../types/home";
import { IDungeon } from "@/types/dnd";
import dndService, { IKingdom, IRoomData } from "@/services/dndService";

// TODO: maybe url query hometab & dungeontab

const useHome = () => {
  const [recommendedDungeons, setRecommendedDungeons] = useState<IDungeon[]>([]);
  const [myDungeons, setMyDungeons] = useState<IDungeon[]>([]);
  const [roomHistory, setRoomHistory] = useState<IRoomData[]>([]);
  const [kingdom, setKingdom] = useState<IKingdom | null>(null);

  useEffect(() => {
    async function fetchData() {
      await dndService.getRecommendedDungeons().then((res) => setRecommendedDungeons(res.data));
      await dndService.getDungeons().then((res) => setMyDungeons(res.data));
      await dndService.getRooms().then((res) => setRoomHistory(res.data.rooms));
      await dndService.getKingdom().then((res) => setKingdom(res.data));
    }
    fetchData();
  }, []);

  return {
    recommendedDungeons,
    myDungeons,
    roomHistory,
    kingdom,
  };
};

export default useHome;
