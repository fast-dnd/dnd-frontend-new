import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { ICommunity } from "@/types/community";

const Community = ({ community }: { community: ICommunity }) => {
  const router = useRouter();

  const [communityId, setCommunityId] = useLocalStorage<string | null>("communityId", null);

  const onJoinCommunity = () => {
    setCommunityId(community._id);
    router.push("/home");
  };

  return (
    <div className="relative flex flex-col gap-4 rounded-lg bg-black pb-3 lg:w-[665px] lg:pb-5">
      <div className="flex flex-col gap-8 lg:gap-12">
        <div className="relative h-20 lg:h-[215px] lg:w-[665px]">
          <div className="absolute inset-0 overflow-hidden rounded-t-lg">
            <Image
              src={"/images/bg-cover.png"} //TODO: replace this with banner image
              alt={community.name + " banner"}
              width={665}
              height={665}
              className="absolute w-full object-cover"
            />
          </div>

          <div className="absolute -bottom-4 left-4 rounded-lg bg-white drop-shadow-[2px_2px_0px_#FF5A5A] lg:-bottom-8 lg:left-8 lg:drop-shadow-[4px_4px_0px_#FF5A5A]">
            <Image
              src={"/images/default-avatar.png"} //TODO: replace this with avatar image
              alt={community.name + " banner"}
              width={120}
              height={120}
              className="h-[50px] w-[50px] rounded-full lg:h-[120px] lg:w-[120px]"
            />
          </div>
        </div>

        <div className="flex justify-between px-4 lg:px-8">
          <p className="text-xl font-bold lg:text-3xl">{community.name}</p>
        </div>
      </div>
      <div className="px-4 lg:px-8">
        <Button variant="google" className="uppercase" onClick={onJoinCommunity}>
          {communityId === community._id ? "JOINED" : `EXPLORE ${community.name}`}
        </Button>
      </div>
    </div>
  );
};

export default Community;
