import { Box } from "@/components/ui/box";
import Skeleton from "@/components/ui/skeleton";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";

const DungeonSkeleton = () => {
  return (
    <div className="flex justify-center h-full p-16 overflow-y-hidden">
      <div className="flex flex-col gap-8">
        <div className="cursor-pointer flex flex-row gap-1 w-fit font-medium items-center tracking-[0.08em]  uppercase">
          <AiOutlineLeft className="inline-block" /> GO BACK
        </div>
        <Box title="CREATE DUNGEON" className="flex flex-col gap-8 min-h-0 flex-1 w-[1200px] p-8">
          <Skeleton />
        </Box>
      </div>
    </div>
  );
};

export default DungeonSkeleton;
