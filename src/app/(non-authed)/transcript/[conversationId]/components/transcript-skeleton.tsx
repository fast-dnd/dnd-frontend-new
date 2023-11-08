import { PiShareFatFill } from "react-icons/pi";

import { Box } from "@/components/ui/box";

const TranscriptSkeleton = () => {
  return (
    <>
      <div className="hidden h-full min-h-0 justify-center pb-10 lg:flex">
        <Box
          title="TRANSCRIPT"
          wrapperClassName="w-3/5 min-h-0 h-full"
          className="h-full overflow-y-hidden p-12"
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

      <div className="flex h-full min-h-0 justify-center pb-10 lg:hidden">
        <div className="z-10 flex w-full items-center justify-between bg-black px-4 pb-5 pt-8 max-lg:fixed lg:rounded-t-md lg:px-6 lg:py-9">
          <div className="hidden items-center gap-4 text-3xl lg:flex">
            <div className="h-8 w-16 rounded-lg bg-gray-600" />
          </div>
          <div className="flex flex-col gap-2 lg:hidden">
            <div className="h-6 w-20 rounded-lg bg-gray-600" />
            <div className="h-6 w-32 rounded-lg bg-gray-600" />
            <div className="h-6 w-20 rounded-lg bg-gray-600" />
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <p className="hidden font-medium lg:block">Players</p>
            <div className="flex items-center -space-x-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-8 w-8 rounded-full bg-gray-600" />
              ))}
            </div>
            <hr className="h-7 w-1 border-l border-white/20" />
            <button className="flex items-center gap-1 font-semibold lg:text-lg">
              SHARE
              <PiShareFatFill />
            </button>
          </div>
        </div>

        <div className="mt-44 flex w-full flex-col gap-6 px-4 pb-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-6 rounded-md bg-black p-1 pb-6 lg:p-8">
              <div className="h-44 w-full rounded-md bg-gray-600" />
              <div className="flex flex-col gap-6 max-lg:px-4">
                <div className="flex flex-col gap-1">
                  <div className="h-6 w-20 rounded-lg bg-gray-600" />
                  <div className="h-6 w-full rounded-lg bg-gray-600" />
                  <div className="h-6 w-3/4 rounded-lg bg-gray-600" />
                  <div className="h-6 w-32 rounded-lg bg-gray-600" />
                  <div className="h-6 w-full rounded-lg bg-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TranscriptSkeleton;
