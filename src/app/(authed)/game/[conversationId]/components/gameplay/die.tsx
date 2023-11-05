import { cn } from "@/utils/style-utils";

import { dieMap } from "../../utils/dice";

const Die = ({ roll, big }: { roll: number; big?: boolean }) => {
  const dieRows = dieMap[roll];

  if (!dieRows)
    return (
      <div
        className={cn("flex h-14 w-14 flex-col rounded-lg bg-white p-1.5", big && "h-24 w-24")}
      />
    );

  return (
    <div className={cn("flex h-14 w-14 flex-col rounded-lg bg-white p-1.5", big && "h-24 w-24")}>
      {dieRows.map((row, i) => (
        <div key={i} className="flex w-full basis-1/3">
          {row.map((draw, j) => (
            <div
              key={j}
              className={cn(
                "flex h-full basis-1/3 items-center justify-center",
                !draw && "invisible",
              )}
            >
              <div className={cn("h-2 w-2 rounded-full bg-black", big && "h-3.5 w-3.5")} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Die;
