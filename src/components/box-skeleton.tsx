import React from "react";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";

import { Box } from "@/components/ui/box";
import Skeleton from "@/components/ui/skeleton";

import MobileNavbar from "./mobile-navbar";

const BoxSkeleton = ({ title }: { title: string }) => {
  return (
    <div className="mt-8 h-full w-full lg:mt-0">
      <MobileNavbar />
      <div className="flex h-full justify-center overflow-y-hidden pt-8 lg:p-16">
        <div className="flex flex-col gap-8">
          <Link
            className="hidden cursor-pointer flex-row items-center justify-center gap-1 font-medium uppercase tracking-[0.08em] lg:flex"
            href="/home"
          >
            <AiOutlineLeft className="inline-block" /> GO BACK
          </Link>
          <Box
            title={title}
            className="flex min-h-0 w-[350px] flex-1 flex-col gap-8 p-8 lg:w-[1200px]"
          >
            <Skeleton />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default BoxSkeleton;
