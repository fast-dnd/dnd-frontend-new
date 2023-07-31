import { IMove } from "@/types/game";

const MoveList = ({ moves }: { moves: IMove[] }) => {
  return (
    <>
      {moves.map((move) => (
        <div key={move.playerAccountId} className="flex flex-col gap-4">
          <div className="bg-white/10 px-4 py-2 lg:text-lg">
            <span className="font-semibold">{move.playerName}: </span>
            {move.action}: {move.dice} 🎲
          </div>
          {!!move.aiDescription && move.playerAccountId === localStorage.getItem("accountId") && (
            <div className="flex flex-col gap-2 bg-white/10 px-4 py-2 lg:text-lg">
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
