"use client";

import { useState } from "react";

import MobileNavbar from "@/components/mobile-navbar";

import MyAccount from "./components/desktop/my-account";
import MyCollection from "./components/desktop/my-collection";
import { Tab } from "./components/desktop/my-collection/types/tab";
import MobileMyAccount from "./components/mobile/my-account";
import MobileMyCollection from "./components/mobile/my-collection";
import TabToggle from "./components/mobile/tab-toggle";

export const baseTabs = ["MY PROFILE", "MY COLLECTIONS"] as const;
export type BaseTab = (typeof baseTabs)[number];

const Profile = ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const activeTab = (searchParams?.activeTab ?? "ADVENTURES") as Tab;

  const [baseActiveTab, setBaseActiveTab] = useState<(typeof baseTabs)[number]>(baseTabs[0]);

  return (
    <>
      <div className="hidden min-h-0 flex-1 justify-between gap-12 pb-12 lg:flex">
        <MyCollection activeTab={activeTab} />
        <MyAccount />
      </div>

      <div className="flex flex-1 flex-col lg:hidden">
        <MobileNavbar />
        <div className="relative flex flex-1 flex-col gap-4 p-4">
          <TabToggle tabs={baseTabs} activeTab={baseActiveTab} setActiveTab={setBaseActiveTab} />
          {baseActiveTab === "MY PROFILE" ? <MobileMyAccount /> : <MobileMyCollection />}
        </div>
      </div>
    </>
  );
};

export default Profile;
