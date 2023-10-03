"use client";

import { useEffect } from "react";

import useGetCampaign from "@/hooks/use-get-campaign";
import { Box } from "@/components/ui/box";
import Skeleton from "@/components/ui/skeleton";

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
    return (
      <div className="h-full w-full overflow-y-auto">
        <div className="flex h-full w-full justify-between gap-12 pb-12 lg:overflow-y-hidden">
          <div className="flex h-full w-full">
            <Box
              title="EDIT Campaign"
              className="mb-4 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 lg:mb-0 lg:gap-6 lg:p-8"
              wrapperClassName="w-[95%] lg:w-[1200px] mx-auto"
            >
              <div className="h-8 w-20 animate-pulse rounded-lg bg-gray-600" />
              <div className="h-8 w-[600px] animate-pulse rounded-full bg-gray-600" />
              <div className="hidden w-full border-t border-white/20 lg:block" />

              <div className="flex flex-col gap-8">
                <Skeleton amount={2} />
              </div>
            </Box>
          </div>
          <Box
            title="CAMPAIGN"
            wrapperClassName="h-full"
            className="flex h-full min-h-0 w-full flex-col items-center justify-between overflow-y-auto p-8"
          >
            <div className="flex h-full min-h-0 w-full animate-pulse flex-col gap-6 overflow-y-hidden">
              <div className="flex items-center justify-between">
                <div className="h-20 w-52 rounded-lg bg-gray-600" />
                <div className="h-[170px] w-[170px] rounded-lg bg-gray-600" />
              </div>
              <div className="h-28 w-full rounded-lg bg-gray-600" />
              <div className="hidden w-full border-t border-white/20 lg:block" />
              <div className="h-5 w-36 rounded-lg bg-gray-600" />
              <div className="flex flex-col gap-4">
                {Array.from({ length: 2 }, (_, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-gray-600" />
                    <div className="flex flex-col">
                      <div className="h-4 w-28 rounded-lg bg-gray-600" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Box>
        </div>
      </div>
    );

  if (!!campaignId && !campaignQuery.data)
    return <div className="flex justify-center overflow-y-auto pb-8"> Something went wrong. </div>;

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex h-full w-full justify-between gap-12 pb-12 lg:overflow-y-hidden">
        <div className="flex h-full w-full">
          <SelectAdventuresCard isEditing={!!campaignId} />
        </div>

        <RightCard campaignId={campaignId} />
      </div>
    </div>
  );
};

export default CreateCampaign;
