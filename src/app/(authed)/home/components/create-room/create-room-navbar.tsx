import { IDungeon } from "@/types/dungeon";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { dungeonTabs, DungeonTabType, homeStore } from "../../stores/tab-store";
import Tabs from "../tabs";

function CreateRoomNavbar({
  setSelectedDungeon,
}: {
  setSelectedDungeon: React.Dispatch<React.SetStateAction<IDungeon | undefined>>;
}) {
  const dungeonTab = homeStore.dungeonTab.use();

  return (
    <>
      <Tabs
        homeOrDungeons="dungeon"
        selectedTab={dungeonTab}
        onTabClick={() => setSelectedDungeon(undefined)}
      />
      <div className="block lg:hidden">
        <Select
          value={dungeonTab}
          onValueChange={(value) => homeStore.dungeonTab.set(value as DungeonTabType)}
        >
          <SelectTrigger className="w-full capitalize" aria-label="Select dungeon type">
            <SelectValue placeholder="Select dungeons type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {dungeonTabs.map((dungeonTab) => (
                <SelectItem key={dungeonTab} value={dungeonTab} className="capitalize">
                  {dungeonTab}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}

export default CreateRoomNavbar;
