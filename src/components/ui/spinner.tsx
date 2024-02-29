import React from "react";
import { ImSpinner2 } from "react-icons/im";

import { cn } from "@/utils/style-utils";

const Spinner = ({
  hidePath,
  ...props
}: { hidePath?: boolean } & React.SVGProps<SVGSVGElement>) => {
  const { className, ...rest } = props;
  return <ImSpinner2 className={cn("mr-3 animate-spin", className)} {...rest} />;
};

export default Spinner;
