import { homeStore } from "../../stores/tab-store";
import CreateRoomAdventures from "./create-room-adventures";
import CreateRoomCampaigns from "./create-room-campaigns";

const CreateRoom = () => {
  const baseTab = homeStore.baseTab.use();

  if (baseTab === "ADVENTURES") return <CreateRoomAdventures />;
  else return <CreateRoomCampaigns />;
};

export default CreateRoom;
