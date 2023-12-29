import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { cn } from "@/utils/style-utils";

const Controls = ({
  currentIndex,
  setCurrentIndex,
}: {
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex w-full items-center gap-1">
      <AiOutlineLeft
        onClick={() => {
          setCurrentIndex(currentIndex - 1);
        }}
        className={cn(
          "text-xs opacity-100 transition-opacity duration-200",
          currentIndex === 0 && "pointer-events-none opacity-0",
        )}
      />
      <div className="flex flex-1 items-center gap-0.5">
        {Array.from({ length: 10 }, (_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={cn(
              "flex h-0.5 basis-[10%] rounded-full bg-white/20 transition-colors duration-200",
              currentIndex >= i && "bg-white",
            )}
          />
        ))}
      </div>
      <AiOutlineRight
        onClick={() => {
          setCurrentIndex(currentIndex + 1);
        }}
        className={cn(
          "text-xs opacity-100 transition-opacity duration-200",
          currentIndex === 9 && "pointer-events-none opacity-0",
        )}
      />
    </div>
  );
};

export default Controls;
