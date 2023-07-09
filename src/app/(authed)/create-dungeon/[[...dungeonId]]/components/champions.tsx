"use client";

import { useState } from "react";
import { cn } from "@/utils/style-utils";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import { AiOutlineLeft } from "react-icons/ai";

import useStore from "@/hooks/use-store";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

import useCreateDungeon from "../hooks/use-create-dungeon";
import useUpdateDungeon from "../hooks/use-update-dungeon";
import { stepTitles, useDungeonFormStore } from "../stores/form-store";
import Champion from "./champion";
import SortableItem from "./sortable-item";

const Champions = ({ dungeonId }: { dungeonId?: string }) => {
  const queryClient = useQueryClient();

  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  const [status, setStatus] = useState<"LIST" | "CREATING" | "EDITING">("LIST");
  const [editIndex, setEditIndex] = useState(-1);

  const { mutate: createDungeon, isLoading: isCreating } = useCreateDungeon();
  const { mutate: updateDungeon, isLoading: isUpdating } = useUpdateDungeon();

  if (!dungeonFormStore) return null;

  const { currentStep, setCurrentStep, dungeonFormData, updateDungeonFormData } = dungeonFormStore;

  const onEditChampion = (index: number) => {
    setEditIndex(index);
    setStatus("EDITING");
  };

  const onDeleteChampion = (index: number) => {
    updateDungeonFormData(
      produce(dungeonFormData, (draft) => {
        draft.champions.splice(index, 1);
      }),
    );
  };

  const onFinishForm = () => {
    if (dungeonId) {
      updateDungeon(dungeonFormData, {
        onSuccess: (_data) => {
          setCurrentStep("FINAL");
          queryClient.invalidateQueries(["kingdom", dungeonId]);
        },
      });
    } else {
      createDungeon(dungeonFormData, {
        onSuccess: (data) => {
          setCurrentStep("FINAL");
          updateDungeonFormData(
            produce(dungeonFormData, (draft) => {
              draft.id = data.data._id;
            }),
          );
        },
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      updateDungeonFormData(
        produce(dungeonFormData, (draft) => {
          const oldIndex = draft.champions.findIndex((chmp) => JSON.stringify(chmp) === active.id);
          const newIndex = draft.champions.findIndex((chmp) => JSON.stringify(chmp) === over.id);
          const [removed] = draft.champions.splice(oldIndex, 1);
          draft.champions.splice(newIndex, 0, removed);
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
            3.
            {stepTitles[currentStep]}
          </p>
          <Button
            className="hidden w-fit gap-1 lg:flex"
            variant="ghost"
            onClick={() => setCurrentStep("LOCATIONS")}
          >
            <AiOutlineLeft className="inline-block" />
            PREVIOUS
          </Button>
          <Button
            isLoading={isCreating}
            className="hidden w-fit whitespace-nowrap px-8 lg:flex"
            onClick={onFinishForm}
            variant="primary"
            disabled={dungeonFormData.champions.length < 2}
          >
            FINISH
          </Button>
        </div>
        <div className="h-full w-full">
          {status === "LIST" && (
            <div className="flex h-full w-full flex-col gap-5 lg:gap-8">
              {dungeonFormData.champions.length > 0 && (
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <div className="flex w-full flex-col gap-5 lg:gap-8 ">
                    <SortableContext
                      items={dungeonFormData.champions.map((chmp) => JSON.stringify(chmp))}
                      strategy={verticalListSortingStrategy}
                    >
                      {dungeonFormData.champions.map((chmp, i) => (
                        <SortableItem
                          key={Math.random()}
                          item={chmp}
                          i={i}
                          onEdit={onEditChampion}
                          onDelete={onDeleteChampion}
                        />
                      ))}
                    </SortableContext>
                  </div>
                </DndContext>
              )}

              <p className="text-lg tracking-[0.07em] text-white/50 lg:text-xl">
                Create between 2 and 4 champions
              </p>

              <Button
                variant="outline"
                disabled={dungeonFormData.champions.length >= 4}
                className="w-full px-8 text-base lg:w-fit"
                onClick={() => setStatus("CREATING")}
              >
                ADD NEW CHAMPION
              </Button>

              <div className="block w-full border-t border-white/20 lg:hidden" />

              <div className="flex flex-row items-center justify-between gap-8 lg:hidden">
                <Button
                  className="w-fit gap-1 text-sm"
                  variant="ghost"
                  onClick={() => setCurrentStep("LOCATIONS")}
                >
                  <AiOutlineLeft className="inline-block" />
                  PREVIOUS
                </Button>
                <Button
                  isLoading={isCreating}
                  className="w-fit whitespace-nowrap px-8 text-sm"
                  onClick={onFinishForm}
                  variant="primary"
                  disabled={dungeonFormData.champions.length < 2}
                >
                  FINISH
                </Button>
              </div>
            </div>
          )}
          {status !== "LIST" && (
            <Champion
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

export default Champions;
