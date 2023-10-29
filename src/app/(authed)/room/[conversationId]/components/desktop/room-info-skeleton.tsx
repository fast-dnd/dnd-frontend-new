import { DungeonDetailSkeleton } from "@/components/dungeon-detail";
import { Box } from "@/components/ui/box";

const RoomInfoSkeleton = () => {
  return (
    <Box
      title="LOBBY"
      className="flex h-full min-h-0 w-full shrink flex-col gap-5 p-5 lg:gap-8 lg:p-8"
      wrapperClassName="h-full w-[70%]"
    >
      <div className="h-[34px] w-[75px] animate-pulse rounded-lg bg-gray-600" />
      <DungeonDetailSkeleton />
    </Box>
  );
};
export default RoomInfoSkeleton;
