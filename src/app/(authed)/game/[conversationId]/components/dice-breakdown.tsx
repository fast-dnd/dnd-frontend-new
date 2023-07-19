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
      <div className="flex w-full justify-between opacity-50">
        <div className="flex items-center gap-2">
          <BsFillArrowRightSquareFill /> Round bonus
        </div>
        <p>
          {rollInfo.diceBreakdown.bonusApplied > 0 && "+"}
          {rollInfo.diceBreakdown.bonusApplied}
        </p>
      </div>
      <div className="flex w-full justify-between opacity-50">
        <div className="flex items-center gap-2">
          <FaRobot /> Bob gave
        </div>
        <p>
          {rollInfo.diceBreakdown.aiDiceBonus > 0 && "+"}
          {rollInfo.diceBreakdown.aiDiceBonus}
        </p>
      </div>
      <div className="flex w-full justify-between opacity-50">
        <div className="flex items-center gap-2">
          <HiSparkles /> Mana used
        </div>
        <p>
          {rollInfo.diceBreakdown.mana > 0 && "+"}
          {rollInfo.diceBreakdown.mana}
        </p>
      </div>
    </div>
  );
};

export default DiceBreakdown;
