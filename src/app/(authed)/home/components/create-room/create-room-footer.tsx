import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLeft } from "react-icons/ai";

import { IDungeon } from "@/types/dungeon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useAddFavorite from "../../hooks/use-add-favorite";
import useCreateRoom from "../../hooks/use-create-room";
import { homeStore } from "../../stores/tab-store";

const CreateRoomFooter = ({
  selectedDungeon,
  setSelectedDungeon,
}: {
  selectedDungeon: IDungeon | undefined;
  setSelectedDungeon: React.Dispatch<React.SetStateAction<IDungeon | undefined>>;
}) => {
  const router = useRouter();

  const { mutate: createRoom, isLoading: isCreatingRoom } = useCreateRoom();

  const { mutate: addFavorite, isLoading: isAddingFavorite } = useAddFavorite();

  const [dungeonId, setDungeonId] = useState<string>("");

  const [loadingRoom, setLoadingRoom] = useState(false);
  const [templateSentences, setTemplateSentences] = useState("");

  const onCreateRoom = () => {
    createRoom(
      {
        generateAudio: false,
        generateImages: false,
        dungeon: selectedDungeon?._id,
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
    <div className="flex flex-row items-center justify-center gap-8">
      {homeStore.subTab.get() === "favorite" && selectedDungeon === undefined && (
        <div className="flex flex-1 flex-col justify-end gap-4 lg:flex-row lg:gap-8">
          <Input
            placeholder="Enter dungeon ID..."
            onChange={(e) => setDungeonId(e.target.value)}
            className="m-0 h-9 min-w-[200px] lg:h-14 lg:text-xl"
          />
          <Button
            isLoading={isAddingFavorite}
            disabled={!dungeonId}
            variant={dungeonId ? "primary" : "outline"}
            className="h-9 w-full px-8 lg:h-14 lg:w-fit"
            onClick={() => addFavorite(dungeonId)}
          >
            ADD FAVORITE
          </Button>
        </div>
      )}

      {selectedDungeon !== undefined && (
        <div className="flex w-full flex-row justify-between lg:justify-end lg:gap-8">
          <Input
            placeholder="Template sentences..."
            onChange={(e) => setTemplateSentences(e.target.value)}
            value={templateSentences}
            className="m-0 h-9 min-w-[200px] lg:h-14 lg:text-xl"
          />
          <Button
            className="flex w-fit gap-2 text-sm lg:text-lg"
            variant="ghost"
            onClick={() => setSelectedDungeon(undefined)}
          >
            <AiOutlineLeft className="inline-block" /> GO BACK
          </Button>
          <Button
            className="w-fit whitespace-nowrap px-8 text-sm uppercase lg:text-lg"
            isLoading={isCreatingRoom || loadingRoom}
            onClick={onCreateRoom}
          >
            CREATE ROOM
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateRoomFooter;
