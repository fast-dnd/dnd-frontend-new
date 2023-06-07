"use client";

import { useEffect, useState } from "react";
import { IDungeon } from "@/types/dnd";
import { IKingdom, IRoomData } from "@/services/dndService";
import HomeState from "../utils/home-state";

const useHome = () => {
  const [recommendedDungeons, setRecommendedDungeons] = useState<IDungeon[]>(
    []
  );
  const [myDungeons, setMyDungeons] = useState<IDungeon[]>([]);
  const [roomHistory, setRoomHistory] = useState<IRoomData[]>([]);
  const [kingdom, setKingdom] = useState<IKingdom>();

  useEffect(() => {
    async function fetchData() {
      const { _recommendedDungeons, _myDungeons, _roomHistory, _kingdom } =
        await HomeState.fetchData();
      setRecommendedDungeons(_recommendedDungeons);
      setMyDungeons(_myDungeons);
      setRoomHistory(_roomHistory);
      setKingdom(_kingdom);
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
