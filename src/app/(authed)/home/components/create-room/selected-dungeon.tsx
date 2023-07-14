import Image from "next/image";

import { IDungeon } from "@/types/dnd";

const SelectedDungeon = ({ selectedDungeon }: { selectedDungeon: IDungeon }) => {
  return (
    <div className="flex flex-col gap-4 pr-0 lg:gap-8 lg:pr-4">
      <div className="flex gap-4 lg:gap-8">
        <Image
          src={selectedDungeon.imageUrl || "/images/default-dungeon.png"}
          alt={selectedDungeon.name}
          width={180}
          height={180}
          className="h-20 w-20 lg:h-[180px] lg:w-[180px]"
        />
        <p className="inline break-all font-medium uppercase leading-7 tracking-widest lg:hidden lg:text-[22px] lg:tracking-[0.15em]">
          {selectedDungeon.name}
        </p>
        <div className="hidden flex-col gap-4 lg:flex">
          <p className="font-medium uppercase leading-7 tracking-widest lg:text-[22px] lg:tracking-[0.15em]">
            {selectedDungeon.name}
          </p>
          <div className="hidden flex-wrap gap-2 lg:flex lg:gap-4">
            {selectedDungeon.tags.map((tag) => (
              <div key={tag} className="border-[1.5px] border-white/25">
                <p className="px-1.5 py-1 text-sm capitalize leading-7 tracking-[2.4px] lg:px-3">
                  {tag}
                </p>
              </div>
            ))}
          </div>
          <p className="text-sm font-light tracking-widest lg:text-lg">
            {selectedDungeon.description}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 lg:hidden lg:gap-4">
        {selectedDungeon.tags.map((tag) => (
          <div key={tag} className="border-[1.5px] border-white/25">
            <p className="px-1.5 py-1 text-sm capitalize leading-7 tracking-[2.4px] lg:px-3">
              {tag}
            </p>
          </div>
        ))}
      </div>
      <p className="inline text-sm font-light tracking-widest lg:hidden lg:text-lg">
        {selectedDungeon.description}
      </p>
    </div>
  );
};

export default SelectedDungeon;
