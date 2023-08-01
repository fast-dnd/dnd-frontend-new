"use client";

import { Button } from "@/components/ui/button";

const AddCampaign = () => {
  return (
    <div className="flex flex-row justify-end gap-8">
      <Button href="/create-campaign" className="w-full px-8 lg:w-fit">
        CREATE CAMPAIGN
      </Button>
    </div>
  );
};
export default AddCampaign;
