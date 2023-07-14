import { MdCheck, MdEdit, MdOutlineContentCopy } from "react-icons/md";

import { IDungeon } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";
import Spinner from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import DeleteModal from "./delete-modal";

const DesktopActions = ({
  showDesktopActions,
  loadingEdit,
  copied,
  onCopy,
  onEdit,
  dungeon,
}: {
  showDesktopActions: boolean;
  loadingEdit: boolean;
  copied: boolean;
  onCopy: () => void;
  onEdit: () => void;
  dungeon: IDungeon;
}) => {
  const sharedIconClassNames =
    "cursor-pointer text-2xl text-white/75 transition-colors duration-300";

  return (
    <div
      className={cn(
        "hidden flex-row items-center gap-4 justify-self-end px-4 transition duration-300 lg:flex",
        showDesktopActions || loadingEdit ? "opacity-100" : "opacity-0",
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {copied ? (
              <MdCheck className={cn(sharedIconClassNames, "hover:text-info")} />
            ) : (
              <MdOutlineContentCopy
                onClick={onCopy}
                className={cn(sharedIconClassNames, "hover:text-info")}
              />
            )}
          </TooltipTrigger>
          <TooltipContent className="border-info">
            <p className="text-info">{copied ? "Copied" : "Copy"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {loadingEdit ? (
              <div className="flex h-6 w-6 items-center justify-center">
                <Spinner className="m-0 h-5 w-5 text-warning" />
              </div>
            ) : (
              <MdEdit onClick={onEdit} className={cn(sharedIconClassNames, "hover:text-warning")} />
            )}
          </TooltipTrigger>
          <TooltipContent className="border-warning">
            <p className="text-warning">Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DeleteModal dungeon={dungeon} />
    </div>
  );
};

export default DesktopActions;
