import SkeletonIcon from "@/components/icons/skeleton-icon";
import { Box } from "@/components/ui/box";

const GeneralSkeleton = () => {
  return (
    <Box
      title="GENERAL"
      className="flex h-full flex-col overflow-y-hidden p-5 lg:p-8"
      wrapperClassName="h-full min-h-0"
    >
      <div className="flex h-full w-full animate-pulse flex-col gap-4 lg:gap-8">
        <div className="flex gap-4 lg:gap-6">
          <div className="flex h-[90px] w-[90px] shrink-0 items-center justify-center rounded-md bg-gray-600">
            <SkeletonIcon className="h-12 w-12 text-gray-200" />
          </div>
          <div className="flex w-full flex-col justify-between lg:gap-1.5">
            <div className="-mt-1 h-5 w-36 rounded-lg bg-gray-600" />
            <div className="h-4 w-24 rounded-lg bg-gray-600" />
            <div className="h-7 w-64 rounded-xl bg-gray-600" />
          </div>
        </div>

        <div className="w-full border-t border-white/25" />

        <div className="h-14 w-full rounded-xl bg-gray-600" />

        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-hidden pr-4">
          <div className="h-11 w-full shrink-0 rounded-xl bg-gray-600" />
          <div className="h-11 w-full shrink-0 rounded-xl bg-gray-600" />
          <div className="h-32 w-full shrink-0 rounded-xl bg-gray-600" />
          <div className="h-11 w-full shrink-0 rounded-xl bg-gray-600" />
          <div className="h-24 w-full shrink-0 rounded-xl bg-gray-600" />
          <div className="h-14 w-full shrink-0 rounded-xl bg-gray-600" />
          <div className="h-11 w-full shrink-0 rounded-xl bg-gray-600" />
          <div className="h-14 w-full shrink-0 rounded-xl bg-gray-600" />
        </div>

        <div className="mt-4 h-14 w-full rounded-xl bg-gray-600" />
      </div>
    </Box>
  );
};
export default GeneralSkeleton;
