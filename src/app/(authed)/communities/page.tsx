"use client";

import { redirect } from "next/navigation";
import { useReadLocalStorage } from "usehooks-ts";

import MobileNavbar from "@/components/navbar/mobile-navbar";

import BuildCommunity from "./components/build-community";
import Community from "./components/community";
import useGetCommunities from "./hooks/use-get-communities";

const Communities = () => {
  const defaultCommunityId = useReadLocalStorage<string>("defaultCommunityId");
  const communityId = useReadLocalStorage<string>("communityId");
  const isDefault = Boolean(
    defaultCommunityId && communityId && defaultCommunityId === communityId,
  );

  const { data: communities, isLoading } = useGetCommunities({ isDefault });

  if (isDefault) redirect("/home");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!communities) return <div>Something went wrong</div>;

  return (
    <>
      <div className="hidden min-h-0 flex-1 flex-col items-center gap-24 overflow-y-auto px-5 pb-12 lg:flex lg:px-0">
        <div className="min-h-0 max-w-[80%] flex-1 overflow-y-auto px-4">
          <div className="flex w-[1140px] flex-wrap content-start gap-5">
            {communities.map((community) => (
              <Community key={community._id} community={community} />
            ))}
          </div>
        </div>
        <BuildCommunity />
      </div>

      <div className="flex flex-col gap-4 pb-4 lg:hidden">
        <MobileNavbar className="fixed z-[55] h-16 items-start" />
        <div className="mt-16 flex h-full flex-1 flex-col gap-3 px-4">
          <p className="font-medium">COMMUNITIES</p>
          <div className="flex flex-col gap-4 lg:flex-row">
            {communities.map((community) => (
              <>
                <Community key={community._id} community={community} />
                <Community key={community._id} community={community} />
                <Community key={community._id} community={community} />
                <Community key={community._id} community={community} />
                <Community key={community._id} community={community} />
              </>
            ))}
          </div>
        </div>
        <BuildCommunity />
      </div>
    </>
  );
};

export default Communities;
