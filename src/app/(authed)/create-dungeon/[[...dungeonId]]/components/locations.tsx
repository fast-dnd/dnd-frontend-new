"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import useStore from "@/hooks/use-store";
import { cn } from "@/utils/style-utils";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { produce } from "immer";
import { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
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
    <div className="h-full lg:flex w-full">
      <Box
        title="CREATE DUNGEON"
        className="flex flex-col min-h-0 flex-1 p-5 gap-5 lg:p-8 lg:gap-8 mb-4 lg:mb-0"
        wrapperClassName="w-[95%] lg:w-[1200px] mx-auto"
      >
        <div
          className={cn(
            "flex flex-row items-center gap-8 justify-between",
            status !== "LIST" && "hidden",
          )}
        >
          <p className="text-lg lg:text-[22px] leading-7 tracking-[0.15em] font-semibold w-full uppercase">
            2.
            {stepTitles[currentStep]}
          </p>
          <Button
            className="hidden lg:flex gap-1 w-fit"
            variant="ghost"
            onClick={() => setCurrentStep("INITIAL")}
          >
            <AiOutlineLeft className="inline-block" />
            PREVIOUS
          </Button>
          <Button
            className="hidden lg:flex w-fit px-8 whitespace-nowrap"
            onClick={() => setCurrentStep("CHAMPIONS")}
            variant="outline"
            disabled={dungeonFormData.locations.length < 3}
          >
            NEXT STEP
          </Button>
        </div>
        <div className="w-full h-full">
          {status === "LIST" && (
            <div className="flex flex-col gap-5 lg:gap-8 w-full h-full">
              {dungeonFormData.locations.length > 0 && (
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <div className="flex flex-col gap-5 lg:gap-8 w-full">
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

              <p className="text-lg lg:text-xl tracking-[0.07em] text-white/50">
                Create between 3 and 4 locations
              </p>

              <Button
                variant="outline"
                disabled={dungeonFormData.locations.length >= 4}
                className="text-base w-full lg:w-fit px-8"
                onClick={() => setStatus("CREATING")}
              >
                ADD NEW LOCATION
              </Button>

              <div className="lg:hidden block w-full border-t border-white/20" />

              <div className="flex flex-row items-center gap-8 justify-between lg:hidden">
                <Button
                  className="text-sm gap-1 w-fit"
                  variant="ghost"
                  onClick={() => setCurrentStep("INITIAL")}
                >
                  <AiOutlineLeft className="inline-block" />
                  PREVIOUS
                </Button>
                <Button
                  className="text-sm w-fit px-8 whitespace-nowrap"
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
