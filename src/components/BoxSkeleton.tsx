import { Box } from "@/components/ui/box";
import Skeleton from "@/components/ui/skeleton";
import Link from "next/link";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";

const BoxSkeleton = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center h-full p-16 overflow-y-hidden">
      <div className="flex flex-col gap-8">
        <Link
          className="cursor-pointer flex flex-row gap-1 font-medium items-center justify-center tracking-[0.08em] uppercase"
          href="/home"
        >
          <AiOutlineLeft className="inline-block" /> GO BACK
        </Link>
        <Box title={title} className="flex flex-col gap-8 min-h-0 flex-1 w-[1200px] p-8">
          <Skeleton />
        </Box>
      </div>
    </div>
  );
};

export default BoxSkeleton;
