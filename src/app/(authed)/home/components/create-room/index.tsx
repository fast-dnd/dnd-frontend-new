import { useState } from "react";

import Adventures from "@/components/adventures";
import CampaignDetail from "@/components/campaign-detail";
import Campaigns from "@/components/campaigns";
import DungeonDetail from "@/components/dungeon-detail";
import GoBackButton from "@/components/go-back-button";
import { Box } from "@/components/ui/box";

import AddFavoriteFooter from "./add-favorite-footer";
import CreateRoomFooter from "./create-room-footer";
import { tabStore } from "./store/tab-store";
import Tabs from "./tabs";

const CreateRoom = () => {
  const subTab = tabStore.subTab.use();

  const activeBaseTab = tabStore.baseTab.use();

  const [dungeonDetailId, setDungeonDetailId] = useState<string>();
  const [campaignDetailId, setCampaignDetailId] = useState<string>();

  const onGoBack = () => {
    if (dungeonDetailId && campaignDetailId) setDungeonDetailId(undefined);
    else if (dungeonDetailId) setDungeonDetailId(undefined);
    else if (campaignDetailId) setCampaignDetailId(undefined);
  };

  return (
    <Box
      title="CREATE ROOM"
      className="flex min-h-0 w-full flex-1 flex-col gap-8 overflow-y-auto p-4 lg:p-8"
      wrapperClassName="w-3/4 min-w-0"
    >
      {dungeonDetailId || campaignDetailId ? <GoBackButton onClick={onGoBack} /> : <Tabs />}
      {dungeonDetailId ? (
        <>
          <DungeonDetail dungeonDetailId={dungeonDetailId} />
          <CreateRoomFooter dungeonDetailId={dungeonDetailId} />
        </>
      ) : campaignDetailId ? (
        <CampaignDetail
          campaignDetailId={campaignDetailId}
          setDungeonDetailId={setDungeonDetailId}
        />
      ) : (
        <>
          {activeBaseTab === "adventures" && (
            <Adventures
              filter={subTab}
              setDungeonDetailId={setDungeonDetailId}
              isOwned={subTab === "owned"}
            />
          )}
          {activeBaseTab === "campaigns" && (
            <Campaigns
              filter={subTab}
              setCampaignDetailId={setCampaignDetailId}
              isOwned={subTab === "owned"}
            />
          )}
          {subTab === "favourite" && <AddFavoriteFooter />}
        </>
      )}
    </Box>
  );
};

export default CreateRoom;
