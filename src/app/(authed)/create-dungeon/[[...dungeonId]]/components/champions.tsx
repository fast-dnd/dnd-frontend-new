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
import useCreateDungeon from "../hooks/use-create-dungeon";
import useUpdateDungeon from "../hooks/use-update-dungeon";
import { stepTitles, useDungeonFormStore } from "../stores/form-store";
import Champion from "./champion";
import SortableItem from "./sortable-item";

const Champions = ({ dungeonId }: { dungeonId?: string }) => {
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
    const postDungeonFormData = {
      ...dungeonFormData,
      image: dungeonFormData.imageUrl || dungeonFormData.image,
    };
    if (dungeonId) {
      updateDungeon(postDungeonFormData, {
        onSuccess: (_data) => {
          setCurrentStep("FINAL");
        },
      });
    } else {
      createDungeon(postDungeonFormData, {
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
    <div className="h-ful flex">
      <Box
        title="CREATE DUNGEON"
        className="flex flex-col min-h-0 flex-1 md:w-[1200px] p-5 gap-5 md:p-8 md:gap-8 mb-4 md:mb-0"
      >
        <div
          className={cn(
            "flex flex-row items-center gap-8 justify-between",
            editIndex !== -1 && "hidden",
          )}
        >
          <p className="text-lg text-[22px] leading-7 tracking-[0.15em] font-semibold w-full uppercase">
            3.
            {stepTitles[currentStep]}
          </p>
          <Button
            className="hidden md:flex gap-1 w-fit"
            variant="ghost"
            onClick={() => setCurrentStep("LOCATIONS")}
          >
            <AiOutlineLeft className="inline-block" />
            PREVIOUS
          </Button>
          <Button
            isLoading={isCreating}
            className="hidden md:flex w-fit px-8 whitespace-nowrap"
            onClick={onFinishForm}
            variant="primary"
            disabled={dungeonFormData.champions.length < 2}
          >
            FINISH
          </Button>
        </div>
        <div className="w-full h-full">
          {status === "LIST" && (
            <div className="flex flex-col gap-5 md:gap-8 w-full h-full">
              {dungeonFormData.champions.length > 0 && (
                <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <div className="flex flex-col gap-5 md:gap-8 w-full ">
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

              <p className="text-lg md:text-xl tracking-[0.07em] text-white/50">
                Create between 2 and 4 champions
              </p>

              <Button
                variant="outline"
                disabled={dungeonFormData.champions.length >= 4}
                className="w-full md:w-fit px-8"
                onClick={() => setStatus("CREATING")}
              >
                ADD NEW CHAMPION
              </Button>

              <div className="md:hidden block w-full border-t border-white/20" />

              <div className="flex flex-row items-center gap-8 justify-between md:hidden">
                <Button
                  className="gap-1 w-fit"
                  variant="ghost"
                  onClick={() => setCurrentStep("LOCATIONS")}
                >
                  <AiOutlineLeft className="inline-block" />
                  PREVIOUS
                </Button>
                <Button
                  isLoading={isCreating}
                  className="w-fit px-8 whitespace-nowrap"
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
