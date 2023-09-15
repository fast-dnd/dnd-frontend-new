import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLeft } from "react-icons/ai";

import { Button } from "@/components/ui/button";
import useCreateRoom from "@/app/(authed)/home/hooks/use-create-room";
import Adventures from "@/app/(authed)/profile/components/my-collection/adventures";
import Campaigns from "@/app/(authed)/profile/components/my-collection/campaigns";
import DungeonDetail from "@/app/(authed)/profile/components/my-collection/dungeon-detail";

import { tabStore } from "./store/tab-store";

const CreateRoom = () => {
  const subTab = tabStore.subTab.use();
  const router = useRouter();

  const activeBaseTab = tabStore.baseTab.use();
  const [dungeonDetailId, setDungeonDetailId] = useState<string>();

  const [templateSentences, setTemplateSentences] = useState("");
  const [loadingRoom, setLoadingRoom] = useState(false);

  const { mutate: createRoom, isLoading: isCreatingRoom } = useCreateRoom();

  const onCreateRoom = () => {
    createRoom(
      {
        generateAudio: false,
        generateImages: false,
        dungeon: dungeonDetailId,
        templateSentences,
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

  return (
    <>
      {dungeonDetailId ? (
        <>
          <DungeonDetail dungeonDetailId={dungeonDetailId} />
          <div className="absolute bottom-8 right-8 flex items-center gap-8">
            <div
              className="cursor-pointer items-center gap-1 uppercase"
              onClick={() => setDungeonDetailId(undefined)}
            >
              <AiOutlineLeft className="inline-block" /> GO BACK
            </div>
            <Button
              className="w-fit whitespace-nowrap"
              isLoading={isCreatingRoom || loadingRoom}
              onClick={onCreateRoom}
            >
              CREATE ROOM
            </Button>
          </div>
        </>
      ) : (
        <>
          {activeBaseTab === "adventures" && (
            <Adventures filter={subTab} setDungeonDetailId={setDungeonDetailId} />
          )}
          {activeBaseTab === "campaigns" && <Campaigns filter={subTab} />}
        </>
      )}
    </>
  );
};

export default CreateRoom;
