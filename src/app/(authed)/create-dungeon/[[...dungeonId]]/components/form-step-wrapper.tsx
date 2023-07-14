import React from "react";

import { Box } from "@/components/ui/box";

interface IFormStepWrapperProps {
  dungeonId?: string;
  children: React.ReactNode;
}

const FormStepWrapper = ({ dungeonId, children }: IFormStepWrapperProps) => {
  return (
    <Box
      title={dungeonId ? "EDIT DUNGEON" : "CREATE DUNGEON"}
      className="mb-4 flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-5 lg:mb-0 lg:gap-8 lg:p-8"
      wrapperClassName="w-[95%] lg:w-[1200px] mx-auto"
    >
      {children}
    </Box>
  );
};

export default FormStepWrapper;
