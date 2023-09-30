import useGetCampaigns from "@/hooks/use-get-campaigns";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import Skeleton from "@/components/ui/skeleton";
import { Campaign } from "@/components/campaign";

const Campaigns = ({
  setCampaignDetailId,
  filter,
}: {
  setCampaignDetailId?: React.Dispatch<React.SetStateAction<string | undefined>>;
  filter?: string;
}) => {
  const {
    data: campaignsData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useGetCampaigns({ filter: filter || "owned" });

  const { lastObjectRef: lastCampaignRef } = useIntersectionObserver({
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  });

  if (isError) return <div>Something went wrong</div>;

  if (isLoading) {
    return (
      <div className="no-scrollbar flex flex-1 flex-col gap-8 overflow-y-auto">
        <Skeleton amount={2} />
      </div>
    );
  }

  const content = campaignsData.pages.map((page) =>
    page.campaigns.map((campaign, i) => {
      if (page.campaigns.length === i + 1) {
        return (
          <Campaign
            key={campaign._id}
            campaign={campaign}
            ref={lastCampaignRef}
            setCampaignDetailId={setCampaignDetailId}
          />
        );
      }
      return (
        <Campaign
          key={campaign._id}
          campaign={campaign}
          setCampaignDetailId={setCampaignDetailId}
        />
      );
    }),
  );

  return campaignsData.pages[0].campaigns.length === 0 ? (
    <NoCampaigns />
  ) : (
    <div className="flex flex-col gap-8 overflow-y-auto">
      {content}
      {isFetchingNextPage && <div className="flex w-full text-center text-2xl">Loading...</div>}
    </div>
  );
};

export default Campaigns;

const NoCampaigns = () => (
  <div className="flex w-full items-center justify-center">
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
        Every epic journey starts with a single step. Campaigns are collections of thrilling
        adventures ready to be explored. Start by creating your first campaign, weave multiple
        adventures together, and lead adventurers on a journey they&apos;ll never forget!
      </p>
      <Button href="/create-campaign">CREATE NEW CAMPAIGN</Button>
    </div>
  </div>
);
