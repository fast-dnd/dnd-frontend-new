import SkeletonIcon from "@/components/icons/skeleton-icon";
import MobileNavbar from "@/components/navbar/mobile-navbar";

import BuildCommunity from "./build-community";

const CommunitiesSkeleton = () => {
  return (
    <>
      <div className="hidden min-h-0 flex-1 flex-col items-center gap-36 overflow-y-auto pb-12 lg:flex">
        <div className="min-h-0 max-w-[80%] flex-1 overflow-y-auto px-4">
          <div className="flex w-[1350px] animate-pulse flex-wrap content-start gap-5">
            {Array.from({ length: 3 }, (_, i) => (
              <CommunitySkeleton key={i} />
            ))}
          </div>
        </div>
        <BuildCommunity />
      </div>

      <div className="flex flex-col gap-4 pb-4 lg:hidden">
        <MobileNavbar className="fixed h-16 items-start" />
        <div className="mt-16 flex h-full flex-1 flex-col gap-3 px-4">
          <p className="font-medium">COMMUNITIES</p>
          <div className="flex animate-pulse flex-col gap-4 lg:flex-row">
            {Array.from({ length: 3 }, (_, i) => (
              <CommunitySkeleton key={i} />
            ))}
          </div>
        </div>
        <BuildCommunity />
      </div>
    </>
  );
};

export default CommunitiesSkeleton;

const CommunitySkeleton = () => (
  <div className="relative flex flex-col gap-4 rounded-lg bg-black pb-3 max-lg:h-[216px] lg:w-[665px] lg:pb-5">
    <div className="flex flex-col gap-8 lg:gap-12">
      <div className="relative h-24 lg:h-[215px] lg:w-[665px]">
        <div className="absolute inset-0 overflow-hidden rounded-t-lg">
          <div className="absolute flex h-24 w-full shrink-0 items-center justify-center rounded-t-md bg-gray-600 text-gray-200 lg:h-[215px] lg:w-[662px]">
            <SkeletonIcon className="h-16 w-16 text-gray-200" />
          </div>
        </div>

        <div className="absolute -bottom-4 left-4 rounded-lg bg-white drop-shadow-[2px_2px_0px_#FF5A5A] lg:-bottom-8 lg:left-8 lg:drop-shadow-[4px_4px_0px_#FF5A5A]">
          <SkeletonIcon className="h-[50px] w-[50px] rounded-full lg:h-[120px] lg:w-[120px]" />
        </div>
      </div>

      <div className="ml-4 h-8 w-24 rounded-lg bg-gray-600 lg:ml-8" />
    </div>
    <div className="px-4 lg:px-8">
      <div className="h-8 w-full rounded-lg bg-gray-600 lg:h-16" />
    </div>
  </div>
);
