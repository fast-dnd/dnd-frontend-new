import { useEffect, useRef, useState } from "react";
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

  // 1. Access your sound settings
  const { soundEnabled, soundVolume } = useSoundSystem();

  // 2. A ref to hold our looping keyboard audio
  const keyboardAudioRef = useRef<HTMLAudioElement | null>(null);

  // Restore local sound prefs
  useEffect(() => {
    useSoundSystem.getState().hydrateFromLocalStorage();
  }, []);

  useEffect(() => {
    const onEvent = (event: IGameplaySocketEvent) => {
      switch (event.event) {
        case "ROUND_STORY_CHUNK": {
          setLastStory((prev) => `${prev}${event.data.chunk}`);
          if (soundEnabled) {
            // If we're not already playing the keyboard sound, create a new audio
            if (!keyboardAudioRef.current) {
              keyboardAudioRef.current = new Audio("/sounds/keyboard.mp3");
              keyboardAudioRef.current.loop = true;
              keyboardAudioRef.current.volume = soundVolume / 100;
              keyboardAudioRef.current.play().catch(console.error);
            }
          }
          gameStore.loadingText.set(true);
          break;
        }
        case "ROUND_STORY": {
          if (keyboardAudioRef.current) {
            keyboardAudioRef.current.pause();
            keyboardAudioRef.current.currentTime = 0;
            keyboardAudioRef.current = null;
          }

          if (soundEnabled) {
            const audio = new Audio("/sounds/drums.wav");
            audio.volume = soundVolume / 100;
            audio.play().catch(console.error);
          }
          queryClient.refetchQueries([roomKey, conversationId]).then(() => {
            setLastStory("");
            gameStore.loadingText.set(false);
          });
          break;
        }
        case "REQUEST_SENT_TO_DM": {
          if (event.data) {
            queryClient.setQueryData([roomKey, conversationId], roomDetailSchema.parse(event.data));
          }
          gameStore.loadingText.set(true);
          break;
        }
        case "GAME_ENDED": {
          if (keyboardAudioRef.current) {
            keyboardAudioRef.current.pause();
            keyboardAudioRef.current.currentTime = 0;
            keyboardAudioRef.current = null;
          }

          if (soundEnabled) {
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
      }
    };

    socketIO.on(conversationId, onEvent);

    return () => {
      socketIO.off(conversationId, onEvent);
    };
  }, [conversationId, lastStory, queryClient, soundEnabled, soundVolume]);

  return { lastStory };
};

export default useGameplaySocket;
