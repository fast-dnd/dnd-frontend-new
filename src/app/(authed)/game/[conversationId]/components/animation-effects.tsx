import React from "react";
import { useIsClient } from "usehooks-ts";

import { cn } from "@/utils/style-utils";

import { gameStore } from "../stores/game-store";

const AnimationEffects = () => {
  const statusUpdate = gameStore.statusUpdate.use();
  const isClient = useIsClient();

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
