import { useReadLocalStorage } from "usehooks-ts";

const useCommunity = () => {
  const defaultCommunityId = useReadLocalStorage<string>("defaultCommunityId");
  const communityId = useReadLocalStorage<string>("communityId") ?? defaultCommunityId;
  const isDefault = Boolean(
    defaultCommunityId && communityId && defaultCommunityId === communityId,
  );

  return { defaultCommunityId, communityId, isDefault };
};

export default useCommunity;
