import { cn } from "@/utils/style-utils";

import { HomeTabType } from "../../stores/tab-store";
import Settings from "../settings";

const SettingsTabContent = ({ homeTab }: { homeTab: HomeTabType }) => {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-row justify-center gap-12 px-5 lg:px-0",
        homeTab !== "SETTINGS" && "hidden",
      )}
    >
      <Settings />
    </div>
  );
};

export default SettingsTabContent;
