import { Box } from "@/components/ui/box";

const TranscriptSkeleton = () => {
  return (
    <div className="flex h-full min-h-0 justify-center pb-10">
      <Box
        title="TRANSCRIPT"
        wrapperClassName="w-3/5 min-h-0 h-full"
        className="h-full overflow-y-hidden p-12"
        titleClassName="h-24"
      >
        <div className="flex animate-pulse flex-col gap-8 pr-4">
          <div className="h-8 w-16 rounded-lg bg-gray-600" />
          <div className="h-6 w-20 rounded-lg bg-gray-600" />

          <div className="flex flex-col gap-6 border-b border-white/20 pb-4">
            <div className="h-6 w-28 rounded-lg bg-gray-600" />
            <div className="h-6 w-32 rounded-lg bg-gray-600" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-11/12 rounded-lg bg-gray-600" />
              <div className="h-4 w-full rounded-lg bg-gray-600" />
              <div className="h-4 w-5/6 rounded-lg bg-gray-600" />
              <div className="h-4 w-11/12 rounded-lg bg-gray-600" />
              <div className="h-4 w-full rounded-lg bg-gray-600" />
              <div className="h-4 w-1/2 rounded-lg bg-gray-600" />
            </div>

            <div className="mt-4 h-8 w-1/3 rounded-full bg-gray-600" />
            <div className="h-8 w-1/2 rounded-full bg-gray-600" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-5/6 rounded-lg bg-gray-600" />
              <div className="h-4 w-11/12 rounded-lg bg-gray-600" />
              <div className="h-4 w-full rounded-lg bg-gray-600" />
              <div className="h-4 w-full rounded-lg bg-gray-600" />
              <div className="h-4 w-11/12 rounded-lg bg-gray-600" />
              <div className="h-4 w-1/2 rounded-lg bg-gray-600" />
            </div>

            <div className="mt-4 h-8 w-1/3 rounded-full bg-gray-600" />
            <div className="h-8 w-1/2 rounded-full bg-gray-600" />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-5/6 rounded-lg bg-gray-600" />
              <div className="h-4 w-11/12 rounded-lg bg-gray-600" />
              <div className="h-4 w-full rounded-lg bg-gray-600" />
              <div className="h-4 w-full rounded-lg bg-gray-600" />
              <div className="h-4 w-11/12 rounded-lg bg-gray-600" />
              <div className="h-4 w-1/2 rounded-lg bg-gray-600" />
            </div>

            <div className="mt-4 h-8 w-1/3 rounded-full bg-gray-600" />
            <div className="h-8 w-1/2 rounded-full bg-gray-600" />
          </div>
        </div>
      </Box>
    </div>
  );
};

export default TranscriptSkeleton;
