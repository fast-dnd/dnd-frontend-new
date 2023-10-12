"use client";

import React from "react";
import { useParams } from "next/navigation";

import CreateCampaignSkeleton from "./components/create-campaign-skeleton";

const Loading = () => {
  const params = useParams();
  const dungeonId = params.campaignId?.[0];

  return <CreateCampaignSkeleton isEditing={!!dungeonId} />;
};

export default Loading;
