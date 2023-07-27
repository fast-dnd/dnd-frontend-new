import { useState } from "react";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ObservableObject } from "@legendapp/state";
import { useQueryClient } from "@tanstack/react-query";
import { AiOutlineLeft } from "react-icons/ai";

import { IChampion, ILocation } from "@/types/dungeon";
import { dungeonKey } from "@/services/dungeon-service";
import { cn } from "@/utils/style-utils";
import { Button } from "@/components/ui/button";

import useCreateDungeon from "../hooks/use-create-dungeon";
import useUpdateDungeon from "../hooks/use-update-dungeon";
import { dungeonFormStore } from "../stores/dungeon-form-store";
import { getNextStep, getPreviousStep, StatusType, stepTitles } from "../utils/step-utils";
import { tagsRemoveLabel } from "../utils/tags-utils";
import Champion from "./champion";
import FormStepWrapper from "./form-step-wrapper";
import Location from "./location";
import SortableItem from "./sortable-item";

interface IChampionsLocationsWrapperProps {
  dungeonId?: string;
  locationOrChampion: "Location" | "Champion";
  stepIndex: number;
  hasPreviousStep?: boolean;
  hasNextStep?: boolean;
  isDisabledNextButton?: boolean;
  isDisabledAddButton?: boolean;
  createDescription: string;
}

const ChampionsLocationsWrapper = ({
  dungeonId,
  stepIndex,
  hasPreviousStep,
  hasNextStep,
  locationOrChampion,
  isDisabledNextButton,
  isDisabledAddButton,
  createDescription,
}: IChampionsLocationsWrapperProps) => {
  const dungeonFormField = locationOrChampion === "Location" ? "locations" : "champions";
  type ObservableChampionLocation = ObservableObject<(ILocation | IChampion)[]>;

  const queryClient = useQueryClient();

  const { currentStep, dungeonFormData } = dungeonFormStore.use();

  const chmpLocObservable = dungeonFormStore.dungeonFormData[
    dungeonFormField
  ] as ObservableChampionLocation;

  const [status, setStatus] = useState<StatusType>("LIST");
  const [editIndex, setEditIndex] = useState(-1);

  const { mutate: createDungeon, isLoading: isCreating } = useCreateDungeon();
  const { mutate: updateDungeon, isLoading: isUpdating } = useUpdateDungeon();

  const onEdit = (index: number) => {
    setEditIndex(index);
    setStatus("EDITING");
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

  const onFinishForm = () => {
    const dungeonFormDataWithoutTags = {
      ...dungeonFormData,
      tags: tagsRemoveLabel(dungeonFormData.tags),
    };

    if (dungeonId) {
      updateDungeon(dungeonFormDataWithoutTags, {
        onSuccess: (_data) => {
          dungeonFormStore.currentStep.set("FINAL");
          queryClient.invalidateQueries([dungeonKey, dungeonId]);
        },
      });
    } else {
      createDungeon(dungeonFormDataWithoutTags, {
        onSuccess: (data) => {
          dungeonFormStore.currentStep.set("FINAL");
          dungeonFormStore.dungeonFormData.set((prev) => ({ ...prev, _id: data.data._id }));
        },
      });
    }
  };

  return (
    <div className="h-full w-full lg:flex">
      <FormStepWrapper dungeonId={dungeonId}>
        <div
          className={cn(
            "flex flex-row items-center justify-between gap-8",
            status !== undefined && status !== "LIST" && "hidden",
          )}
        >
          <p className="w-full text-lg font-semibold uppercase leading-7 tracking-[0.15em] lg:text-[22px]">
            {stepIndex}.{stepTitles[currentStep]}
          </p>
          {hasPreviousStep && (
            <Button
              className="hidden w-fit gap-1 lg:flex"
              variant="ghost"
              onClick={() => dungeonFormStore.currentStep.set(getPreviousStep(currentStep))}
            >
              <AiOutlineLeft className="inline-block" />
              PREVIOUS
            </Button>
          )}
          {hasNextStep && (
            <Button
              isLoading={isCreating || isUpdating}
              className="hidden w-fit whitespace-nowrap px-8 lg:flex"
              onClick={
                locationOrChampion === "Champion"
                  ? onFinishForm
                  : () => dungeonFormStore.currentStep.set(getNextStep(currentStep))
              }
              variant={locationOrChampion === "Champion" ? "primary" : "outline"}
              disabled={isDisabledNextButton}
            >
              {locationOrChampion === "Champion" ? "FINISH" : "NEXT STEP"}
            </Button>
          )}
        </div>

        <div className="h-full w-full">
          {status === "LIST" ? (
            <div className="flex h-full w-full flex-col gap-5 lg:gap-8">
              {dungeonFormData[dungeonFormField].length > 0 && (
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
              )}

              <p className="text-lg tracking-[0.07em] text-white/50 lg:text-xl">
                {createDescription}
              </p>

              <Button
                variant="outline"
                disabled={isDisabledAddButton}
                className="w-full px-8 text-base uppercase lg:w-fit"
                onClick={() => setStatus("CREATING")}
              >
                ADD NEW {locationOrChampion}
              </Button>

              <div className="block w-full border-t border-white/20 lg:hidden" />

              <div className="flex flex-row items-center justify-between gap-8 lg:hidden">
                {hasPreviousStep && (
                  <Button
                    className="w-fit gap-1 text-sm"
                    variant="ghost"
                    onClick={() => dungeonFormStore.currentStep.set(getPreviousStep(currentStep))}
                  >
                    <AiOutlineLeft className="inline-block" />
                    PREVIOUS
                  </Button>
                )}
                {hasNextStep && (
                  <Button
                    isLoading={isCreating || isUpdating}
                    className="w-fit whitespace-nowrap px-8 text-sm"
                    onClick={
                      locationOrChampion === "Champion"
                        ? onFinishForm
                        : () => dungeonFormStore.currentStep.set(getNextStep(currentStep))
                    }
                    variant={locationOrChampion === "Champion" ? "primary" : "outline"}
                    disabled={isDisabledNextButton}
                  >
                    {locationOrChampion === "Champion" ? "FINISH" : "NEXT STEP"}
                  </Button>
                )}
              </div>
            </div>
          ) : locationOrChampion === "Location" ? (
            <Location
              editIndex={editIndex}
              setEditIndex={setEditIndex}
              status={status}
              setStatus={setStatus}
            />
          ) : (
            <Champion
              editIndex={editIndex}
              setEditIndex={setEditIndex}
              status={status}
              setStatus={setStatus}
            />
          )}
        </div>
      </FormStepWrapper>
    </div>
  );
};

export default ChampionsLocationsWrapper;
