/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

import AiBoxModeSwitcher from "./ai-box-mode-switcher";
import OpenedBox from "./ai-box-opened";
import CreateBox from "./create-ai-box";
import MyBoxes from "./my-boxes";

const AiBoxSwitcher = () => {
  const [selectedSection, setSelectedSection] = useState("daily");

  const handleSelectSection = (section: string) => {
    setSelectedSection(section);
  };

  return (
    <div className="relative flex w-full p-6">
      <div className="mx-auto max-w-screen-xl	 flex-grow rounded-xl p-8 backdrop-blur-xl">
        {/* Glowing border effect */}
        <div className="absolute inset-0 bg-gradient-to-b to-transparent" />
        {selectedSection === "daily" && <OpenedBox />}
        {selectedSection === "create" && <CreateBox />}
        {selectedSection === "my" && <MyBoxes />}
      </div>

      {/* Right Side Half-Circle Menu */}
      <AiBoxModeSwitcher selectedSection={selectedSection} onSelectSection={handleSelectSection} />
    </div>
  );
};

export default AiBoxSwitcher;
