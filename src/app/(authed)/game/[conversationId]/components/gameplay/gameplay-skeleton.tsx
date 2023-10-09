import SkeletonIcon from "@/components/icons/skeleton-icon";
import { Box } from "@/components/ui/box";

const GameplaySkeleton = () => {
  return (
    <Box
      title="GAMEPLAY"
      className="flex h-full overflow-y-hidden lg:px-12 lg:py-8"
      wrapperClassName="h-full min-h-0"
    >
      <div className="flex w-full animate-pulse flex-col gap-8">
        <div className="h-8 w-[480px] shrink-0 rounded-lg bg-gray-600" />
        <div className="flex gap-6">
          <div className="flex h-72 w-72 shrink-0 items-center justify-center rounded-lg bg-gray-600">
            <SkeletonIcon className="h-24 w-24 text-gray-200" />
          </div>
          <div className="flex w-full flex-col gap-5">
            <div className="my-3 ml-6 h-6 w-72 rounded-lg bg-gray-600" />
            <div className="flex flex-col gap-3">
              <div className="h-5 w-11/12 rounded-lg bg-gray-600" />
              <div className="h-5 w-[95%] rounded-lg bg-gray-600" />
              <div className="h-5 w-5/6 rounded-lg bg-gray-600" />
              <div className="h-5 w-11/12 rounded-lg bg-gray-600" />
              <div className="h-5 w-full rounded-lg bg-gray-600" />
              <div className="h-5 w-5/6 rounded-lg bg-gray-600" />
              <div className="h-5 w-1/2 rounded-lg bg-gray-600" />
            </div>
          </div>
        </div>

        <div className="h-8 w-[480px] shrink-0 rounded-lg bg-gray-600" />
        <div className="flex gap-6">
          <div className="flex w-full flex-col gap-5">
            <div className="my-3 ml-6 h-6 w-72 rounded-lg bg-gray-600" />
            <div className="flex flex-col gap-3">
              <div className="h-5 w-11/12 rounded-lg bg-gray-600" />
              <div className="h-5 w-[95%] rounded-lg bg-gray-600" />
              <div className="h-5 w-5/6 rounded-lg bg-gray-600" />
              <div className="h-5 w-11/12 rounded-lg bg-gray-600" />
              <div className="h-5 w-full rounded-lg bg-gray-600" />
              <div className="h-5 w-5/6 rounded-lg bg-gray-600" />
              <div className="h-5 w-1/2 rounded-lg bg-gray-600" />
            </div>
          </div>
        </div>

        <div className="h-8 w-[480px] shrink-0 rounded-lg bg-gray-600" />
        <div className="flex gap-6">
          <div className="flex h-72 w-72 shrink-0 items-center justify-center rounded-lg bg-gray-600">
            <SkeletonIcon className="h-24 w-24 text-gray-200" />
          </div>
          <div className="flex w-full flex-col gap-5">
            <div className="my-3 ml-6 h-6 w-72 rounded-lg bg-gray-600" />
            <div className="flex flex-col gap-3">
              <div className="h-5 w-11/12 rounded-lg bg-gray-600" />
              <div className="h-5 w-[95%] rounded-lg bg-gray-600" />
              <div className="h-5 w-5/6 rounded-lg bg-gray-600" />
              <div className="h-5 w-11/12 rounded-lg bg-gray-600" />
              <div className="h-5 w-full rounded-lg bg-gray-600" />
              <div className="h-5 w-5/6 rounded-lg bg-gray-600" />
              <div className="h-5 w-1/2 rounded-lg bg-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default GameplaySkeleton;
