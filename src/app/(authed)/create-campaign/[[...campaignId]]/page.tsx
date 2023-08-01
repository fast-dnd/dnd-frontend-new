"use client";

import useGetCampaign from "@/hooks/use-get-campaign";
import BoxSkeleton from "@/components/BoxSkeleton";

import CreateCampaignForm from "./components/create-campaign-form";

const CreateCampaign = ({ params }: { params: { campaignId?: [string] } }) => {
  const campaignId = params.campaignId?.[0];

  const campaignQuery = useGetCampaign(campaignId);

  if (campaignQuery?.isInitialLoading)
    return <BoxSkeleton title={`${campaignId ? "EDIT" : "CREATE"} CAMPAIGN`} />;

  if (!!campaignId && !campaignQuery.data)
    return <div className="flex justify-center overflow-y-auto pb-8"> Something went wrong. </div>;

  return <CreateCampaignForm campaign={campaignQuery.data} />;
};

export default CreateCampaign;
