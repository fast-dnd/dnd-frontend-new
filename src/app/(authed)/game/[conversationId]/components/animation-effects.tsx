import React from "react";

import { cn } from "@/utils/style-utils";

import { gameStore } from "../stores/game-store";

const AnimationEffects = () => {
  const changes = gameStore.changes.use();

  return (
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 left-0 h-full min-h-0 w-full overflow-hidden",
      )}
    >
      {["bg-gradient-to-r", "bg-gradient-to-l", "bg-gradient-to-t", "bg-gradient-to-b"].map(
        (dir) => (
          <React.Fragment key={dir}>
            <div
              className={cn(
                "absolute h-full w-full from-red-500 to-5% opacity-0 transition-all duration-500",
                dir,
                changes.lostHealth && "opacity-100",
              )}
            />
            <div
              className={cn(
                "absolute h-full w-full from-green-500 to-5% opacity-0 transition-all duration-500",
                dir,
                changes.gainedHealth && "opacity-100",
              )}
            />
          </React.Fragment>
        ),
      )}
    </div>
  );
};

export default AnimationEffects;
