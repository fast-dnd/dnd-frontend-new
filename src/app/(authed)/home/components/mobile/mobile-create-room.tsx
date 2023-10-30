"use client";

import { useState } from "react";

import MobileAdventures from "./mobile-adventures";
import TabToggle from "./tab-toggle";

const MobileCreateRoom = ({
  adventureDetailId,
  setAdventureDetailId,
}: {
  adventureDetailId: string | undefined;
  setAdventureDetailId: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [featuredOpened, setFeaturedOpened] = useState(false);

  return (
    <div className="mt-16 flex flex-col">
      <TabToggle hide={!!adventureDetailId} />
      <MobileAdventures
        featured
        adventureDetailId={adventureDetailId}
        setAdventureDetailId={setAdventureDetailId}
        featuredOpened={featuredOpened}
        setFeaturedOpened={setFeaturedOpened}
      />
      <div className="h-[1px] w-full border-b border-white/[6%] bg-black"></div>
      <MobileAdventures
        adventureDetailId={adventureDetailId}
        setAdventureDetailId={setAdventureDetailId}
        featuredOpened={featuredOpened}
        setFeaturedOpened={setFeaturedOpened}
      />
    </div>
  );
};

export default MobileCreateRoom;
