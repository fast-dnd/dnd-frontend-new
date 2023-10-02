import React from "react";
import { useRouter } from "next/navigation";

import { IDungeonDetail } from "@/types/dungeon";
import { Box } from "@/components/ui/box";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GoBackButton from "@/components/go-back-button";

import useLoadDungeonData from "../hooks/use-load-dungeon-data";
import { dungeonFormStore } from "../stores/dungeon-form-store";
import { StatusType } from "../utils/step-utils";

interface IFormStepWrapperProps {
  isEditing?: boolean;
  children: React.ReactNode;
  dungeonData: IDungeonDetail | undefined;
  status: StatusType;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
}

const FormStepWrapper = ({
  isEditing,
  children,
  dungeonData,
  status,
  setStatus,
}: IFormStepWrapperProps) => {
  const router = useRouter();

  const { setAborting } = useLoadDungeonData({ dungeonData });

  const onClickBack = () => {
    if (status === "LIST") abortDungeonCreation();
    else setStatus("LIST");
  };

  const abortDungeonCreation = () => {
    setAborting(true);
    router.push("/profile");
  };

  return (
    <Box
      title={isEditing ? "EDIT ADVENTURE" : "CREATE ADVENTURE"}
      className="mb-4 flex min-h-0 flex-1 flex-col gap-5 overflow-hidden p-5 lg:mb-0 lg:gap-6 lg:p-8"
      wrapperClassName="w-[95%] lg:w-[1200px] mx-auto"
    >
      <GoBackButton text={status === "LIST" ? "PROFILE" : "BACK"} onClick={onClickBack} />

      <div className="flex flex-row items-center justify-between gap-8">
        <p className="w-full text-lg font-semibold uppercase leading-7 tracking-[0.15em] lg:text-[22px]">
          {dungeonFormStore.currentStep.get()}
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="whitespace-nowrap rounded-md border border-white/25 px-3 py-1.5 tracking-wider">
                See requirements
              </div>
            </TooltipTrigger>
            <TooltipContent className="border-transparent">
              <ul className="list-inside list-disc">
                <li>Name is required</li>
                <li>Description is required</li>
                <li>Locations: Min. 3 - Max. 4</li>
                <li>Champions: Min. 2 - Max. 4</li>
              </ul>
              <TooltipArrow className=" fill-select text-select" />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="hidden w-full border-t border-white/20 lg:block" />

      {children}
    </Box>
  );
};

export default FormStepWrapper;
