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
    <div className="relative flex flex-col bg-black pb-4 lg:h-[350px] lg:w-[560px]">
      <Image
        src={"/images/bg-cover.png"} //TODO: replace this with banner image
        alt={community.name + " banner"}
        width={560}
        height={180}
        className="h-20 w-full rounded-t-lg lg:h-[180px] lg:w-[560px]"
      />
      <div className="absolute left-0 top-1/2 ml-5 translate-y-[-125%] rounded-lg bg-white p-1.5 drop-shadow-[4px_4px_0px_#FF5A5A] lg:translate-y-[-75%]">
        <Image
          src={"/images/default-avatar.png"} //TODO: replace this with avatar image
          alt={community.name + " banner"}
          width={100}
          height={100}
          className="h-[50px] w-[50px] rounded-full lg:h-[100px] lg:w-[100px]"
        />
      </div>

      <p className="ml-5 mt-8 text-xl font-bold lg:text-3xl">{community.name}</p>

      <Button
        variant="google"
        className="mx-5 mt-4 w-[calc(100%-2.5rem)] uppercase"
        onClick={onJoinCommunity}
      >
        {communityId === community._id ? "JOINED" : `EXPLORE ${community.name}`}
      </Button>
    </div>
  );
};

export default Community;
