import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import communityService from "@/services/community-service";

const useSetDefaultCommunity = () => {
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

export default useSetDefaultCommunity;
