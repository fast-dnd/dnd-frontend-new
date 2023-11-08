import { useState } from "react";
import { PiSlidersFill } from "react-icons/pi";

import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import useGetCampaigns from "@/hooks/queries/use-get-campaigns";
import { cn } from "@/utils/style-utils";

import { MobileCampaign } from "./mobile-campaign";

const MobileCampaigns = ({
  campaignDetailId,
  setCampaignDetailId,
  closingId,
  animate,
}: {
  campaignDetailId?: string | undefined;
  setCampaignDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  closingId?: string | undefined;
  animate?: boolean;
}) => {
  const {
    data: campaignsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useGetCampaigns({ filter: "top" || "owned" });

  const [opening, setOpening] = useState(false);

  const { lastObjectRef: lastCampaignRef } = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });

  if (isError) return <div>Something went wrong</div>;

  if (isLoading)
    return (
      <div className={cn("flex animate-pulse flex-col gap-4 px-4 py-2")}>
        <div className="h-5 w-40 rounded bg-gray-700/80" />
        <div className={cn("flex flex-col gap-4 overflow-hidden")}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className={cn("h-[102px] w-full shrink-0 rounded-lg bg-gray-700/80")} />
          ))}
        </div>
      </div>
    );

  const content = campaignsData.pages.map((page) =>
    page.campaigns.map((campaign, i) => {
      if (page.campaigns.length === i + 1) {
        return (
          <MobileCampaign
            key={campaign._id}
            closingId={closingId}
            ref={lastCampaignRef}
            campaign={campaign}
            campaignDetailId={campaignDetailId}
            setCampaignDetailId={setCampaignDetailId}
            opening={opening}
            setOpening={setOpening}
            animate={animate}
          />
        );
      }
      return (
        <MobileCampaign
          key={campaign._id}
          closingId={closingId}
          campaign={campaign}
          campaignDetailId={campaignDetailId}
          setCampaignDetailId={setCampaignDetailId}
          opening={opening}
          setOpening={setOpening}
          animate={animate}
        />
      );
    }),
  );

  return (
    <div className={cn("flex flex-col gap-2 px-4 py-2")}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium uppercase">ALL CAMPAIGNS</p>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[8%] bg-black">
          <PiSlidersFill />
        </div>
      </div>

      <div className={cn("flex flex-col gap-4")}>{content}</div>
    </div>
  );
};

export default MobileCampaigns;
