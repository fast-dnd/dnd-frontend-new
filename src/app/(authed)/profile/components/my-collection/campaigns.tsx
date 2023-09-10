import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useGetMyCampaigns } from "@/app/(authed)/home/hooks/use-get-home-data";

const Campaigns = () => {
  const { data: myCampaigns, isLoading } = useGetMyCampaigns(true);

  if (isLoading) return <div>Loading...</div>;

  if (!myCampaigns) return <div>Something went wrong</div>;

  return myCampaigns.length === 0 ? (
    <NoCampaigns />
  ) : (
    <div className="flex h-[500px] flex-col gap-8 overflow-y-auto">
      {myCampaigns.map((campaign) => (
        <div key={campaign._id} className="flex gap-8 rounded-md hover:bg-white/5">
          <Image
            src={campaign.imageUrl || "/images/default-dungeon.png"}
            alt={campaign.name ?? ""}
            width={200}
            height={200}
            className="h-16 w-16 rounded-md lg:h-[180px] lg:w-[180px]"
          />
          <div className="flex w-full flex-col gap-4">
            <p className="text-2xl font-bold uppercase">{campaign.name}</p>
            <p className="text-xl">{campaign.description}</p>
            <div className="mb-1 mt-auto flex w-full justify-between"></div>
          </div>
        </div>
      ))}
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
      <Button>CREATE NEW CAMPAIGN</Button>
    </div>{" "}
  </div>
);
