"use client";

import React from "react";
import { useParams } from "next/navigation";

import CreateCampaignSkeleton from "./components/create-campaign-skeleton";

const Loading = () => {
  const params = useParams();
  const campaignId = params.campaignId?.[0];

  return <CreateCampaignSkeleton isEditing={!!campaignId} />;
};

export default Loading;
