import { MdCheck, MdEdit, MdOutlineContentCopy } from "react-icons/md";

import { IDungeon } from "@/types/dungeon";
import Spinner from "@/components/ui/spinner";

import DeleteModal from "./delete-modal";

const MobileActions = ({
  onCopy,
  onEdit,
  copied,
  loadingEdit,
  dungeon,
}: {
  onCopy: () => void;
  onEdit: () => void;
  copied: boolean;
  loadingEdit: boolean;
  dungeon: IDungeon;
}) => {
  return (
    <div className="-ml-3 flex justify-center gap-4 whitespace-nowrap px-4 text-sm lg:hidden">
      <div
        className="flex w-full items-center justify-center gap-2 bg-white/10 px-3 py-2"
        onClick={onCopy}
      >
        {copied ? <MdCheck /> : <MdOutlineContentCopy />}
        <p>{copied ? "Copied" : "Copy ID"}</p>
      </div>
      <div
        className="flex w-full items-center justify-center gap-2 bg-white/10 px-3 py-2"
        onClick={onEdit}
      >
        {loadingEdit ? (
          <div className="flex items-center justify-center">
            <Spinner className="m-0 h-4 w-4" />
          </div>
        ) : (
          <MdEdit />
        )}
        <p>Edit</p>
      </div>
      <DeleteModal dungeon={dungeon} isMobile />
    </div>
  );
};

export default MobileActions;
