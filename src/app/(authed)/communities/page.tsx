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
      <div className="hidden min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-12 lg:flex lg:flex-row lg:px-0">
        <div className="flex h-1/2 flex-col flex-wrap gap-4 overflow-auto lg:mx-auto lg:max-w-[80%] lg:flex-row">
          {[...communities, ...communities, ...communities].map((community) => (
            <Community key={community._id} community={community} />
          ))}
        </div>
        <BuildCommunity />
      </div>

      <div className="relative flex flex-1 flex-col lg:hidden">
        <MobileNavbar className="fixed z-[55] h-16 items-start" />
        <div className="mt-16 flex h-full flex-1 flex-col gap-3 px-4">
          <p className="font-medium">COMMUNITIES</p>
          <div className="flex h-1/2 flex-col gap-4 overflow-auto lg:flex-row">
            {[...communities, ...communities, ...communities].map((community) => (
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
