"use client";

import { useEffect, useState } from "react";
import { IDungeon } from "@/types/dnd";
import dndService, { IKingdom, IRoomData } from "@/services/dndService";
import { Mutex } from "async-mutex";

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

// current way to force fetch to happen only once, since useHome is being called multiple times from different components

class HomeState {
  private static init = false;
  private static mutex = new Mutex();

  private static _recommendedDungeons: IDungeon[];
  private static _myDungeons: IDungeon[];
  private static _roomHistory: IRoomData[];
  private static _kingdom: IKingdom | undefined;

  public static fetchData = async () => {
    await this.mutex.runExclusive(async () => {
      if (!this.init) {
        this.init = true;
        await dndService.getRecommendedDungeons().then((res) => {
          this._recommendedDungeons = res.data;
        });
        await dndService.getDungeons().then((res) => {
          this._myDungeons = res.data;
        });
        await dndService.getRooms().then((res) => {
          this._roomHistory = res.data.rooms;
        });
        await dndService.getKingdom().then((res) => {
          this._kingdom = res.data;
        });
      }
    });

    return {
      _recommendedDungeons: this._recommendedDungeons,
      _myDungeons: this._myDungeons,
      _roomHistory: this._roomHistory,
      _kingdom: this._kingdom,
    };
  };
}

export default useHome;
