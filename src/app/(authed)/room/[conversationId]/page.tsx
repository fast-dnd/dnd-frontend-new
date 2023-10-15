import JoinEditInfo from "./components/join-edit-info";
import RoomInfo from "./components/room-info";

const Room = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;
  return (
    <div className="flex h-full flex-col justify-between gap-12 pb-12 lg:flex-row lg:overflow-y-hidden">
      <RoomInfo conversationId={conversationId} />
      <JoinEditInfo conversationId={conversationId} />
    </div>
  );
};

export default Room;
