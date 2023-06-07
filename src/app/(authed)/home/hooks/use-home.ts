"use client";

import { useEffect, useState } from "react";
import { IDungeon } from "@/types/dnd";
import { IKingdom, IRoomData } from "@/services/dndService";
import HomeState from "../utils/home-state";
import { useRouter } from "next/navigation";

const useHome = () => {
  const [recommendedDungeons, setRecommendedDungeons] = useState<IDungeon[]>(
    []
  );
  const [myDungeons, setMyDungeons] = useState<IDungeon[]>([]);
  const [roomHistory, setRoomHistory] = useState<IRoomData[]>([]);
  const [kingdom, setKingdom] = useState<IKingdom>();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const { _recommendedDungeons, _myDungeons, _roomHistory, _kingdom } =
        await HomeState.fetchData();
      setRecommendedDungeons(_recommendedDungeons);
      setMyDungeons(_myDungeons);
      setRoomHistory(_roomHistory);
      setKingdom(_kingdom);
      if (_kingdom?.avatars.length === 0) router.push("/create-avatar");
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
