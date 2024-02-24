"use client";

import React from "react";
import Image from "next/image";

import useGetCurrentCommunity from "@/hooks/queries/use-get-current-community";

const CommunityInfo = () => {
  const { data: currentCommunity, isLoading } = useGetCurrentCommunity();

  if (isLoading) return <div>Loading...</div>;

  if (!currentCommunity) return <div>No community found</div>;

  return (
    <>
      <div className="relative hidden gap-6 lg:flex">
        <div className="rounded-full border-[6px] border-primary-900/80 bg-white">
          <Image
            src={currentCommunity.logoImageUrl}
            alt={currentCommunity.name + " logo"}
            width={110}
            height={110}
            className="rounded-full lg:size-[110px]"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-[44px] font-bold uppercase">WELCOME TO {currentCommunity.name}</p>
          <p className="w-[550px] text-xl font-light">{currentCommunity.description}</p>
        </div>
        <div className="absolute -bottom-10 mb-6 h-[1px] w-full bg-black/40 shadow-[0px_2px_0px_#FFFFFF_16]" />
      </div>

      <div className="relative mb-40 flex border-b border-b-white/10 lg:hidden">
        <div className="absolute inset-0">
          <Image
            src={currentCommunity.bannerImgUrl}
            alt={currentCommunity.name + " banner"}
            width={665}
            height={665}
            className="absolute h-52 w-full object-cover"
          />
        </div>

        <div className="absolute mt-32 h-20 w-full bg-gradient-to-t from-black to-transparent to-70% bg-blend-multiply" />

        <div className="absolute ml-4 mt-24 flex gap-4 pr-4">
          <Image
            src={currentCommunity.logoImageUrl}
            alt={currentCommunity.name + " banner"}
            width={45}
            height={45}
            className="size-[45px] rounded-full border-2 border-primary-900/25 bg-white"
          />
          <div className="flex flex-col">
            <p className="font-bold uppercase">WELCOME TO {currentCommunity.name}</p>
            <p className="text-sm font-light">{currentCommunity.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityInfo;
