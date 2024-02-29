import Skeleton from "@/components/ui/skeleton";
import { cn } from "@/utils/style-utils";

export const DungeonDetailSkeleton = () => {
  return (
    <div className="flex w-full flex-1 flex-col overflow-y-auto border-b-2 border-b-white/20 pr-4">
      <Skeleton />
      <div className="my-8">
        <div className="mb-1 h-5 w-16 rounded-lg bg-gray-600" />
        <div className="mt-8 flex flex-col gap-12 px-6">
          {Array.from(
            {
              length: 2,
            },
            (_, i) => (
              <div key={i} className={cn("flex animate-pulse flex-col gap-4 p-6")}>
                <div className="h-6 w-64 rounded-full bg-gray-600" />
                <div className="h-5 w-48 rounded-full bg-gray-600" />

                <div className="flex flex-col gap-4">
                  <div className="h-4 w-32 rounded-full bg-gray-600" />
                  <div className="grid grid-cols-2 gap-4">
                    {Array.from(
                      {
                        length: 4,
                      },
                      (_, i) => (
                        <div key={i} className="h-4 w-64 rounded-full bg-gray-600" />
                      ),
                    )}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
};
