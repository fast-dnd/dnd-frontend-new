"use client";

import { useState } from "react";

import MobileAdventures from "./mobile-adventures";
import TabToggle from "./tab-toggle";

const MobileCreateRoom = () => {
  const [adventureDetailId, setAdventureDetailId] = useState<string>();

  return (
    <div className="flex flex-col pt-4">
      <TabToggle />
      <MobileAdventures
        featured
        adventureDetailId={adventureDetailId}
        setAdventureDetailId={setAdventureDetailId}
      />
      <div className="h-[1px] w-full border-b border-white/[6%] bg-black"></div>
      <MobileAdventures
        adventureDetailId={adventureDetailId}
        setAdventureDetailId={setAdventureDetailId}
      />
    </div>
  );
};

export default MobileCreateRoom;
