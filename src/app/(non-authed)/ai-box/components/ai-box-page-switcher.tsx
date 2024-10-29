import React, { useState } from "react";
import { useRouter } from "next/navigation";

const AiBoxPageSwitcher = ({
  selectedSection,
  onSelectSection,
}: {
  selectedSection: string;
  onSelectSection: Function;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();

  const sections = [
    { id: "daily", label: "Daily Box", icon: "🎁", path: "/ai-box/daily" },
    { id: "create", label: "Create Box", icon: "✍️", path: "/ai-box/create" },
    { id: "my", label: "My Boxes", icon: "📦", path: "/ai-box/collection" },
  ];

  const handleToggle = () => setIsCollapsed(!isCollapsed);

  const handleSectionClick = (sectionId: string, path: string) => {
    onSelectSection(sectionId); // Update the state if needed
    router.push(path); // Navigate to the new page
  };

  return (
    <div className={`ai-box-menu-switcher ${isCollapsed ? "collapsed" : ""}`}>
      <button className="ai-box-toggle-button" onClick={handleToggle}>
        {isCollapsed ? "<" : ">"}
      </button>
      {!isCollapsed && (
        <div className="ai-box-menu-items">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`ai-box-menu-item ${selectedSection === section.id ? "active" : ""}`}
              onClick={() => handleSectionClick(section.id, section.path)}
            >
              <span className="icon">{section.icon}</span>
              <span className="label">{section.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AiBoxPageSwitcher;
