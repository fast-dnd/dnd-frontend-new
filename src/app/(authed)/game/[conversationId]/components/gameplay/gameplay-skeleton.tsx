import SkeletonIcon from "@/components/icons/skeleton-icon";

const GameplaySkeleton = () => {
  return (
    <div className="flex size-full flex-col">
      <div className="flex w-full items-center justify-between gap-8 rounded-t-md bg-dark-900 px-12 py-6">
        <div className="flex min-w-0 flex-1 animate-pulse items-center gap-4">
          <div className="h-8 w-1/3 rounded-lg bg-gray-700" />
        </div>

        <div className="flex shrink-0 animate-pulse items-center gap-4">
          <div className="size-6 rounded-xl bg-gray-700" />
          <div className="size-6 rounded-xl bg-gray-700" />
          <div className="h-12 w-48 rounded-lg bg-gray-700" />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-hidden rounded-b-md bg-glass p-5 backdrop-blur-2xl lg:px-12 lg:py-8">
        <div className="flex w-full animate-pulse flex-col gap-8">
          <div className="h-8 w-[480px] shrink-0 rounded-lg bg-gray-600" />
          <div className="flex gap-6">
            <div className="flex size-72 shrink-0 items-center justify-center rounded-lg bg-gray-600">
              <SkeletonIcon className="size-24 text-gray-200" />
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
            <div className="flex size-72 shrink-0 items-center justify-center rounded-lg bg-gray-600">
              <SkeletonIcon className="size-24 text-gray-200" />
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
      </div>
    </div>
  );
};

export default GameplaySkeleton;
