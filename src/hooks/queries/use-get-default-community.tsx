import { useEffect } from "react";
import { useLocalStorage } from "@solana/wallet-adapter-react";

import communityService from "@/services/community-service";

const useGetDefaultCommunity = () => {
  const [defaultCommunityId, setDefaultCommunityId] = useLocalStorage<string | null>(
    "defaultCommunityId",
    null,
  );

  useEffect(() => {
    if (!defaultCommunityId) {
      communityService.getDefaultCommunity().then((data) => {
        setDefaultCommunityId(data._id);
      });
    }
  }, [defaultCommunityId, setDefaultCommunityId]);
};

export default useGetDefaultCommunity;
