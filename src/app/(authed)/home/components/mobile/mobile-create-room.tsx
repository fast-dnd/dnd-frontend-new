"use client";

import { useState } from "react";

import { cn } from "@/utils/style-utils";

import MobileAdventureDetail from "./mobile-adventure-detail";
import MobileAdventures from "./mobile-adventures";
import TabToggle from "./tab-toggle";

const MobileCreateRoom = ({
  adventureDetailId,
  setAdventureDetailId,
  closingId,
}: {
  adventureDetailId: string | undefined;
  setAdventureDetailId: React.Dispatch<React.SetStateAction<string | undefined>>;
  closingId?: string | undefined;
}) => {
  const [featuredOpened, setFeaturedOpened] = useState(false);
  const [opening, setOpening] = useState(false);

  return (
    <div className="mt-16 flex flex-col">
      <TabToggle />
      <MobileAdventures
        featured
        closingId={closingId}
        adventureDetailId={adventureDetailId}
        setAdventureDetailId={setAdventureDetailId}
        featuredOpened={featuredOpened}
        setFeaturedOpened={setFeaturedOpened}
        opening={opening}
        setOpening={setOpening}
      />
      <div className="h-0.5 w-full bg-black shadow-lobby" />
      <MobileAdventures
        closingId={closingId}
        adventureDetailId={adventureDetailId}
        setAdventureDetailId={setAdventureDetailId}
        featuredOpened={featuredOpened}
        setFeaturedOpened={setFeaturedOpened}
        opening={opening}
        setOpening={setOpening}
      />
      <MobileAdventureDetail adventureDetailId={adventureDetailId} />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 bg-dark-900 opacity-0 transition-all duration-500",
          adventureDetailId && "pointer-events-auto opacity-100",
        )}
      />
    </div>
  );
};

export default MobileCreateRoom;
