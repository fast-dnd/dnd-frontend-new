import React from "react";

import { cn } from "@/utils/style-utils";

import SkeletonIcon from "../icons/skeleton-icon";

interface ISkeletonProps {
  amount?: number;
  small?: boolean;
}

const Skeleton = ({ amount = 1, small = false }: ISkeletonProps) => {
  return (
    <>
      {Array.from({ length: amount }, (_, i) => (
        <div
          key={i}
          role="status"
          className={cn(
            "animate-pulse space-y-8 lg:flex lg:items-center lg:space-x-8 lg:space-y-0",
            !small && "p-4",
          )}
        >
          <div
            className={cn(
              "flex h-[200px] w-full items-center justify-center rounded bg-gray-600 lg:w-[200px] lg:shrink-0",
              small && "h-20 w-20 lg:w-20",
            )}
          >
            <SkeletonIcon className={cn("h-12 w-12 text-gray-200", small && "h-12 w-12")} />
          </div>
          <div className="w-full">
            <div className={cn("mb-4 h-2.5 w-48 rounded-full bg-gray-600", small && "w-36")} />
            <div className="mb-2.5 h-2 max-w-[480px] rounded-full bg-gray-600" />
            {!small && (
              <>
                <div className="mb-2.5 h-2 rounded-full bg-gray-600" />
                <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-600" />
                <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-600" />
                <div className="h-2 max-w-[360px] rounded-full bg-gray-600" />
              </>
            )}
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </>
  );
};

export default Skeleton;
