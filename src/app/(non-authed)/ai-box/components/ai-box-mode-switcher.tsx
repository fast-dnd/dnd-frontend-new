import React, { useState } from "react";

const AiBoxModeSwitcher = ({
  selectedSection,
  onSelectSection,
}: {
  selectedSection: string;
  onSelectSection: Function;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sections = [
    { id: "daily", label: "Daily Box", icon: "🎁" },
    { id: "create", label: "Create Box", icon: "✍️" },
    { id: "my", label: "My Boxes", icon: "📦" },
  ];

  const handleToggle = () => setIsCollapsed(!isCollapsed);

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
              onClick={() => onSelectSection(section.id)}
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

export default AiBoxModeSwitcher;
