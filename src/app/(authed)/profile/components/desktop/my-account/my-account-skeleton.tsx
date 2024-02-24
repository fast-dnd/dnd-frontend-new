import SkeletonIcon from "@/components/icons/skeleton-icon";
import { Box } from "@/components/ui/box";

const MyAccountSkeleton = () => {
  return (
    <Box
      title="MY ACCOUNT"
      wrapperClassName="flex h-full basis-1/3"
      className="flex h-full flex-col gap-8 overflow-y-hidden p-8"
    >
      <div className="flex flex-col gap-8">
        <div className="flex animate-pulse items-center gap-4">
          <div className="flex size-[100px] items-center justify-center rounded-md bg-gray-600">
            <SkeletonIcon className="size-12 text-gray-200" />
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="h-5 w-48 rounded-full bg-gray-600" />
              <div className="h-5 w-32 rounded-full bg-gray-600" />
            </div>

            <div className="h-5 w-64 rounded-full bg-gray-600" />
            <div className="h-7 w-20 rounded-lg bg-gray-600" />
          </div>
        </div>
      </div>

      <div className="flex animate-pulse flex-col gap-6">
        <div className="flex w-full flex-col gap-2">
          <div className="mb-1 h-6 w-20 rounded-lg bg-gray-600" />
          <div className="flex w-full gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-600" />
            <div className="h-20 w-full rounded-lg bg-gray-600" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="mb-1 h-6 w-32 rounded-lg bg-gray-600" />
          <div className="flex w-full gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-600" />
            <div className="h-20 w-full rounded-lg bg-gray-600" />
          </div>
          <div className="flex w-full gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-600" />
            <div className="h-20 w-full rounded-lg bg-gray-600" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-2">
          <div className="mb-1 h-6 w-36 rounded-lg bg-gray-600" />
          <div className="flex w-full gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-600" />
            <div className="h-20 w-full rounded-lg bg-gray-600" />
          </div>
          <div className="flex w-full gap-4">
            <div className="h-20 w-full rounded-lg bg-gray-600" />
            <div className="h-20 w-full rounded-lg bg-gray-600" />
          </div>
        </div>
      </div>
      <div className="flex flex-1 animate-pulse items-end justify-center">
        <div className="h-14 w-40 rounded-lg bg-gray-600" />
      </div>
    </Box>
  );
};

export default MyAccountSkeleton;
