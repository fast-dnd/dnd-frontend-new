import { IconType } from "react-icons";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { FaDice, FaRobot } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

import { IPlayMoveResponse } from "@/types/game";

const DiceBreakdown = ({ rollInfo }: { rollInfo: IPlayMoveResponse }) => {
  return (
    <div className="flex w-full flex-col px-4">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2">
          <FaDice /> You rolled
        </div>
        <p>{rollInfo.diceBreakdown.dice}</p>
      </div>
      <DiceBreakdownItem
        Icon={BsFillArrowRightSquareFill}
        label="Round bonus"
        value={rollInfo.diceBreakdown.bonusApplied}
      />
      <DiceBreakdownItem
        Icon={FaRobot}
        label="Bob gave"
        value={rollInfo.diceBreakdown.aiDiceBonus}
      />
      <DiceBreakdownItem Icon={HiSparkles} label="Mana used" value={rollInfo.diceBreakdown.mana} />
    </div>
  );
};

export default DiceBreakdown;

type Props = {
  Icon: IconType;
  label: string;
  value: number;
};

const DiceBreakdownItem = ({ Icon, label, value }: Props) => {
  return (
    <div className="flex w-full justify-between opacity-50">
      <div className="flex items-center gap-2">
        <Icon /> {label}
      </div>
      <p>
        {value > 0 && "+"}
        {value}
      </p>
    </div>
  );
};
