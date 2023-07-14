import React from "react";

import { Box } from "@/components/ui/box";
import Spinner from "@/components/ui/spinner";

const LoadingStateBox = () => {
  return (
    <Box
      title="Join"
      className="flex h-fit min-h-0 w-full flex-col items-center justify-center gap-8 p-8 md:w-[490px]"
    >
      <Spinner className="h-40 w-40" />
    </Box>
  );
};

export default LoadingStateBox;
