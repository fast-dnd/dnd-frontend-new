"use client";

import { useGetKingdom } from "@/hooks/use-get-kingdom";

import MyAccount from "./components/my-account";
import MyCollection from "./components/my-collection";

const Profile = () => {
  const { data: kingdomData, isLoading: isLoadingKingdomData } = useGetKingdom();

  if (isLoadingKingdomData) return <div>Loading...</div>;

  if (!kingdomData) return <div>Something went wrong</div>;

  return (
    <div className="flex gap-12">
      <MyAccount statistics={kingdomData.statistics} />
      <MyCollection />
    </div>
  );
};

export default Profile;
