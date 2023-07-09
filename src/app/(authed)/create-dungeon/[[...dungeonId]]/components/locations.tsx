"use client";

import { useState } from "react";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { produce } from "immer";
import { AiOutlineLeft } from "react-icons/ai";

import { cn } from "@/utils/style-utils";
import useStore from "@/hooks/use-store";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

import { stepTitles, useDungeonFormStore } from "../stores/form-store";
import Location from "./location";
import SortableItem from "./sortable-item";

const Locations = () => {
  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  const [status, setStatus] = useState<"LIST" | "CREATING" | "EDITING">("LIST");
  const [editIndex, setEditIndex] = useState(-1);

  if (!dungeonFormStore) return null;

  const { currentStep, setCurrentStep, dungeonFormData, updateDungeonFormData } = dungeonFormStore;

  const onEditLocation = (index: number) => {
    setEditIndex(index);
    setStatus("EDITING");
  };

  const onDeleteLocation = (index: number) => {
    updateDungeonFormData(
      produce(dungeonFormData, (draft) => {
        draft.locations.splice(index, 1);
      }),
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      updateDungeonFormData(
        produce(dungeonFormData, (draft) => {
          const oldIndex = draft.locations.findIndex((loc) => JSON.stringify(loc) === active.id);
          const newIndex = draft.locations.findIndex((loc) => JSON.stringify(loc) === over.id);
          const [removed] = draft.locations.splice(oldIndex, 1);
          draft.locations.splice(newIndex, 0, removed);
        }),
      );
    }
  };

  return (
    <div className="h-full w-full lg:flex">
      <Box
        title="CREATE DUNGEON"
        className="mb-4 flex min-h-0 flex-1 flex-col gap-5 p-5 lg:mb-0 lg:gap-8 lg:p-8"
        wrapperClassName="w-[95%] lg:w-[1200px] mx-auto"
      >
        <div
          className={cn(
            "flex flex-row items-center justify-between gap-8",
            status !== "LIST" && "hidden",
          )}
        >
          <p className="w-full text-lg font-semibold uppercase leading-7 tracking-[0.15em] lg:text-[22px]">
            2.
            {stepTitles[currentStep]}
          </p>
          <Button
            className="hidden w-fit gap-1 lg:flex"
            variant="ghost"
            onClick={() => setCurrentStep("INITIAL")}
          >
            <AiOutlineLeft className="inline-block" />
            PREVIOUS
          </Button>
          <Button
            className="hidden w-fit whitespace-nowrap px-8 lg:flex"
            onClick={() => setCurrentStep("CHAMPIONS")}
            variant="outline"
            disabled={dungeonFormData.locations.length < 3}
          >
            NEXT STEP
          </Button>
        </div>
        <div className="h-full w-full">
          {status === "LIST" && (
            <div className="flex h-full w-full flex-col gap-5 lg:gap-8">
              {dungeonFormData.locations.length > 0 && (
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <div className="flex w-full flex-col gap-5 lg:gap-8">
                    <SortableContext
                      items={dungeonFormData.locations.map((loc) => JSON.stringify(loc))}
                      strategy={verticalListSortingStrategy}
                    >
                      {dungeonFormData.locations.map((loc, i) => (
                        <SortableItem
                          key={Math.random()}
                          item={loc}
                          i={i}
                          onEdit={onEditLocation}
                          onDelete={onDeleteLocation}
                        />
                      ))}
                    </SortableContext>
                  </div>
                </DndContext>
              )}

              <p className="text-lg tracking-[0.07em] text-white/50 lg:text-xl">
                Create between 3 and 4 locations
              </p>

              <Button
                variant="outline"
                disabled={dungeonFormData.locations.length >= 4}
                className="w-full px-8 text-base lg:w-fit"
                onClick={() => setStatus("CREATING")}
              >
                ADD NEW LOCATION
              </Button>

              <div className="block w-full border-t border-white/20 lg:hidden" />

              <div className="flex flex-row items-center justify-between gap-8 lg:hidden">
                <Button
                  className="w-fit gap-1 text-sm"
                  variant="ghost"
                  onClick={() => setCurrentStep("INITIAL")}
                >
                  <AiOutlineLeft className="inline-block" />
                  PREVIOUS
                </Button>
                <Button
                  className="w-fit whitespace-nowrap px-8 text-sm"
                  onClick={() => setCurrentStep("CHAMPIONS")}
                  variant="outline"
                  disabled={dungeonFormData.locations.length < 3}
                >
                  NEXT STEP
                </Button>
              </div>
            </div>
          )}
          {status !== "LIST" && (
            <Location
              editIndex={editIndex}
              setEditIndex={setEditIndex}
              status={status}
              setStatus={setStatus}
            />
          )}
        </div>
      </Box>
    </div>
  );
};

export default Locations;
