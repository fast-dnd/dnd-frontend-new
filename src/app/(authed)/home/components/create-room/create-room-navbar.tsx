import { IDungeon } from "@/types/dnd";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useHomeStore } from "../../stores/tab-store";
import { dungeonTabs, DungeonTabType } from "../../types/home";
import Tabs from "../tabs";

function CreateRoomNavbar({
  setSelectedDungeon,
}: {
  setSelectedDungeon: React.Dispatch<React.SetStateAction<IDungeon | undefined>>;
}) {
  const { dungeonTab, setDungeonTab } = useHomeStore((state) => state);
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
          onValueChange={(value) => setDungeonTab(value as DungeonTabType)}
        >
          <SelectTrigger className="w-full capitalize">
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
