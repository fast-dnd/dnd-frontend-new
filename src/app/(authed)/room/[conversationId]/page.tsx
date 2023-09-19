import JoinEditInfo from "./components/join-edit-info";
import RoomInfo from "./components/room-info";

const Room = ({ params }: { params: { conversationId: string } }) => {
  const conversationId = params.conversationId;
  return (
    <div className="mt-8 h-full min-h-0 w-full overflow-y-auto lg:mt-0">
      {/* <MobileNavbar /> */}
      <div className="flex h-full justify-center pt-8 lg:overflow-y-hidden lg:p-16">
        <div className="flex min-h-0 w-full flex-1 flex-col gap-12 lg:flex-row">
          <RoomInfo conversationId={conversationId} />
          <JoinEditInfo conversationId={conversationId} />
        </div>
      </div>
    </div>
  );
};

export default Room;
