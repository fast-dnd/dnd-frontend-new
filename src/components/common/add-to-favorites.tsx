import { useEffect } from "react";
import { BookmarkSimple } from "@phosphor-icons/react";

import { useSoundSystem } from "@/components/common/music-settings-modal/sound-system";
import useAuth from "@/hooks/helpers/use-auth";

import useAddFavoriteCampaign from "@/app/(authed)/home/hooks/use-add-favorite-campaign";
import useAddFavoriteDungeon from "@/app/(authed)/home/hooks/use-add-favorite-dungeon";

const AddToFavorites = ({ type, id }: { type: "adventure" | "campaign"; id: string }) => {
  const { soundEnabled, soundVolume } = useSoundSystem();

  const { mutate: addFavoriteDungeon, isLoading: isAddingFavoriteDungeon } =
    useAddFavoriteDungeon();
  const { mutate: addFavoriteCampaign, isLoading: isAddingFavoriteCampaign } =
    useAddFavoriteCampaign();

  useEffect(() => {
    useSoundSystem.getState().hydrateFromLocalStorage();
  }, []);

  const { user } = useAuth();

  const isFavorite = user
    ? type === "adventure"
      ? user.account.favouriteDungeons.includes(id)
      : user.account.favouriteCampaigns.includes(id)
    : false;

  const addFavorite = () => {
    if (type === "adventure") {
      if (!isAddingFavoriteDungeon) addFavoriteDungeon(id);
    } else if (!isAddingFavoriteCampaign) addFavoriteCampaign(id);

    if (soundEnabled) {
      const audio = new Audio("/sounds/click.wav");
      audio.volume = soundVolume / 100;
      audio.play().catch(console.error);
    }
  };

  return (
    <div className="flex shrink-0" onClick={(e) => e.stopPropagation()}>
      <div
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-white/20 p-1 pr-2 transition-colors duration-300 hover:bg-white/20 lg:w-fit"
        onClick={addFavorite}
      >
        <BookmarkSimple size={20} weight={isFavorite ? "fill" : "regular"} />
        <p className="text-xs lg:text-sm">
          {isFavorite ? "Added to Favorites" : "Add to Favorites"}
        </p>
      </div>
    </div>
  );
};
export default AddToFavorites;
