"use client";

import HowToPlay from "@/components/how-to-play";

import HomeMobileNavbar from "./components/home-mobile-navbar";
import Tabs from "./components/tabs";
import KingdomTabContent from "./components/tabs-content/kingdom-tab-content";
import PlayTabContent from "./components/tabs-content/play-tab-content";
import SettingsTabContent from "./components/tabs-content/settings-tab-content";
import { homeStore } from "./stores/tab-store";

const Home = () => {
  const homeTab = homeStore.homeTab.use();
  const kingdomTab = homeStore.kingdomTab.use();

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-y-auto lg:px-16 lg:pb-12">
      <HomeMobileNavbar />

      <Tabs type="home" selectedTab={homeTab} />

      <PlayTabContent homeTab={homeTab} />
      <KingdomTabContent homeTab={homeTab} kingdomTab={kingdomTab} />
      <SettingsTabContent homeTab={homeTab} />

      {homeTab === "HOW TO PLAY" && <HowToPlay />}
    </div>
  );
};

export default Home;
