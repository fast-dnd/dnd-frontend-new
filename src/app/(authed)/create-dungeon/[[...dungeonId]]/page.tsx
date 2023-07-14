/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { redirect, useRouter } from "next/navigation";
import { AiOutlineLeft } from "react-icons/ai";

import useGetDungeon from "@/hooks/use-get-dungeon";
import BoxSkeleton from "@/components/BoxSkeleton";
import MobileNavbar from "@/components/mobile-navbar";

import Champions from "./components/champions";
import Final from "./components/final";
import Initial from "./components/initial";
import Locations from "./components/locations";
import useLoadDungeonData from "./hooks/use-load-dungeon-data";

const CreateDungeon = ({ params }: { params: { dungeonId?: [string] } }) => {
  const router = useRouter();

  const dungeonId = params.dungeonId?.[0];
  const { data: dungeonData, isInitialLoading, isError } = useGetDungeon(dungeonId);

  const dungeonFormStore = useLoadDungeonData({ dungeonId, dungeonData });

  if (isError) return redirect("/home");

  if (isInitialLoading || !dungeonFormStore)
    return <BoxSkeleton title={`${dungeonId ? "EDIT" : "CREATE"} DUNGEON`} />;

  const { currentStep, setCurrentStep, resetDungeonFormData } = dungeonFormStore;

  const abortDungeonCreation = () => {
    router.push("/home");
    setCurrentStep("INITIAL");
    resetDungeonFormData();
  };

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

          {currentStep === "INITIAL" && <Initial dungeonId={dungeonId} />}
          {currentStep === "LOCATIONS" && <Locations dungeonId={dungeonId} />}
          {currentStep === "CHAMPIONS" && <Champions dungeonId={dungeonId} />}
          {currentStep === "FINAL" && <Final />}
        </div>
      </div>
    </div>
  );
};

export default CreateDungeon;
