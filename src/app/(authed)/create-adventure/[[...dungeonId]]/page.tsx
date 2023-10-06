"use client";

import { redirect } from "next/navigation";
import { useIsClient } from "usehooks-ts";

import useGetDungeon from "@/hooks/use-get-dungeon";

import AdventureSkeletonLoading from "./components/adventure-skeleton-loading";
import ChampionsLocationsWrapper from "./components/champions-locations-wrapper";
import FormStepWrapper from "./components/form-step-wrapper";
import GeneralInfo from "./components/general-info";
import StepsCard from "./components/steps-card";
import { dungeonFormStore } from "./stores/dungeon-form-store";

const CreateDungeon = ({ params }: { params: { dungeonId?: [string] } }) => {
  const dungeonId = params.dungeonId?.[0];

  const { data: dungeonData, isInitialLoading, isError } = useGetDungeon(dungeonId);

  const { currentStep } = dungeonFormStore.use();

  const isClient = useIsClient();

  if (isError) return redirect("/home");

  if (isInitialLoading || !isClient) return <AdventureSkeletonLoading isEditing={!!dungeonId} />;

  return (
    <div className="flex h-full min-h-0 w-full justify-between gap-12 pb-12">
      <div className="flex h-full basis-2/3">
        <FormStepWrapper isEditing={!!dungeonId} dungeonData={dungeonData}>
          {currentStep === "General information" && <GeneralInfo />}
          {currentStep === "Locations" && (
            <ChampionsLocationsWrapper locationOrChampion="Location" />
          )}
          {currentStep === "Champions" && (
            <ChampionsLocationsWrapper locationOrChampion="Champion" />
          )}
        </FormStepWrapper>
      </div>

      <StepsCard dungeonId={dungeonId} />
    </div>
  );
};

export default CreateDungeon;
