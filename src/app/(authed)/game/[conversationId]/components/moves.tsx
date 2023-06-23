import { IMove } from "@/services/room-service";

const Moves = ({ moves }: { moves: IMove[] }) => {
  return (
    <>
      {moves.map((move) => (
        <div key={move.playerAccountId} className="flex flex-col gap-4">
          <div className="bg-white/10 text-lg px-4 py-2">
            <span className="font-semibold">{move.playerName}: </span>
            {move.action} - {move.dice} 🎲
          </div>
          {!!move.aiDescription && move.playerAccountId === localStorage.getItem("accountId") && (
            <div className="flex flex-col gap-2 bg-white/10 text-lg px-4 py-2">
              <p>
                <span className="font-semibold text-tomato">Bob</span> thought:
              </p>
              <p>{move.aiDescription}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Moves;
