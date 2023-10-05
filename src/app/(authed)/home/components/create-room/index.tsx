import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Adventures from "@/components/adventures";
import CampaignDetail from "@/components/campaign-detail";
import Campaigns from "@/components/campaigns";
import DungeonDetail from "@/components/dungeon-detail";
import GoBackButton from "@/components/go-back-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAddFavoriteCampaign from "@/hooks/use-add-favorite-campaign";
import useAddFavoriteDungeon from "@/hooks/use-add-favorite-dungeon";
import useCreateRoom from "@/hooks/use-create-room";

import { tabStore } from "./store/tab-store";
import Tabs from "./tabs";

const CreateRoom = () => {
  const subTab = tabStore.subTab.use();
  const router = useRouter();

  const activeBaseTab = tabStore.baseTab.use();

  const [dungeonDetailId, setDungeonDetailId] = useState<string>();
  const [campaignDetailId, setCampaignDetailId] = useState<string>();

  const [loadingRoom, setLoadingRoom] = useState(false);

  const [favId, setFavId] = useState("");

  const { mutate: addFavoriteDungeon, isLoading: isAddingFavoriteDungeon } =
    useAddFavoriteDungeon();
  const { mutate: addFavoriteCampaign, isLoading: isAddingFavoriteCampaign } =
    useAddFavoriteCampaign();

  const { mutate: createRoom, isLoading: isCreatingRoom } = useCreateRoom();

  useEffect(() => {
    setFavId("");
  }, [activeBaseTab]);

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
              <Adventures
                filter={subTab}
                setDungeonDetailId={setDungeonDetailId}
                isOwned={subTab === "owned"}
              />
            </>
          )}
          {activeBaseTab === "campaigns" && (
            <Campaigns
              filter={subTab}
              setCampaignDetailId={setCampaignDetailId}
              isOwned={subTab === "owned"}
            />
          )}
          {subTab === "favourite" && (
            <div className="flex justify-end gap-8">
              <div>
                <Input
                  placeholder={`${activeBaseTab === "adventures" ? "Adventure" : "Campaign"} ID`}
                  className="w-64"
                  onChange={(e) => setFavId(e.target.value)}
                />
              </div>

              <Button
                className="mb-1 w-fit whitespace-nowrap"
                variant="outline"
                isLoading={
                  activeBaseTab === "adventures"
                    ? isAddingFavoriteDungeon
                    : isAddingFavoriteCampaign
                }
                onClick={() =>
                  activeBaseTab === "adventures"
                    ? addFavoriteDungeon(favId)
                    : addFavoriteDungeon(favId)
                }
              >
                ADD FAVORITE
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CreateRoom;
