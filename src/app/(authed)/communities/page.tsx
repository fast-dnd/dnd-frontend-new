"use client";

import { redirect } from "next/navigation";

import MobileNavbar from "@/components/navbar/mobile-navbar";
import useCommunity from "@/hooks/helpers/use-community";

import BuildCommunity from "./components/build-community";
import CommunitiesSkeleton from "./components/communities-skeleton";
import Community from "./components/community";
import useGetCommunities from "./hooks/use-get-communities";

const Communities = () => {
  const { isDefault } = useCommunity();

  const { data: communities, isLoading } = useGetCommunities({ isDefault });

  if (isDefault) redirect("/home");

  if (isLoading) {
    return <CommunitiesSkeleton />;
  }

  if (!communities) return <div>Something went wrong</div>;

  return (
    <>
      <div className="hidden min-h-0 flex-1 flex-col items-center gap-36 overflow-y-auto pb-12 lg:flex">
        <div className="min-h-0 max-w-[80%] flex-1 overflow-y-auto px-4">
          <div className="flex w-[1350px] flex-wrap content-start gap-5">
            {communities.map((community) => (
              <Community key={community._id} community={community} />
            ))}
          </div>
        </div>
        <BuildCommunity />
      </div>

      <div className="flex flex-col gap-4 pb-4 lg:hidden">
        <MobileNavbar className="fixed h-16 items-start" />
        <div className="mt-16 flex h-full flex-1 flex-col gap-3 px-4">
          <p className="font-medium">COMMUNITIES</p>
          <div className="flex flex-col gap-4 lg:flex-row">
            {communities.map((community) => (
              <Community key={community._id} community={community} />
            ))}
          </div>
        </div>
        <BuildCommunity />
      </div>
    </>
  );
};

export default Communities;
