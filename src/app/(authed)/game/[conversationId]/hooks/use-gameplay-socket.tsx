import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useSoundSystem } from "@/components/common/music-settings-modal/sound-system";
import { socketIO } from "@/lib/socket";
import { roomKey } from "@/services/room-service";
import { roomDetailSchema } from "@/validations/room";

import { gameStore } from "../stores/game-store";
import { IGameplaySocketEvent } from "../types/events";

const useGameplaySocket = (conversationId: string) => {
  const queryClient = useQueryClient();
  const [lastStory, setLastStory] = useState("");
  const { soundEnabled, soundVolume } = useSoundSystem();

  useEffect(() => {
    useSoundSystem.getState().hydrateFromLocalStorage();
  }, []);

  useEffect(() => {
    const onEvent = (event: IGameplaySocketEvent) => {
      switch (event.event) {
        case "ROUND_STORY_CHUNK":
          setLastStory(`${lastStory}${event.data.chunk}`);
          if (soundEnabled) {
            console.log("ROUND_STORY_CHUNK");
            const audio = new Audio("/sounds/keyboard.wav");
            audio.volume = soundVolume / 100;
            audio.play().catch(console.error);
          }

          gameStore.loadingText.set(true);
          break;
        case "REQUEST_SENT_TO_DM":
          if (event.data)
            queryClient.setQueryData([roomKey, conversationId], roomDetailSchema.parse(event.data));
          gameStore.loadingText.set(true);
          break;
        case "ROUND_STORY":
          if (soundEnabled) {
            console.log("ROUND_STORY");
            const audio = new Audio("/sounds/drums.wav");
            audio.volume = soundVolume / 100;
            audio.play().catch(console.error);
          }
          queryClient.refetchQueries([roomKey, conversationId]).then(() => {
            setLastStory("");
            gameStore.loadingText.set(false);
          });
          break;
        case "GAME_ENDED":
          if (soundEnabled) {
            console.log("GAME_ENDED");
            const audio = new Audio("/sounds/trumpet.wav");
            audio.volume = soundVolume / 100;
            audio.play().catch(console.error);
          }
          queryClient.refetchQueries([roomKey, conversationId]).then(() => {
            setLastStory("");
            gameStore.loadingText.set(false);
          });
          break;
      }
    };
    socketIO.on(conversationId, onEvent);

    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [conversationId, lastStory, queryClient]);

  return {
    lastStory,
  };
};

export default useGameplaySocket;
