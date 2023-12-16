import Rewards from "@/components/rewards";
import { Button } from "@/components/ui/button";
import { IReward } from "@/types/reward";

import { dungeonFormStore } from "../stores/dungeon-form-store";

interface ISelectBgScreenProps {
  setSelectedReward: React.Dispatch<React.SetStateAction<IReward | null>>;
  setSelectingBg: (selecting: boolean) => void;
}
const SelectBgScreen = ({ setSelectedReward, setSelectingBg }: ISelectBgScreenProps) => {
  const bgObs = dungeonFormStore.dungeonFormData.background;
  const bg = bgObs.use();

  return (
    <div className="flex flex-1 flex-col">
      <Rewards
        selectedReward={bg}
        onSelectReward={(reward) => {
          setSelectedReward((prev) => (prev === null ? reward : null));
          bgObs.set(bg === null ? reward : null);
        }}
      />
      <div className="mt-8 flex justify-end">
        <Button className="w-fit" onClick={() => setSelectingBg(false)}>
          CHOOSE BACKGROUND
        </Button>
      </div>
    </div>
  );
};

export default SelectBgScreen;
