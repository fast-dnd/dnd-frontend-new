import { useReadLocalStorage } from "usehooks-ts";

import { IMove } from "@/types/room";

const MoveList = ({ moves }: { moves: IMove[] }) => {
  const accountId = useReadLocalStorage<string>("accountId");

  return (
    <>
      {moves.map((move) => (
        <div key={move.playerAccountId} className="flex flex-col gap-4">
          <div className="rounded-md bg-white/10 px-4 py-2 lg:text-lg">
            <span className="font-semibold">{move.playerName}: </span>
            {move.action}: {move.dice} 🎲
          </div>
          {!!move.aiDescription && move.playerAccountId === accountId && (
            <div className="flex flex-col gap-2 rounded-md bg-white/10 px-4 py-2 lg:text-lg">
              <p>
                <span className="font-semibold text-primary">Bob</span> thought:
              </p>
              <p>{move.aiDescription}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default MoveList;
