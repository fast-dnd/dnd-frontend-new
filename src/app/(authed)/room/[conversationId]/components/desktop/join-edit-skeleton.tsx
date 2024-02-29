import SkeletonIcon from "@/components/icons/skeleton-icon";
import { Box } from "@/components/ui/box";

const JoinEditSkeleton = () => {
  return (
    <Box
      title=""
      className="mb-4 flex size-full min-h-0 flex-1 flex-col justify-between rounded-t-md p-8 text-sm lg:mb-0"
      wrapperClassName="h-full w-[27%]"
      titleClassName="hidden"
    >
      <div className="flex size-full animate-pulse flex-col gap-5 overflow-y-hidden lg:gap-8">
        <div className="flex min-h-0 w-full flex-1 flex-col gap-6 overflow-y-hidden">
          <div className="mb-1 h-6 w-24 rounded-lg bg-gray-600" />
          <div className="flex shrink-0 gap-6">
            <div className="flex size-[83px] shrink-0 items-center justify-center rounded-md bg-gray-600">
              <SkeletonIcon className="size-12 text-gray-200" />
            </div>
            <div className="flex flex-col justify-between pb-2">
              <div className="h-6 w-32 rounded-lg bg-gray-600" />
              <div className="h-5 w-40 rounded-lg bg-gray-600" />
            </div>
          </div>
          <div className="flex shrink-0 gap-6">
            <div className="flex size-[83px] shrink-0 items-center justify-center rounded-md bg-gray-600">
              <SkeletonIcon className="size-12 text-gray-200" />
            </div>
            <div className="flex flex-col justify-between pb-2">
              <div className="h-6 w-32 rounded-lg bg-gray-600" />
              <div className="h-5 w-40 rounded-lg bg-gray-600" />
            </div>
          </div>
        </div>

        <div className="h-[54px] w-full shrink-0 rounded-lg bg-gray-600" />

        <div className="flex shrink-0 flex-col gap-4">
          <div className="mb-1 h-6 w-32 rounded-lg bg-gray-600" />

          <div className="flex flex-col gap-3">
            <div className="h-5 w-24 rounded-lg bg-gray-600" />
            <div className="h-[42px] w-full rounded-lg bg-gray-600" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="h-5 w-24 rounded-lg bg-gray-600" />
            <div className="h-[42px] w-full rounded-lg bg-gray-600" />
          </div>

          <div className="h-14 w-full rounded-lg bg-gray-600" />
        </div>
      </div>
    </Box>
  );
};

export default JoinEditSkeleton;
