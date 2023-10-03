import { useState } from "react";
import { useRouter } from "next/navigation";

import useAddFavoriteDungeon from "@/hooks/use-add-favorite-dungeon";
import useCreateRoom from "@/hooks/use-create-room";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  const [favDungeonId, setFavDungeonId] = useState("");

  const { mutate: addFavorite, isLoading: isAddingFavorite } = useAddFavoriteDungeon();

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
            <>
              <Adventures filter={subTab} setDungeonDetailId={setDungeonDetailId} />
              {subTab === "favourite" && (
                <div className="flex justify-end gap-8">
                  <Input placeholder="Dungeon ID" className="w-64" />
                  <Button
                    className="mb-1 w-fit whitespace-nowrap"
                    variant="outline"
                    isLoading={isAddingFavorite}
                    onClick={() => addFavorite(favDungeonId)}
                  >
                    ADD FAVORITE
                  </Button>
                </div>
              )}
            </>
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
