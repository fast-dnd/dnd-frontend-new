"use client";

import { useEffect } from "react";

import useGetCampaign from "@/hooks/use-get-campaign";
import BoxSkeleton from "@/components/box-skeleton";

import RightCard from "./components/create-campaign-card";
import SelectAdventuresCard from "./components/select-adventures-card";
import { campaignFormStore } from "./stores/campaign-form-store";

const CreateCampaign = ({ params }: { params: { campaignId?: [string] } }) => {
  const campaignId = params.campaignId?.[0];

  const campaignQuery = useGetCampaign(campaignId);

  useEffect(() => {
    if (campaignQuery.data) {
      campaignFormStore.set({
        name: campaignQuery.data.name,
        description: campaignQuery.data.description,
        image: campaignQuery.data.imageUrl,
        dungeons: campaignQuery.data.dungeons,
      });
    }
  }, [campaignQuery.data]);

  if (campaignQuery?.isInitialLoading)
    return <BoxSkeleton title={`${campaignId ? "EDIT" : "CREATE"} CAMPAIGN`} />;

  if (!!campaignId && !campaignQuery.data)
    return <div className="flex justify-center overflow-y-auto pb-8"> Something went wrong. </div>;

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex h-full w-full justify-between gap-12 pb-12 lg:overflow-y-hidden">
        <div className="flex w-full">
          <div className="flex h-full w-full">
            <SelectAdventuresCard isEditing={!!campaignId} />
          </div>
        </div>

        <RightCard campaignId={campaignId} />
      </div>
    </div>
  );
};

export default CreateCampaign;
