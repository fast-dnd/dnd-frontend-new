import React from "react";

import CreateCampaignSkeleton from "./components/create-campaign-skeleton";

const Loading = () => {
  return <CreateCampaignSkeleton isEditing={false} />;
};

export default Loading;
