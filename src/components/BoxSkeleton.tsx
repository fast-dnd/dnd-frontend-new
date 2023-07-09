import { Box } from "@/components/ui/box";
import Skeleton from "@/components/ui/skeleton";
import Link from "next/link";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";
import MobileNavbar from "./mobile-navbar";

const BoxSkeleton = ({ title }: { title: string }) => {
  return (
    <div className="h-full w-full mt-8 lg:mt-0">
      <MobileNavbar />
      <div className="flex justify-center h-full lg:p-16 pt-8 overflow-y-hidden">
        <div className="flex flex-col gap-8">
          <Link
            className="hidden cursor-pointer lg:flex flex-row gap-1 font-medium items-center justify-center tracking-[0.08em] uppercase"
            href="/home"
          >
            <AiOutlineLeft className="inline-block" /> GO BACK
          </Link>
          <Box
            title={title}
            className="flex flex-col gap-8 min-h-0 flex-1 w-[350px] lg:w-[1200px] p-8"
          >
            <Skeleton />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default BoxSkeleton;
