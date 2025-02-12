import { useState } from "react";
import { useDebounce } from "usehooks-ts";

import { Tooltip } from "@/components/ui/tooltip";
import useAuth from "@/hooks/helpers/use-auth";
import useIntersectionObserver from "@/hooks/helpers/use-intersection-observer";
import useGetCampaigns from "@/hooks/queries/use-get-campaigns";
import { cn } from "@/utils/style-utils";

import { tabStore } from "../../stores/tab-store";
import { MobileCampaign } from "./mobile-campaign";
import MobileFilter from "./mobile-filter";
import MobileSearch from "./mobile-search";

interface IMobileCampaignsProps {
  campaignDetailId?: string | undefined;
  setCampaignDetailId: React.Dispatch<React.SetStateAction<string | undefined>>;
  closingId?: string | undefined;
  animate?: boolean;
}

const MobileCampaigns = ({
  campaignDetailId,
  setCampaignDetailId,
  closingId,
  animate,
}: IMobileCampaignsProps) => {
  const [opening, setOpening] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchName, setSearchName] = useState<string>();
  const debouncedName = useDebounce<string | undefined>(searchName, 500);

  const { user } = useAuth();
  const isCampaignsLocked = (user?.account?.level ?? 0) <= 1;

  const [filter, setFilter] = useState(false);
  const subTab = tabStore.subTab.use();

  const {
    data: campaignsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useGetCampaigns({ filter: subTab || "owned", name: debouncedName });

  const { lastObjectRef: lastCampaignRef } = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });

  if (isError) return <div>Something went wrong</div>;

  const content = campaignsData?.pages.map((page) =>
    page.campaigns.map((campaign, i) => {
      if (page.campaigns.length === i + 1) {
        return (
          <MobileCampaign
            key={`${subTab}${campaign._id}`}
            closingId={closingId}
            ref={lastCampaignRef}
            campaign={campaign}
            campaignDetailId={campaignDetailId}
            setCampaignDetailId={setCampaignDetailId}
            opening={opening}
            setOpening={setOpening}
            animate={animate}
            addFavorite
          />
        );
      }
      return (
        <MobileCampaign
          key={`${subTab}${campaign._id}`}
          closingId={closingId}
          campaign={campaign}
          campaignDetailId={campaignDetailId}
          setCampaignDetailId={setCampaignDetailId}
          opening={opening}
          setOpening={setOpening}
          animate={animate}
          addFavorite
        />
      );
    }),
  );

  return (
    <div className={cn("flex flex-col gap-2 px-4 py-2")}>
      <div className="relative flex items-center gap-2">
        <div
          className={cn(
            "flex flex-1 opacity-100 transition-opacity duration-300",
            searchOpen && "opacity-0",
          )}
        >
          {isLoading ? (
            <div className="h-5 w-40 rounded bg-gray-700/80" />
          ) : (
            <p className="text-sm font-medium uppercase">{subTab} CAMPAIGNS</p>
          )}
        </div>

        <MobileSearch open={searchOpen} setOpen={setSearchOpen} setSearchName={setSearchName} />
        <MobileFilter open={filter} setOpen={setFilter} />
      </div>

      {isLoading ? (
        <div className={cn("flex flex-col gap-4 overflow-hidden")}>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className={cn("h-[102px] w-full shrink-0 rounded-lg bg-gray-700/80")} />
          ))}
        </div>
      ) : (
        <Tooltip
          content="Campaigns are unlocked after completing your first adventure!"
          contentClassName="p-4 w-[270px] whitespace-normal"
          disabled={!isCampaignsLocked}
        >
          <div
            className={cn(
              "flex flex-col gap-4",
              isCampaignsLocked && "pointer-events-none opacity-50",
            )}
          >
            {content}
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default MobileCampaigns;
