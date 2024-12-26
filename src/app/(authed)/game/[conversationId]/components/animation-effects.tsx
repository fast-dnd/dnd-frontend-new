import React, { useEffect } from "react";
import { useIsClient } from "usehooks-ts";

import { useSoundSystem } from "@/components/common/music-settings-modal/sound-system";
import { cn } from "@/utils/style-utils";

import { gameStore } from "../stores/game-store";

const AnimationEffects = () => {
  const { soundEnabled, soundVolume } = useSoundSystem();
  const statusUpdate = gameStore.statusUpdate.use();
  const isClient = useIsClient();

  useEffect(() => {
    useSoundSystem.getState().hydrateFromLocalStorage();
  }, []);

  useEffect(() => {
    if (!soundEnabled) return;
    if (statusUpdate.gainedHealth) {
      const audio = new Audio("/sounds/healing.wav");
      audio.volume = soundVolume / 100;
      audio.play().catch(console.error);
    } else if (statusUpdate.lostHealth) {
      const audio = new Audio("/sounds/punch.wav");
      audio.volume = soundVolume / 100;
      audio.play().catch(console.error);
    }
  }, [statusUpdate, soundEnabled, soundVolume]);

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-0 left-0 z-40 size-full min-h-0 overflow-hidden",
      )}
    >
      {["bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-t", "bg-gradient-to-b"].map(
        (dir) => (
          <React.Fragment key={dir}>
            <div
              className={cn(
                "absolute size-full from-red-500 to-5% opacity-0",
                isClient && "transition-all duration-500",
                dir,
                statusUpdate.lostHealth && "opacity-100",
              )}
            />
            <div
              className={cn(
                "absolute size-full from-green-500 to-5% opacity-0",
                isClient && "transition-all duration-500",
                dir,
                statusUpdate.gainedHealth && "opacity-100",
              )}
            />
          </React.Fragment>
        ),
      )}
    </div>
  );
};

export default AnimationEffects;
