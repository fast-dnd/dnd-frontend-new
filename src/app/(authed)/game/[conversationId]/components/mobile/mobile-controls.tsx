import useGetRoomData from "@/hooks/queries/use-get-room-data";

import useGetCurrentPlayer from "../../hooks/use-get-current-player";
import DiceModal from "./dice-modal";
import MobilePlayMove from "./mobile-play-move";

const MobileControls = ({ conversationId }: { conversationId: string }) => {
  const { data: roomData } = useGetRoomData(conversationId);
  const { currentPlayer } = useGetCurrentPlayer(conversationId);

  if (!roomData || !currentPlayer) return <div>todo</div>;
  return (
    <div className="fixed bottom-0 flex w-full flex-col">
      <DiceModal />
      <MobilePlayMove
        conversationId={conversationId}
        currentPlayer={currentPlayer}
        roomData={roomData}
      />
    </div>
  );
};
export default MobileControls;
