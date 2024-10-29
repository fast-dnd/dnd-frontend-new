/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import OpenedBox from "./ai-box-opened";
import AiBoxPageSwitcher from "./ai-box-page-switcher";
import CreateBox from "./create-ai-box";
import MyBoxes from "./my-boxes";

interface AiBoxSwitcherProps {
  state?: string;
  boxId?: string;
}

const AiBoxSwitcher: React.FC<AiBoxSwitcherProps> = ({ state = "open", boxId }) => {
  const [selectedSection, setSelectedSection] = useState(state);

  const handleSelectSection = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <div className="relative flex w-full p-6">
      <div className="mx-auto max-w-screen-xl	 flex-grow rounded-xl p-8 backdrop-blur-xl">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-b to-transparent" />
        {selectedSection === "open" && <OpenedBox boxId={boxId} />}
        {selectedSection === "create" && <CreateBox />}
        {selectedSection === "my" && <MyBoxes />}
      </div>

      {/* Right Side Half-Circle Menu */}
      <AiBoxPageSwitcher selectedSection={selectedSection} onSelectSection={handleSelectSection} />
    </div>
  );
};

export default AiBoxSwitcher;
