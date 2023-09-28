"use client";

import useGetCampaign from "@/hooks/use-get-campaign";
import useGetDungeons from "@/hooks/use-get-dungeons";
import BoxSkeleton from "@/components/box-skeleton";

import CreateCampaignForm from "./components/create-campaign-form";

const CreateCampaign = ({ params }: { params: { campaignId?: [string] } }) => {
  const campaignId = params.campaignId?.[0];

  const { data: myDungeons, isLoading, isError } = useGetDungeons({ filter: "owned" });

  const campaignQuery = useGetCampaign(campaignId);

  if (campaignQuery?.isInitialLoading || isLoading)
    return <BoxSkeleton title={`${campaignId ? "EDIT" : "CREATE"} CAMPAIGN`} />;

  if ((!!campaignId && !campaignQuery.data) || !myDungeons || isError)
    return <div className="flex justify-center overflow-y-auto pb-8"> Something went wrong. </div>;

  return <CreateCampaignForm campaign={campaignQuery.data} myDungeons={myDungeons} />;
};

export default CreateCampaign;
