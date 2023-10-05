import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import useCreateRoom from "../../hooks/use-create-room";

const CreateRoomFooter = ({ dungeonDetailId }: { dungeonDetailId: string }) => {
  const router = useRouter();

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

  return (
    <div className="flex justify-end">
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
