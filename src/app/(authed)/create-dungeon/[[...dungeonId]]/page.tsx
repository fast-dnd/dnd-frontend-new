"use client";

import { redirect, useRouter } from "next/navigation";
import { AiOutlineLeft } from "react-icons/ai";

import useGetDungeon from "@/hooks/use-get-dungeon";
import BoxSkeleton from "@/components/box-skeleton";
import MobileNavbar from "@/components/mobile-navbar";

import useGetRewards from "../../home/hooks/use-get-rewards";
import ChampionsLocationsWrapper from "./components/champions-locations-wrapper";
import Final from "./components/final";
import Initial from "./components/initial";
import useLoadDungeonData from "./hooks/use-load-dungeon-data";
import { dungeonFormStore, getInitialDungeonFormData } from "./stores/dungeon-form-store";

const CreateDungeon = ({ params }: { params: { dungeonId?: [string] } }) => {
  const router = useRouter();
  const { data: rewards, isLoading: isLoadingRewards } = useGetRewards();

  const dungeonId = params.dungeonId?.[0];
  const { data: dungeonData, isInitialLoading, isError } = useGetDungeon(dungeonId);

  const { currentStep, dungeonFormData } = dungeonFormStore.use();

  const { isMounted, setAborting } = useLoadDungeonData({ dungeonData });

  const abortDungeonCreation = () => {
    setAborting(true);
    dungeonFormStore.set({
      currentStep: "INITIAL",
      dungeonFormData: getInitialDungeonFormData(),
    });
    router.push("/home");
  };

  if (isError) return redirect("/home");

  if (isInitialLoading || !isMounted || isLoadingRewards)
    return <BoxSkeleton title={`${dungeonId ? "EDIT" : "CREATE"} DUNGEON`} />;

  if (!rewards) return redirect("/home");

  return (
    <div className="mt-8 h-full w-full overflow-y-auto lg:mt-0">
      <MobileNavbar goBackAction={abortDungeonCreation} />
      <div className="flex h-full w-full justify-center pt-8 lg:overflow-y-hidden lg:p-16">
        <div className="flex w-full flex-col items-center gap-8">
          <div
            className="hidden w-fit cursor-pointer flex-row items-center justify-center gap-1 text-lg font-medium uppercase tracking-[0.08em] lg:flex"
            onClick={abortDungeonCreation}
          >
            <AiOutlineLeft className="inline-block" /> GO BACK
          </div>

          {currentStep === "INITIAL" && <Initial rewards={rewards} dungeonId={dungeonId} />}
          {currentStep === "LOCATIONS" && (
            <ChampionsLocationsWrapper
              dungeonId={dungeonId}
              locationOrChampion="Location"
              createDescription="Create between 3 and 4 locations"
              stepIndex={2}
              hasNextStep
              hasPreviousStep
              isDisabledNextButton={dungeonFormData.locations.length < 3}
              isDisabledAddButton={dungeonFormData.locations.length >= 4}
            />
          )}
          {currentStep === "CHAMPIONS" && (
            <ChampionsLocationsWrapper
              dungeonId={dungeonId}
              locationOrChampion="Champion"
              createDescription="Create between 2 and 4 champions"
              stepIndex={3}
              hasNextStep
              hasPreviousStep
              isDisabledNextButton={dungeonFormData.champions.length < 2}
              isDisabledAddButton={dungeonFormData.champions.length >= 4}
            />
          )}
          {currentStep === "FINAL" && <Final />}
        </div>
      </div>
    </div>
  );
};

export default CreateDungeon;
