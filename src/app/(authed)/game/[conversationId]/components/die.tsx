import { cn } from "@/utils/style-utils";

import { dieMap } from "../utils/dice";

const Die = (props: { roll: number }) => {
  const dieRows = dieMap[props.roll];

  if (!dieRows) return <div className="flex h-14 w-14 flex-col rounded-lg bg-white p-1.5" />;
  return (
    <div className="flex h-14 w-14 flex-col rounded-lg bg-white p-1.5">
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
              <div className="h-2 w-2 rounded bg-black" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Die;
