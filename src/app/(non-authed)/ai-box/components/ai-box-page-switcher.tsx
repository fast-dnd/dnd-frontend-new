import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Tooltip } from "@/components/ui/tooltip"; // Import Tooltip component
import useAuth from "@/hooks/helpers/use-auth";

const AiBoxPageSwitcher = ({
  selectedSection,
  onSelectSection,
}: {
  selectedSection: string;
  onSelectSection: Function;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const { loggedIn } = useAuth(); // Get loggedIn status
  const pathname = usePathname();

  const sections = [
    { id: "daily", label: "Daily Box", icon: "🎁", path: "/ai-box/daily" },
    { id: "create", label: "Create Box", icon: "✍️", path: "/ai-box/create" },
    { id: "my", label: "My Boxes", icon: "📦", path: "/ai-box/collection" },
  ];

  const handleToggle = () => setIsCollapsed(!isCollapsed);

  const handleSectionClick = (sectionId: string, path: string, isDisabled: boolean) => {
    if (isDisabled) return; // Do nothing if the section is disabled
    if (pathname === path) return;
    onSelectSection(sectionId);
    router.push(path);
  };

  return (
    <div className={`ai-box-menu-switcher ${isCollapsed ? "collapsed" : ""}`}>
      <button className="ai-box-toggle-button" onClick={handleToggle}>
        {isCollapsed ? "<" : ">"}
      </button>
      {!isCollapsed && (
        <div className="ai-box-menu-items">
          {sections.map((section) => {
            // Determine if the section should be disabled
            const isDisabled = !loggedIn && (section.id === "create" || section.id === "my");

            // Define the content of each menu item
            const content = (
              <div
                key={section.id}
                className={`ai-box-menu-item ${selectedSection === section.id ? "active" : ""} ${
                  isDisabled ? "disabled" : ""
                }`}
                onClick={() => handleSectionClick(section.id, section.path, isDisabled)}
              >
                <span className="icon">{section.icon}</span>
                <span className="label">{section.label}</span>
              </div>
            );

            // Wrap disabled sections with Tooltip
            return isDisabled ? (
              <Tooltip content="Need to login to perform this action" key={section.id}>
                {content}
              </Tooltip>
            ) : (
              content
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AiBoxPageSwitcher;
