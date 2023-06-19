import { cn } from "@/utils/style-utils";
import { dieMap } from "../utils/dice";

const Die = (props: { roll: number }) => {
  const dieRows = dieMap[props.roll];

  if (!dieRows) return <div className="h-14 w-14 p-1.5 flex flex-col rounded-lg bg-white" />;
  return (
    <div className="h-14 w-14 p-1.5 flex flex-col rounded-lg bg-white">
      {dieRows.map((row, i) => (
        <div key={i} className="flex w-full basis-1/3">
          {row.map((draw, j) => (
            <div
              key={j}
              className={cn(
                "flex items-center justify-center basis-1/3 h-full",
                !draw && "invisible",
              )}
            >
              <div className="h-2 w-2 bg-black rounded" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Die;
