import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { baseTabs, BaseTabType, homeStore, subTabs, SubTabType } from "../../stores/tab-store";
import Tabs from "../tabs";

function CreateRoomNavbar() {
  const baseTab = homeStore.baseTab.use();
  const subTab = homeStore.subTab.use();

  return (
    <>
      <div className="hidden min-w-fit justify-between lg:flex">
        <Tabs
          type="base"
          selectedTab={baseTab}
          onTabClick={() => {
            homeStore.subTab.set("top");
          }}
        />
        <Tabs type="sub" selectedTab={subTab} />
      </div>
      <div className="block lg:hidden">
        <Select
          value={baseTab}
          onValueChange={(value) => homeStore.baseTab.set(value as BaseTabType)}
        >
          <SelectTrigger className="w-full capitalize" aria-label="Select dungeon type">
            <SelectValue placeholder="Choose between adventures and campaigns" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {baseTabs.map((baseTab) => (
                <SelectItem key={baseTab} value={baseTab} className="capitalize">
                  {baseTab}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select value={subTab} onValueChange={(value) => homeStore.subTab.set(value as SubTabType)}>
          <SelectTrigger className="w-full capitalize" aria-label="Select dungeon type">
            <SelectValue placeholder="Select adventure type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {subTabs.map((subTab) => (
                <SelectItem key={subTab} value={subTab} className="capitalize">
                  {subTab}
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
