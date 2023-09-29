import { useEffect, useState } from "react";

import { IReward } from "@/types/reward";
import { socketIO } from "@/lib/socket";

import { IRewardEvent } from "../types/events";

const useRewardSocket = (conversationId: string) => {
  const [reward, setReward] = useState<IReward>();
  useEffect(() => {
    const onEvent = (event: IRewardEvent) => {
      if (event.event === "REWARD_EARNED")
        if (event.data.accountId === localStorage.getItem("accountId")) {
          setReward(event.data.reward);
        }
    };
    socketIO.on(conversationId, onEvent);
    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [conversationId]);

  return { reward };
};

export default useRewardSocket;
