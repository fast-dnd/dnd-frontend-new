import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useAddFavoriteCampaign from "../../../hooks/use-add-favorite-campaign";
import useAddFavoriteDungeon from "../../../hooks/use-add-favorite-dungeon";
import { tabStore } from "../../../stores/tab-store";

const AddFavoriteFooter = () => {
  const activeBaseTab = tabStore.baseTab.use();

  const [favId, setFavId] = useState("");

  const { mutate: addFavoriteDungeon, isLoading: isAddingFavoriteDungeon } =
    useAddFavoriteDungeon();
  const { mutate: addFavoriteCampaign, isLoading: isAddingFavoriteCampaign } =
    useAddFavoriteCampaign();

  useEffect(() => {
    setFavId("");
  }, [activeBaseTab]);

  return (
    <div className="flex justify-end gap-8">
      <div>
        <Input
          placeholder={`${activeBaseTab === "adventures" ? "Adventure" : "Campaign"} ID`}
          className="w-64"
          onChange={(e) => setFavId(e.target.value)}
        />
      </div>

      <Button
        className="mb-1 w-fit whitespace-nowrap"
        variant="outline"
        isLoading={
          activeBaseTab === "adventures" ? isAddingFavoriteDungeon : isAddingFavoriteCampaign
        }
        onClick={() =>
          activeBaseTab === "adventures" ? addFavoriteDungeon(favId) : addFavoriteCampaign(favId)
        }
      >
        ADD FAVORITE
      </Button>
    </div>
  );
};

export default AddFavoriteFooter;
