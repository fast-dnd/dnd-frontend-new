import useGetDungeons from "@/hooks/queries/use-get-dungeons";
import useGetRoomData from "@/hooks/queries/use-get-room-data";

const RecommendedAdventures = ({ conversationId }: { conversationId: string }) => {
  const { data: roomData } = useGetRoomData(conversationId);
  const { data: adventuresData, isError, isLoading } = useGetDungeons({ filter: "recommended" });

  if (!roomData || (roomData.state !== "LOSE" && roomData.state !== "WIN")) return <></>;

  return <></>;
  const content = adventuresData?.pages[0].dungeons
    .slice(0, 3)
    .map((adventure) => <div key={adventure._id}>{adventure.name}</div>); //todo

  return (
    <div className="flex flex-col rounded-lg bg-dark-900 px-8 py-4">
      <p>YOU MAY ALSO LIKE</p>
      <div className="flex overflow-x-auto">{content}</div>
    </div>
  );
};

export default RecommendedAdventures;
