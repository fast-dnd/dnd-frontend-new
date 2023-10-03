"use client";

import { useState } from "react";
import { redirect } from "next/navigation";

import useGetDungeon from "@/hooks/use-get-dungeon";
import useIsMounted from "@/hooks/use-is-mounted";
import { Box } from "@/components/ui/box";

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
    return (
      <div className="flex h-full w-full justify-between gap-12 pb-12">
        <div className="flex h-full w-full">
          <Box
            title="EDIT ADVENTURE"
            className="mb-4 flex min-h-0 flex-1 flex-col gap-5 overflow-y-hidden p-5 lg:mb-0 lg:gap-6 lg:p-8"
            wrapperClassName="w-[95%] lg:w-[1200px] mx-auto"
          >
            <div className="flex w-full animate-pulse flex-col gap-6">
              <div className="h-8 w-20 rounded-lg bg-gray-600" />
              <div className="h-7 w-72 rounded-lg bg-gray-600" />
              <div className="hidden w-full border-t border-white/20 lg:block" />

              <div className="flex flex-col gap-5 overflow-hidden lg:flex-row lg:gap-8">
                <div className="h-[170px] w-[170px] rounded-lg bg-gray-600" />
                <div className="flex flex-col gap-5 lg:gap-8">
                  <div className="h-20 w-[440px] rounded-lg bg-gray-600" />
                  <div className="h-20 w-[440px] rounded-lg bg-gray-600" />
                  <div className="h-44 w-[440px] rounded-lg bg-gray-600" />
                </div>
                <div className="flex flex-col gap-5 lg:gap-8">
                  <div className="h-20 w-[440px] rounded-lg bg-gray-600" />
                  <div className="h-20 w-[440px] rounded-lg bg-gray-600" />
                  <div className="h-32 w-[440px] rounded-lg bg-gray-600" />
                </div>
              </div>
            </div>
          </Box>
        </div>

        <Box
          titleClassName="hidden"
          title=""
          className="flex h-full w-full flex-col items-center justify-between rounded-t-md p-8"
        >
          <div className="flex w-full animate-pulse flex-col gap-6">
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="h-[60px] w-full rounded-lg bg-gray-600" />
            ))}
          </div>
        </Box>
      </div>
    );

  return (
    <div className="flex h-full w-full justify-between gap-12 pb-12">
      <div className="flex h-full basis-2/3">
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

      <StepsCard dungeonId={dungeonId} />
    </div>
  );
};

export default CreateDungeon;
