import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { baseTabs, homeStore, KingdomTabType } from "../../stores/tab-store";
import Tabs from "../tabs";

const KingdomNavbar = ({ kingdomTab }: { kingdomTab: KingdomTabType }) => {
  return (
    <>
      <div className="hidden min-w-fit justify-between lg:flex">
        <Tabs type="kingdom" selectedTab={kingdomTab} />
      </div>

      <div className="block lg:hidden">
        <Select
          value={kingdomTab}
          onValueChange={(value) => homeStore.kingdomTab.set(value as KingdomTabType)}
        >
          <SelectTrigger className="w-full capitalize" aria-label="Select dungeon type">
            <SelectValue placeholder="Choose between adventures and campaigns" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {baseTabs.map((kingdomTab) => (
                <SelectItem key={kingdomTab} value={kingdomTab} className="capitalize">
                  {kingdomTab}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default KingdomNavbar;
