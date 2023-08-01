import Link from "next/link";
import { MdCheck, MdEdit, MdOutlineContentCopy } from "react-icons/md";

import { ICampaign } from "@/types/dungeon";

import DeleteModal from "./delete-modal";

interface IMobileActionsProps {
  onCopy: () => void;
  copied: boolean;
  campaign: ICampaign;
}

const MobileActions = ({ onCopy, copied, campaign }: IMobileActionsProps) => {
  return (
    <div className="-ml-3 flex justify-center gap-4 whitespace-nowrap px-4 text-sm lg:hidden">
      <div
        className="flex w-full items-center justify-center gap-2 bg-white/10 px-3 py-2"
        onClick={onCopy}
      >
        {copied ? <MdCheck /> : <MdOutlineContentCopy />}
        <p>{copied ? "Copied" : "Copy ID"}</p>
      </div>
      <Link
        href={`/create-campaign/${campaign._id}`}
        aria-label="Edit campaign"
        className="flex w-full items-center justify-center gap-2 bg-white/10 px-3 py-2"
      >
        <MdEdit />
        <p>Edit</p>
      </Link>
      <DeleteModal campaign={campaign} isMobile />
    </div>
  );
};

export default MobileActions;
