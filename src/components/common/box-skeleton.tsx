import React from "react";

import { Box } from "@/components/ui/box";
import Skeleton from "@/components/ui/skeleton";

import MobileNavbar from "../navbar/mobile-navbar";

const BoxSkeleton = ({ title }: { title: string }) => {
  return (
    <div className="size-full lg:mt-0">
      <MobileNavbar />
      <div className="flex h-full justify-center overflow-y-hidden pt-8 lg:p-0">
        <div className="flex flex-col gap-8">
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
