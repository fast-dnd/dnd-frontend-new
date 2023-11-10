import React, { useState } from "react";
import { Copy } from "iconsax-react";

import DeleteModal from "@/components/delete-modal";
import Spinner from "@/components/ui/spinner";
import useCopy from "@/hooks/helpers/use-copy";
import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import useGetCampaigns from "@/hooks/queries/use-get-campaigns";
import { ICampaign } from "@/types/campaign";
import { cn } from "@/utils/style-utils";

import { MobileCampaign } from "@/app/(authed)/home/components/mobile/mobile-campaign";
import MobileCampaignDetail from "@/app/(authed)/home/components/mobile/mobile-campaign-detail";

const Campaigns = () => {
  const [campaignDetailId, setCampaignDetailId] = useState<string>();
  const [adventureDetailId, setAdventureDetailId] = useState<string>();

  const [closingAdventureId, setClosingAdventureId] = useState<string>();
  const [closingCampaignId, setClosingCampaignId] = useState<string>();

  const [opening, setOpening] = useState(false);

  const { copied, onCopy } = useCopy();

  const onClose = adventureDetailId
    ? () => {
        setClosingAdventureId(adventureDetailId);
        setAdventureDetailId(undefined);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setTimeout(() => setClosingAdventureId(undefined), 500);
      }
    : campaignDetailId
    ? () => {
        setClosingCampaignId(campaignDetailId);
        setCampaignDetailId(undefined);
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setTimeout(() => setClosingCampaignId(undefined), 500);
      }
    : undefined;

  const {
    data: campaignsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useGetCampaigns({ filter: "top" }); //TODO: return this to owned

  const { lastObjectRef: lastAdventureRef } = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });

  if (isError) return <div>Something went wrong</div>;

  if (isLoading)
    return (
      <div className={cn("flex animate-pulse flex-col gap-4 px-4 py-2")}>
        <div className={cn("flex flex-col gap-4 overflow-hidden")}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex flex-col gap-1 bg-transparent">
              <div className={cn("h-[102px] w-full shrink-0 rounded-lg bg-gray-600")} />
              <div className="flex w-full gap-1">
                <div className="h-5 w-40 animate-pulse rounded bg-gray-600" />
                <div className="h-5 w-40 animate-pulse rounded bg-gray-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  const content = campaignsData.pages.map((page) =>
    page.campaigns.map((campaign, i) => {
      if (page.campaigns.length === i + 1) {
        return (
          <CampaignWrapper
            key={campaign._id}
            campaign={campaign}
            campaignDetailId={campaignDetailId}
            opening={opening}
            onCopy={onCopy}
          >
            <MobileCampaign
              key={campaign._id}
              ref={lastAdventureRef}
              closingId={closingCampaignId}
              campaign={campaign}
              campaignDetailId={campaignDetailId}
              setCampaignDetailId={setCampaignDetailId}
              opening={opening}
              setOpening={setOpening}
            />
          </CampaignWrapper>
        );
      }
      return (
        <CampaignWrapper
          key={campaign._id}
          campaign={campaign}
          campaignDetailId={campaignDetailId}
          opening={opening}
          onCopy={onCopy}
        >
          <MobileCampaign
            key={campaign._id}
            closingId={closingCampaignId}
            campaign={campaign}
            campaignDetailId={campaignDetailId}
            setCampaignDetailId={setCampaignDetailId}
            opening={opening}
            setOpening={setOpening}
          />
        </CampaignWrapper>
      );
    }),
  );

  return campaignsData.pages[0].campaigns.length === 0 ? (
    <NoCampaigns />
  ) : (
    <div className="relative flex w-full flex-1 flex-col gap-4">
      {content}
      <MobileCampaignDetail
        hideStartButton
        onClose={onClose}
        campaignDetailId={campaignDetailId}
        closingId={closingAdventureId}
        adventureDetailId={adventureDetailId}
        setAdventureDetailId={setAdventureDetailId}
      />

      {isFetchingNextPage && (
        <div className="flex h-10 justify-center">
          <Spinner className="m-0 h-8 w-8" />
        </div>
      )}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-10 bg-dark-900 opacity-0 transition-all duration-500",
          campaignDetailId && "pointer-events-auto opacity-100",
        )}
      />
    </div>
  );
};

export default Campaigns;

const CampaignWrapper = ({
  children,
  campaign,
  campaignDetailId,
  opening,
  onCopy,
}: {
  children: React.ReactNode;
  campaign: ICampaign;
  campaignDetailId?: string | undefined;
  opening: boolean;
  onCopy: (text: string) => void;
}) => (
  <div
    className={cn(
      "flex flex-col gap-0.5",
      !!campaignDetailId && "pointer-events-none",
      !!campaignDetailId && campaignDetailId !== campaign._id && !opening && "hidden",
    )}
  >
    {children}
    <div
      className={cn(
        "flex w-full gap-0.5 opacity-100 transition-all duration-500",
        !!campaignDetailId && !opening && "opacity-0",
      )}
    >
      <button
        className="flex w-1/2 items-center justify-center gap-1 rounded-bl-md bg-black py-1"
        onClick={() => onCopy(campaign._id)}
      >
        Copy ID
        <Copy variant="Bold" />
      </button>
      <DeleteModal id={campaign._id} type="campaign" />
    </div>
  </div>
);

const NoCampaigns = () => (
  <div className="flex w-full flex-1 items-center justify-center">
    <div className="flex h-full w-[490px] flex-col items-center justify-start gap-5 p-5 lg:gap-3 lg:p-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="49"
        height="46"
        viewBox="0 0 49 46"
        fill="none"
      >
        <path
          d="M11.7933 25.7592L20.8659 34.3422L17.2399 37.7738L20.8705 41.2092L17.2408 44.6419L10.8899 38.6335L3.62965 45.5L0 42.0673L7.26022 35.2008L0.907424 29.1943L4.53705 25.7616L8.16582 29.1917L11.7933 25.7592ZM1.4012 0.5L10.5021 0.508132L40.8317 29.1929L44.4629 25.7616L48.0927 29.1943L41.7408 35.2018L49 42.0673L45.3704 45.5L38.1112 38.6345L31.7593 44.6419L28.1297 41.2092L31.7578 37.7747L1.40823 9.07138L1.4012 0.5ZM38.5062 0.500242L47.5989 0.508132L47.6038 9.05997L37.2019 18.8946L28.1266 10.314L38.5062 0.500242Z"
          fill="white"
        />
      </svg>
      <p className="text-center text-lg font-semibold uppercase leading-7 tracking-[3.30px] lg:text-xl">
        No Campaigns in Your Quest Log Yet!
      </p>
      <p className="text-center text-sm font-normal lg:text-base">
        To start a campaign switch to your desktop and follow a step-by-step process.
      </p>
    </div>
  </div>
);
