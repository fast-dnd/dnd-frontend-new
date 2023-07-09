/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import useStore from "@/hooks/use-store";
import { redirect, useRouter } from "next/navigation";
import { AiOutlineLeft } from "react-icons/ai";
import Champions from "./components/champions";
import Final from "./components/final";
import Initial from "./components/initial";
import Locations from "./components/locations";
import { initialDungeonFormData, useDungeonFormStore } from "./stores/form-store";
import { useEffect, useRef } from "react";
import { isEqual } from "lodash";
import useGetDungeon from "@/hooks/use-get-dungeon";
import BoxSkeleton from "@/components/BoxSkeleton";
import MobileNavbar from "@/components/mobile-navbar";

const CreateDungeon = ({ params }: { params: { dungeonId?: [string] } }) => {
  const router = useRouter();

  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  const previousDungeonFormStore = useRef(dungeonFormStore);

  const dungeonId = params.dungeonId?.[0];
  const dungeonQuery = useGetDungeon(dungeonId);

  const loadDungeonData = () => {
    if (dungeonId) {
      // editing...
      if (dungeonQuery?.data && dungeonFormStore && !dungeonFormStore.dungeonFormData.id) {
        dungeonFormStore.updateDungeonFormData({
          id: dungeonId,
          name: dungeonQuery.data.name,
          duration: dungeonQuery.data.duration,
          description: dungeonQuery.data.description,
          style: dungeonQuery.data.style,
          tags: dungeonQuery.data.tags.map((tag) => ({
            label: tag,
            value: tag,
          })),
          locations: dungeonQuery.data.locations,
          champions: dungeonQuery.data.champions,
          imageUrl: dungeonQuery.data.imageUrl,
          image: dungeonQuery.data.imageUrl,
        });
      }
    } else {
      // creating...
      if (dungeonFormStore) {
        // if the user is not in creation process but just started it then reset the form
        if (isEqual(dungeonFormStore.dungeonFormData, initialDungeonFormData))
          dungeonFormStore?.resetDungeonFormData();
      }
    }

    // Update previousDungeonFormStore two times to ensure it is always one step behind dungeonFormStore
    previousDungeonFormStore.current = dungeonFormStore;
  };

  useEffect(() => {
    loadDungeonData();
  }, [dungeonQuery?.data, dungeonId]);

  //! Hacky way to wait for dungeonFormStore to become defined (mounted) after nextjs hydration
  useEffect(() => {
    // Check if dungeonFormStore has become defined
    if (dungeonFormStore && !previousDungeonFormStore.current) {
      loadDungeonData();
    }
  }, [dungeonFormStore]);

  if (dungeonQuery.isError) return redirect("/home");

  if (dungeonQuery.isInitialLoading || !dungeonFormStore)
    return <BoxSkeleton title={`${dungeonId ? "EDIT" : "CREATE"} DUNGEON`} />;

  const { currentStep, setCurrentStep, resetDungeonFormData } = dungeonFormStore;

  const abortDungeonCreation = () => {
    router.push("/home");
    setCurrentStep("INITIAL");
    resetDungeonFormData();
  };

  return (
    <div className="h-full w-full mt-8 lg:mt-0 overflow-y-auto">
      <MobileNavbar goBackAction={abortDungeonCreation} />
      <div className="flex justify-center h-full lg:p-16 pt-8 lg:overflow-y-hidden w-full">
        <div className="flex flex-col items-center gap-8 w-full">
          <div
            className="hidden cursor-pointer text-lg lg:flex flex-row gap-1 w-fit font-medium items-center justify-center tracking-[0.08em] uppercase"
            onClick={abortDungeonCreation}
          >
            <AiOutlineLeft className="inline-block" /> GO BACK
          </div>

          {currentStep === "INITIAL" && <Initial />}
          {currentStep === "LOCATIONS" && <Locations />}
          {currentStep === "CHAMPIONS" && <Champions dungeonId={dungeonId} />}
          {currentStep === "FINAL" && <Final />}
        </div>
      </div>
    </div>
  );
};

export default CreateDungeon;
