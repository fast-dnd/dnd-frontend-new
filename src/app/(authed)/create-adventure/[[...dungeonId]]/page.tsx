"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import useGetDungeon from "@/hooks/use-get-dungeon";
import useIsMounted from "@/hooks/use-is-mounted";
import BoxSkeleton from "@/components/box-skeleton";

import ChampionsLocationsWrapper from "./components/champions-locations-wrapper";
import FormStepWrapper from "./components/form-step-wrapper";
import GeneralInfo from "./components/general-info";
import StepsCard from "./components/steps-card";
import { dungeonFormStore } from "./stores/dungeon-form-store";
import { StatusType } from "./utils/step-utils";

const CreateDungeon = ({ params }: { params: { dungeonId?: [string] } }) => {
  const dungeonId = params.dungeonId?.[0];

  const { data: dungeonData, isInitialLoading, isError } = useGetDungeon(dungeonId);

  const [status, setStatus] = useState<StatusType>("LIST");

  const { currentStep } = dungeonFormStore.use();

  const { isMounted } = useIsMounted();

  if (isError) return redirect("/home");

  if (isInitialLoading || !isMounted)
    return <BoxSkeleton title={`${dungeonId ? "EDIT" : "CREATE"} ADVENTURE`} />;

  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="flex h-full w-full justify-between gap-12 pb-12 lg:overflow-y-hidden">
        <div className="flex w-full">
          <div className="flex h-full w-full">
            <FormStepWrapper
              isEditing={dungeonId !== undefined}
              dungeonData={dungeonData}
              status={status}
              setStatus={setStatus}
            >
              {currentStep === "General information" && <GeneralInfo />}
              {currentStep === "Locations" && (
                <ChampionsLocationsWrapper
                  locationOrChampion="Location"
                  status={status}
                  setStatus={setStatus}
                />
              )}
              {currentStep === "Champions" && (
                <ChampionsLocationsWrapper
                  locationOrChampion="Champion"
                  status={status}
                  setStatus={setStatus}
                />
              )}
            </FormStepWrapper>
          </div>
        </div>

        <StepsCard dungeonId={dungeonId} />
      </div>
    </div>
  );
};

export default CreateDungeon;
