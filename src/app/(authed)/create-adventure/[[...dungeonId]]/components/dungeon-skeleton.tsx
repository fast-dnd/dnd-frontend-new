import React from "react";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";

import { Box } from "@/components/ui/box";
import Skeleton from "@/components/ui/skeleton";

const DungeonSkeleton = () => {
  return (
    <div className="flex h-full justify-center overflow-y-hidden p-16">
      <div className="flex flex-col gap-8">
        <Link
          className="flex w-fit cursor-pointer flex-row items-center gap-1 font-medium uppercase  tracking-[0.08em]"
          href="/home"
        >
          <AiOutlineLeft className="inline-block" /> GO BACK
        </Link>
        <Box title="CREATE DUNGEON" className="flex min-h-0 w-[1200px] flex-1 flex-col gap-8 p-8">
          <Skeleton />
        </Box>
      </div>
    </div>
  );
};

export default DungeonSkeleton;
