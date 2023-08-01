import { MdCheck, MdDelete, MdOutlineContentCopy } from "react-icons/md";

import { cn } from "@/utils/style-utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface IDesktopActionsProps {
  showDesktopActions: boolean;
  copied: boolean;
  onCopy: () => void;
  onDelete: () => void;
}

const CampaignDungeonDesktopActions = ({
  showDesktopActions,
  copied,
  onCopy,
  onDelete,
}: IDesktopActionsProps) => {
  const sharedIconClassNames =
    "cursor-pointer text-2xl text-white/75 transition-colors duration-300";

  return (
    <div
      className={cn(
        "hidden flex-row items-center gap-4 justify-self-end px-4 transition duration-300 lg:flex",
        showDesktopActions ? "opacity-100" : "opacity-0",
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {copied ? (
              <MdCheck className={cn(sharedIconClassNames, "hover:text-info")} />
            ) : (
              <button type="button" onClick={onCopy}>
                <MdOutlineContentCopy className={cn(sharedIconClassNames, "hover:text-info")} />
              </button>
            )}
          </TooltipTrigger>
          <TooltipContent className="border-info">
            <p className="text-info">{copied ? "Copied" : "Copy"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger type="button" onClick={onDelete}>
            <MdDelete className="cursor-pointer text-2xl text-white/75 transition-colors duration-300 hover:text-error" />
          </TooltipTrigger>
          <TooltipContent className="border-error">
            <p className="text-error">Remove</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CampaignDungeonDesktopActions;
