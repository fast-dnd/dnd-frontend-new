"use client";

import { useRouter } from "next/navigation";
import { AiOutlineLeft } from "react-icons/ai";
import Champions from "./components/champions";
import Final from "./components/final";
import Initial from "./components/initial";
import Locations from "./components/locations";
import { useDungeonFormStore } from "./stores/form-store";
import useStore from "@/hooks/use-store";

const CreateDungeon = () => {
  const router = useRouter();

  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  if (!dungeonFormStore) return null;

  const { currentStep, setCurrentStep, updateDungeonFormData } = dungeonFormStore;

  const abortDungeonCreation = () => {
    router.push("/home");
    setCurrentStep("INITIAL");
    updateDungeonFormData({
      name: "",
      description: "",
      locations: [],
      champions: [],
    });
  };

  return (
    <div className="flex justify-center h-full p-16 overflow-y-hidden">
      <div className="flex flex-col gap-8">
        <div
          className="cursor-pointer flex flex-row gap-1 w-fit font-medium items-center tracking-[0.08em]  uppercase"
          onClick={abortDungeonCreation}
        >
          <AiOutlineLeft className="inline-block" /> GO BACK
        </div>

        {currentStep === "INITIAL" && <Initial />}
        {currentStep === "LOCATIONS" && <Locations />}
        {currentStep === "CHAMPIONS" && <Champions />}
        {currentStep === "FINAL" && <Final />}
      </div>
    </div>
  );
};

export default CreateDungeon;
