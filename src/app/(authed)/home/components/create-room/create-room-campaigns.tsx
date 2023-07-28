/* eslint-disable react-hooks/rules-of-hooks */

import { useState } from "react";
import Image from "next/image";

import { ICampaign, IDungeon } from "@/types/dungeon";
import Skeleton from "@/components/ui/skeleton";

import {
  useGetFavoriteCampaigns,
  useGetMyCampaigns,
  useGetRecommendedCampaigns,
} from "../../hooks/use-get-home-data";
import { homeStore } from "../../stores/tab-store";
import CreateRoomCampaign from "./create-room-campaign";
import CreateRoomFooter from "./create-room-footer";
import CreateRoomNavbar from "./create-room-navbar";
import SelectedCampaign from "./selected-campaign";
import SelectedDungeon from "./selected-dungeon";

const CreateRoomCampaigns = () => {
  const { subTab, homeTab, baseTab } = homeStore.use();

  const { data: campaigns, isLoading: campaignsLoading } =
    subTab === "top"
      ? useGetRecommendedCampaigns(homeTab == "PLAY" && baseTab === "CAMPAIGNS")
      : subTab === "owned"
      ? useGetMyCampaigns(homeTab == "PLAY" && baseTab === "CAMPAIGNS")
      : subTab === "favorite"
      ? useGetFavoriteCampaigns(homeTab == "PLAY" && baseTab === "CAMPAIGNS")
      : useGetFavoriteCampaigns(homeTab == "PLAY" && baseTab === "CAMPAIGNS"); // todo recent campaigns

  const [selectedDungeon, setSelectedDungeon] = useState<IDungeon>();
  const [selectedCampaign, setSelectedCampaign] = useState<ICampaign>();

  if (campaignsLoading) {
    return (
      <div className="flex max-h-[350px] flex-1 flex-col gap-4 overflow-y-auto lg:max-h-full lg:pr-8">
        <Skeleton amount={3} />
      </div>
    );
  }
  if (!campaigns) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-5xl text-white">Something went wrong</div>
      </div>
    );
  }
  if (campaigns.length === 0)
    return (
      <>
        <CreateRoomNavbar />
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 py-16 lg:gap-8">
          <Image src="/images/star-icon.svg" alt="Empty dungeon" width={68} height={64} />
          <p className="text-center text-lg font-semibold leading-7 tracking-widest lg:text-2xl lg:tracking-[3.3px]">
            YOU HAVE NO {subTab === "favorite" ? "FAVORITE" : ""} CAMPAIGNS YET
          </p>
          {subTab === "favorite" && (
            <p className="text-center text-sm font-light leading-5 tracking-wide text-white/50 lg:text-lg lg:leading-7 lg:tracking-widest">
              Enter the ID below to add a new one
            </p>
          )}
        </div>
      </>
    );
  return (
    <>
      {selectedCampaign === undefined && <CreateRoomNavbar />}

      <div className="flex max-h-[350px] flex-1 flex-col gap-4 overflow-y-auto lg:max-h-full lg:pr-8">
        {selectedDungeon === undefined ? (
          selectedCampaign === undefined ? (
            campaigns.map((campaign) => (
              <CreateRoomCampaign
                key={campaign._id}
                campaign={campaign}
                selectedCampaign={selectedCampaign}
                setSelectedCampaign={setSelectedCampaign}
              />
            ))
          ) : (
            <SelectedCampaign
              dungeon={selectedDungeon}
              selectedCampaign={selectedCampaign}
              setDungeon={setSelectedDungeon}
            />
          )
        ) : (
          <SelectedDungeon selectedDungeon={selectedDungeon} />
        )}
      </div>

      <CreateRoomFooter selectedDungeon={selectedDungeon} setSelectedDungeon={setSelectedDungeon} />
    </>
  );
};

export default CreateRoomCampaigns;
