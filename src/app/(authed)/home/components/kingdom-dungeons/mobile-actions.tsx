import Link from "next/link";
import { MdCheck, MdEdit, MdOutlineContentCopy } from "react-icons/md";

import { IDungeon } from "@/types/dungeon";

import DeleteModal from "./delete-modal";

interface IMobileActionsProps {
  onCopy: () => void;
  copied: boolean;
  dungeon: IDungeon;
}

const MobileActions = ({ onCopy, copied, dungeon }: IMobileActionsProps) => {
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
        href={`/create-dungeon/${dungeon._id}`}
        aria-label="Edit dungeon"
        className="flex w-full items-center justify-center gap-2 bg-white/10 px-3 py-2"
      >
        <MdEdit />
        <p>Edit</p>
      </Link>
      <DeleteModal dungeon={dungeon} isMobile />
    </div>
  );
};

export default MobileActions;
