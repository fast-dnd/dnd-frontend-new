import { useState } from "react";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ObservableObject } from "@legendapp/state";
import { AddCircle } from "iconsax-react";

import CastleIcon from "@/components/icons/castle-icon";
import HelmetIcon from "@/components/icons/helmet-icon";
import { Button } from "@/components/ui/button";
import { IChampion, ILocation } from "@/types/dungeon";

import { dungeonFormStore } from "../stores/dungeon-form-store";
import Champion from "./champion";
import Location from "./location";
import SortableItem from "./sortable-item";

export interface IChampionsLocationsWrapperProps {
  locationOrChampion: "Scene" | "Character";
}

const ChampionsLocationsWrapper = ({ locationOrChampion }: IChampionsLocationsWrapperProps) => {
  const statusObs = dungeonFormStore.status;
  const status = statusObs.use();

  const dungeonFormField = locationOrChampion === "Scene" ? "locations" : "champions";
  type ObservableChampionLocation = ObservableObject<(ILocation | IChampion)[]>;

  const { dungeonFormData } = dungeonFormStore.use();

  const isDisabledAddButton =
    (locationOrChampion === "Scene" && dungeonFormData.locations.length >= 4) ||
    (locationOrChampion === "Character" && dungeonFormData.champions.length >= 2);

  const chmpLocObservable = dungeonFormStore.dungeonFormData[
    dungeonFormField
  ] as ObservableChampionLocation;

  const [editIndex, setEditIndex] = useState(-1);

  const onEdit = (index: number) => {
    setEditIndex(index);
    statusObs.set("EDITING");
  };

  const onDelete = (index: number) => {
    chmpLocObservable.set((prev) => {
      const newPrev = [...prev];
      newPrev.splice(index, 1);

      return newPrev;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      chmpLocObservable.set((prev) => {
        const newPrev = [...prev];
        const oldIndex = prev.findIndex((chmpLoc) => JSON.stringify(chmpLoc) === active.id);
        const newIndex = prev.findIndex((chmpLoc) => JSON.stringify(chmpLoc) === over.id);
        const [removed] = newPrev.splice(oldIndex, 1);
        newPrev.splice(newIndex, 0, removed);

        return newPrev;
      });
    }
  };

  return (
    <>
      <div className="flex min-h-0 w-full flex-1 overflow-y-auto">
        {status === "LIST" ? (
          <div className="flex h-full w-full flex-col gap-5 overflow-y-auto lg:gap-8">
            {dungeonFormData[dungeonFormField].length > 0 ? (
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className="flex w-full flex-col gap-5 lg:gap-8">
                  <SortableContext
                    items={dungeonFormData[dungeonFormField].map((chmpLoc) =>
                      JSON.stringify(chmpLoc),
                    )}
                    strategy={verticalListSortingStrategy}
                  >
                    {dungeonFormData[dungeonFormField].map((chmpLoc, i) => (
                      <SortableItem
                        key={Math.random()}
                        item={chmpLoc}
                        i={i}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            ) : locationOrChampion === "Scene" ? (
              <ZeroLocations />
            ) : (
              <ZeroChampions />
            )}

            <Button
              variant="outline"
              disabled={isDisabledAddButton}
              className="flex w-full items-center gap-2 px-8 text-base uppercase"
              onClick={() => statusObs.set("CREATING")}
            >
              <AddCircle variant="Bold" />
              ADD NEW {locationOrChampion}
            </Button>

            <div className="block w-full border-t border-white/20 lg:hidden" />

            <div className="flex flex-row items-center justify-between gap-8 lg:hidden" />
          </div>
        ) : locationOrChampion === "Scene" ? (
          <Location editIndex={editIndex} setEditIndex={setEditIndex} />
        ) : (
          <Champion editIndex={editIndex} setEditIndex={setEditIndex} />
        )}
      </div>
    </>
  );
};

export default ChampionsLocationsWrapper;

const ZeroLocations = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-full w-[490px] flex-col items-center justify-start p-5 lg:gap-2 ">
        <CastleIcon />
        <p className="text-center text-lg font-semibold uppercase leading-7 tracking-[3.30px] lg:text-xl">
          Empty Halls Await Your Imagination!
        </p>
        <p className="text-center text-sm font-normal leading-7 tracking-widest text-white/50 lg:text-base">
          Your adventure is an open book, waiting for its first chapter. Add a new scene and start
          writing your tale!
        </p>
      </div>
    </div>
  );
};

const ZeroChampions = () => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex h-full w-[490px] flex-col items-center justify-start p-5 lg:gap-2 ">
        <HelmetIcon />
        <p className="text-center text-lg font-semibold uppercase leading-7 tracking-[3.30px] lg:text-xl">
          Call Forth a Hero!
        </p>
        <p className="text-center text-sm font-normal leading-7 tracking-widest text-white/50 lg:text-base">
          Your story needs a playable character. Click &apos;Add New Character&apos; to create a
          legend as unique and bold as your own imagination. Let&apos;s start the saga!
        </p>
      </div>
    </div>
  );
};
