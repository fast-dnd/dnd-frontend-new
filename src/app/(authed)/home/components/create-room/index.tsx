import { useState } from "react";
import { useRouter } from "next/navigation";

import useCreateRoom from "@/hooks/use-create-room";
import { Button } from "@/components/ui/button";
import GoBackButton from "@/components/go-back-button";
import Adventures from "@/app/(authed)/profile/components/my-collection/adventures";
import CampaignDetail from "@/app/(authed)/profile/components/my-collection/campaign-detail";
import Campaigns from "@/app/(authed)/profile/components/my-collection/campaigns";
import DungeonDetail from "@/app/(authed)/profile/components/my-collection/dungeon-detail";

import { tabStore } from "./store/tab-store";
import Tabs from "./tabs";

const CreateRoom = () => {
  const subTab = tabStore.subTab.use();
  const router = useRouter();

  const activeBaseTab = tabStore.baseTab.use();

  const [dungeonDetailId, setDungeonDetailId] = useState<string>();
  const [campaignDetailId, setCampaignDetailId] = useState<string>();

  const [loadingRoom, setLoadingRoom] = useState(false);

  const { mutate: createRoom, isLoading: isCreatingRoom } = useCreateRoom();

  const onCreateRoom = () => {
    createRoom(
      {
        generateAudio: false,
        generateImages: false,
        dungeon: dungeonDetailId,
      },
      {
        onSuccess: (data) => {
          if (data.admin) localStorage.setItem("accountId", data.admin.accountId);
          setLoadingRoom(true);
          router.push(`room/${data.conversationId}`);
        },
      },
    );
  };

  const onGoBack = () => {
    if (dungeonDetailId && campaignDetailId) setDungeonDetailId(undefined);
    else if (dungeonDetailId) setDungeonDetailId(undefined);
    else if (campaignDetailId) setCampaignDetailId(undefined);
  };

  return (
    <>
      {dungeonDetailId || campaignDetailId ? <GoBackButton onClick={onGoBack} /> : <Tabs />}
      {dungeonDetailId ? (
        <>
          <DungeonDetail dungeonDetailId={dungeonDetailId} />
          <div className="flex justify-end">
            <Button
              className="w-fit whitespace-nowrap"
              isLoading={isCreatingRoom || loadingRoom}
              onClick={onCreateRoom}
            >
              CREATE ROOM
            </Button>
          </div>
        </>
      ) : campaignDetailId ? (
        <CampaignDetail
          campaignDetailId={campaignDetailId}
          setDungeonDetailId={setDungeonDetailId}
        />
      ) : (
        <>
          {activeBaseTab === "adventures" && (
            <Adventures filter={subTab} setDungeonDetailId={setDungeonDetailId} />
          )}
          {activeBaseTab === "campaigns" && (
            <Campaigns filter={subTab} setCampaignDetailId={setCampaignDetailId} />
          )}
        </>
      )}
    </>
  );
};

export default CreateRoom;
