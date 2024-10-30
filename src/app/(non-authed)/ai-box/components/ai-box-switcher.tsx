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
    <div className="relative flex w-full ">
      <div className="mx-auto mt-10 max-w-screen-xl flex-grow rounded-xl">
        {/* Glowing border effect */}
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
