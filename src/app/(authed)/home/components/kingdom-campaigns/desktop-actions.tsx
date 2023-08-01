import Link from "next/link";
import { MdCheck, MdEdit, MdOutlineContentCopy } from "react-icons/md";

import { ICampaign } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface IDesktopActionsProps {
  showDesktopActions: boolean;
  copied: boolean;
  onCopy: () => void;
  campaign: ICampaign;
}

const DesktopActions = ({ showDesktopActions, copied, onCopy, campaign }: IDesktopActionsProps) => {
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
          <TooltipTrigger asChild>
            <Link href={`/create-campaign/${campaign._id}`} aria-label="Edit campaign">
              <MdEdit className={cn(sharedIconClassNames, "hover:text-warning")} />
            </Link>
          </TooltipTrigger>
          <TooltipContent className="border-warning">
            <p className="text-warning">Edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default DesktopActions;
