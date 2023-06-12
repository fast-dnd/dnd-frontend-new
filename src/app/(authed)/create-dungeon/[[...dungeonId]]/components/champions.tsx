"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import useStore from "@/hooks/use-store";
import { produce } from "immer";
import { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { MdDelete, MdEdit } from "react-icons/md";
import useCreateDungeon from "../hooks/use-create-dungeon";
import useUpdateDungeon from "../hooks/use-update-dungeon";
import { stepTitles, useDungeonFormStore } from "../stores/form-store";
import Champion from "./champion";

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
    const postDungeonFormData = { ...dungeonFormData, image: dungeonFormData.imageUrl };
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

  return (
    <div className="h-ful flex">
      <Box title="CREATE DUNGEON" className="flex flex-col gap-8 min-h-0 flex-1 w-[1200px] p-8">
        <div className="flex flex-row items-center gap-8 justify-between">
          <p className="text-[22px] leading-7 tracking-[0.15em] font-semibold w-full uppercase">
            3.
            {stepTitles[currentStep]}
          </p>
          <Button
            className="flex flex-row gap-1 font-medium tracking-[0.08em] w-fit text-white/50 uppercase"
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
        <div className="w-full h-full">
          {status === "LIST" && (
            <div className="flex flex-col gap-8 w-full h-full">
              {dungeonFormData.champions.length > 0 && (
                <div className="flex flex-col gap-8 w-full overflow-y-auto no-scrollbar">
                  {dungeonFormData.champions.map((chmp, i) => (
                    <div
                      key={crypto.randomUUID()}
                      className="w-full bg-white/5 flex flex-row items-center p-4 gap-4"
                    >
                      <p className="w-full text-2xl font-medium tracking-widest">
                        {i + 1}. {chmp.name}
                      </p>
                      <MdEdit
                        className="text-white/75 cursor-pointer hover:text-warning transition-colors duration-300"
                        size={32}
                        onClick={() => onEditChampion(i)}
                      />

                      <MdDelete
                        className="text-white/75 cursor-pointer hover:text-error transition-colors duration-300"
                        size={32}
                        onClick={() => onDeleteChampion(i)}
                      />
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xl tracking-[0.07em] text-white/50">
                Create between 2 and 4 champions
              </p>

              <Button
                variant="outline"
                disabled={dungeonFormData.champions.length >= 4}
                className="w-fit px-8"
                onClick={() => setStatus("CREATING")}
              >
                ADD NEW CHAMPION
              </Button>
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
