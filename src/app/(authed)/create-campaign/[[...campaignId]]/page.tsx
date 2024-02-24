"use client";

import useGetCampaign from "@/hooks/queries/use-get-campaign";

import RightCard from "./components/create-campaign-card";
import CreateCampaignSkeleton from "./components/create-campaign-skeleton";
import SelectAdventuresCard from "./components/select-adventures-card";
import useLoadCampaignData from "./hooks/use-load-campaign-data";

const CreateCampaign = ({ params }: { params: { campaignId?: [string] } }) => {
  const campaignId = params.campaignId?.[0];

  const campaignQuery = useGetCampaign(campaignId);

  useLoadCampaignData({ data: campaignQuery.data });

  if (campaignQuery?.isInitialLoading) return <CreateCampaignSkeleton isEditing={!!campaignId} />;

  if (!!campaignId && !campaignQuery.data)
    return <div className="flex justify-center overflow-y-auto pb-8"> Something went wrong. </div>;

  return (
    <div className="size-full overflow-y-auto">
      <div className="flex size-full justify-between gap-12 pb-12 lg:overflow-y-hidden">
        <SelectAdventuresCard isEditing={!!campaignId} />

        <RightCard campaignId={campaignId} />
      </div>
    </div>
  );
};

export default CreateCampaign;
