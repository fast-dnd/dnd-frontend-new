"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { produce } from "immer";
import { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { MdDelete, MdEdit } from "react-icons/md";
import { stepTitles, useDungeonFormStore } from "../stores/form-store";
import Location from "./location";
import useStore from "@/hooks/use-store";

const Locations = () => {
  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  const [status, setStatus] = useState<"LIST" | "CREATING" | "EDITING">("LIST");
  const [editIndex, setEditIndex] = useState(-1);

  const onEditLocation = (index: number) => {
    setEditIndex(index);
    setStatus("EDITING");
  };

  if (!dungeonFormStore) return null;

  const { currentStep, setCurrentStep, dungeonFormData, updateDungeonFormData } = dungeonFormStore;

  const onDeleteLocation = (index: number) => {
    updateDungeonFormData(
      produce(dungeonFormData, (draft) => {
        draft.locations.splice(index, 1);
      }),
    );
  };

  return (
    <div className="h-full flex">
      <Box title="CREATE DUNGEON" className="flex flex-col gap-8 min-h-0 flex-1 w-[1200px] p-8">
        <div className="flex flex-row items-center gap-8 justify-between">
          <p className="text-[22px] leading-7 tracking-[0.15em] font-semibold w-full uppercase">
            2.
            {stepTitles[currentStep]}
          </p>
          <Button className="gap-1 w-fit" variant="ghost" onClick={() => setCurrentStep("INITIAL")}>
            <AiOutlineLeft className="inline-block" />
            PREVIOUS
          </Button>
          <Button
            className="w-fit px-8 whitespace-nowrap"
            onClick={() => setCurrentStep("CHAMPIONS")}
            variant="outline"
            disabled={dungeonFormData.locations.length < 3}
          >
            NEXT STEP
          </Button>
        </div>
        <div className="w-full h-full">
          {status === "LIST" && (
            <div className="flex flex-col gap-8 w-full h-full">
              {dungeonFormData.locations.length > 0 && (
                <div className="flex flex-col gap-8 w-full overflow-y-auto no-scrollbar">
                  {dungeonFormData.locations.map((loc, i) => (
                    <div
                      key={crypto.randomUUID()}
                      className="w-full bg-white/5 flex flex-row items-center p-4 gap-4"
                    >
                      <p className="w-full text-2xl font-medium tracking-widest">
                        {i + 1}. {loc.name}
                      </p>
                      <MdEdit
                        className="text-white/75 cursor-pointer hover:text-warning transition-colors duration-300"
                        size={32}
                        onClick={() => onEditLocation(i)}
                      />

                      <MdDelete
                        className="text-white/75 cursor-pointer hover:text-error transition-colors duration-300"
                        size={32}
                        onClick={() => onDeleteLocation(i)}
                      />
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xl tracking-[0.07em] text-white/50">
                Create between 3 and 4 locations
              </p>

              <Button
                variant="outline"
                disabled={dungeonFormData.locations.length >= 4}
                className="w-fit px-8"
                onClick={() => setStatus("CREATING")}
              >
                ADD NEW LOCATION
              </Button>
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
