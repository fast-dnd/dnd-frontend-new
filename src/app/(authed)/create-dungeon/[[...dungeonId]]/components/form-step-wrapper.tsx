import React from "react";
import { AiOutlineLeft } from "react-icons/ai";

import { cn } from "@/utils/style-utils";
import useStore from "@/hooks/use-store";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";

import {
  getNextStep,
  getPreviousStep,
  StatusType,
  stepTitles,
  useDungeonFormStore,
} from "../stores/form-store";

interface IFormStepWrapperProps {
  dungeonId?: string;
  children: React.ReactNode;
  status?: StatusType;
  stepIndex: number;
  hasPreviousStep?: boolean;
  hasNextStep?: boolean;
}

const FormStepWrapper = ({
  dungeonId,
  children,
  status,
  stepIndex,
  hasPreviousStep,
  hasNextStep,
}: IFormStepWrapperProps) => {
  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  if (!dungeonFormStore) return null;

  const { currentStep, setCurrentStep, dungeonFormData } = dungeonFormStore;

  return (
    <Box
      title={dungeonId ? "EDIT DUNGEON" : "CREATE DUNGEON"}
      className="mb-4 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 lg:mb-0 lg:gap-8 lg:p-8"
      wrapperClassName="w-[95%] lg:w-[1200px] mx-auto"
    >
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
            onClick={() => setCurrentStep(getPreviousStep(currentStep))}
          >
            <AiOutlineLeft className="inline-block" />
            PREVIOUS
          </Button>
        )}
        {hasNextStep && (
          <Button
            className="hidden w-fit whitespace-nowrap px-8 lg:flex"
            onClick={() => setCurrentStep(getNextStep(currentStep))}
            variant="outline"
            disabled={dungeonFormData.locations.length < 3}
          >
            NEXT STEP
          </Button>
        )}
      </div>
      {children}
    </Box>
  );
};

export default FormStepWrapper;
