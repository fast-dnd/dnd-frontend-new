import Image from "next/image";

import { IDungeon } from "@/types/dnd";
import { cn } from "@/utils/style-utils";

const CreateRoomDungeon = ({
  dungeon,
  selectedDungeon,
  setSelectedDungeon,
}: {
  dungeon: IDungeon;
  selectedDungeon: IDungeon | undefined;
  setSelectedDungeon: React.Dispatch<React.SetStateAction<IDungeon | undefined>>;
}) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer flex-row gap-8 rounded-md border border-white/10 p-4 pr-0 transition-all duration-300 hover:bg-white/5 lg:border-0",
        dungeon === selectedDungeon && "bg-white/5",
      )}
      onClick={() => setSelectedDungeon(selectedDungeon === dungeon ? undefined : dungeon)}
    >
      <Image
        src={dungeon.imageUrl || "/images/default-dungeon.png"}
        alt={dungeon.name}
        width={180}
        height={180}
        className="hidden lg:block lg:h-[180px] lg:w-[180px]"
      />
      <div className="flex w-full flex-col gap-2 pr-4 lg:gap-4 lg:py-4">
        <div className="hidden flex-row justify-between lg:flex">
          <p className="order-1 truncate text-center text-lg font-medium uppercase leading-7 tracking-widest lg:text-left lg:text-[22px] lg:tracking-[0.15em]">
            {dungeon.name}
          </p>
        </div>
        <p className="order-1 truncate text-center text-lg font-medium uppercase leading-7 tracking-widest lg:hidden lg:text-left lg:text-[22px] lg:tracking-[0.15em]">
          {dungeon.name}
        </p>

        <p className="order-2 line-clamp-2 break-all pr-2 text-center text-lg font-light tracking-widest lg:order-3 lg:text-left">
          {dungeon.description}
        </p>
        <div className="order-4 flex flex-wrap gap-2 lg:gap-4">
          {dungeon.tags.map((tag) => (
            <div key={tag} className="border-[1.5px] border-white/25">
              <p className="px-1.5 py-1 text-sm capitalize leading-7 tracking-[2.4px] lg:px-3">
                {tag}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateRoomDungeon;
