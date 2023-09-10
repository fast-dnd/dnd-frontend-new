import { Box } from "@/components/ui/box";

import Adventures from "./adventures";
import Campaigns from "./campaigns";
import GameHistory from "./game-history";
import Rewards from "./rewards";
import { tabsStore } from "./stores/tab-store";
import Tabs from "./tabs";

const MyCollection = () => {
  const activeTab = tabsStore.use();

  return (
    <Box title="MY COLLECTION" wrapperClassName="flex basis-2/3 pb-12" className="h-full p-8">
      <Tabs />

      {activeTab === "ADVENTURES" && <Adventures />}
      {activeTab === "CAMPAIGNS" && <Campaigns />}
      {activeTab === "GAME HISTORY" && <GameHistory />}
      {activeTab === "REWARDS" && <Rewards />}
    </Box>
  );
};

export default MyCollection;
