import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import useCreateRoom from "../../hooks/use-create-room";
import TemplateSentences from "./template-sentences";

const CreateRoomFooter = ({ dungeonDetailId }: { dungeonDetailId: string }) => {
  const router = useRouter();

  const [loadingRoom, setLoadingRoom] = useState(false);

  const { mutate: createRoom, isLoading: isCreatingRoom } = useCreateRoom();

  const [templateSentences, setTemplateSentences] = useState("");

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
          if (data.admin) localStorage.setItem("accountId", JSON.stringify(data.admin.accountId));
          setLoadingRoom(true);
          router.push(`room/${data.conversationId}`);
        },
      },
    );
  };

  return (
    <div className="flex justify-end">
      <TemplateSentences
        templateSentences={templateSentences}
        setTemplateSentences={setTemplateSentences}
      />
      <Button
        className="w-fit whitespace-nowrap"
        isLoading={isCreatingRoom || loadingRoom}
        onClick={onCreateRoom}
      >
        CREATE ROOM
      </Button>
    </div>
  );
};

export default CreateRoomFooter;
