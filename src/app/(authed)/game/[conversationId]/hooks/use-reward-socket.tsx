import { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import { socketIO } from "@/lib/socket";
import { IReward } from "@/types/reward";

import { gameStore } from "../stores/game-store";
import { IRewardEvent } from "../types/events";

const useRewardSocket = (conversationId: string) => {
  const accountId = useReadLocalStorage<string>("accountId");

  const [reward, setReward] = useState<IReward>();

  useEffect(() => {
    const onEvent = (event: IRewardEvent) => {
      if (event.event === "REWARD_EARNED")
        if (event.data.accountId === accountId) {
          gameStore.reward.set(true);
          setReward(event.data.reward);
        }
    };
    socketIO.on(conversationId, onEvent);
    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [accountId, conversationId]);

  return { reward };
};

export default useRewardSocket;
