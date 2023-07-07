import Spinner from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IDungeon } from "@/types/dnd";
import { cn } from "@/utils/style-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdCheck, MdDelete, MdEdit, MdOutlineContentCopy } from "react-icons/md";
import useDeleteDungeon from "../hooks/use-delete-dungeon";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

const Dungeon = ({ dungeon }: { dungeon: IDungeon }) => {
  const router = useRouter();

  const { mutate: deleteDungeon, isLoading: isDeleting } = useDeleteDungeon();

  const [openDeleteDungeonModal, setOpenDeleteDungeonModal] = useState(false);

  const [loadingEdit, setLoadingEdit] = useState(false);
  const [copied, setCopied] = useState(false);

  const [showDesktopActions, setShowDesktopActions] = useState(false);

  const sharedIconClassNames =
    "cursor-pointer text-2xl text-white/75 transition-colors duration-300";

  const onCopy = () => {
    navigator.clipboard.writeText(dungeon._id);
    setCopied(true);
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <div
      className="flex flex-col gap-4 hover:bg-white/5 transition-colors duration-300 p-4 pr-0 rounded-md border md:border-0 border-white/10"
      onMouseOver={() => setShowDesktopActions(true)}
      onMouseLeave={() => setShowDesktopActions(false)}
    >
      <div className="flex flex-row gap-8">
        <Image
          src={dungeon.imageUrl || "/images/default-dungeon.png"}
          alt={dungeon.name}
          width={180}
          height={180}
          className="h-16 w-16 md:h-[180px] md:w-[180px]"
        />
        <div className="flex flex-col md:py-4 gap-1 md:gap-4 w-full">
          <div className="flex flex-row justify-between w-full pr-4">
            <p className="text-lg md:text-[22px] md:leading-7 font-normal md:font-medium tracking-wider md:tracking-[0.15em] uppercase truncate w-48 md:w-auto">
              {dungeon.name}
            </p>

            <div
              className={cn(
                "hidden md:flex flex-row items-center px-4 gap-4 justify-self-end transition duration-300",
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
                  <TooltipTrigger>
                    {loadingEdit && (
                      <div className="flex justify-center items-center h-6 w-6">
                        <Spinner className="h-5 w-5 m-0 text-warning" />
                      </div>
                    )}
                    {!loadingEdit && (
                      <MdEdit
                        onClick={() => {
                          setLoadingEdit(true);
                          router.push(`/create-dungeon/${dungeon._id}`);
                        }}
                        className={cn(sharedIconClassNames, "hover:text-warning")}
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent className="border-warning">
                    <p className="text-warning">Edit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    {isDeleting ? (
                      <Spinner className={cn("h-[25px] w-[25px] mr-0 text-error")} />
                    ) : (
                      <MdDelete
                        onClick={() => setOpenDeleteDungeonModal(true)}
                        className={cn(sharedIconClassNames, "hover:text-error")}
                      />
                    )}
                  </TooltipTrigger>
                  <TooltipContent className="border-error">
                    <p className="text-error">Delete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <p className="opacity-50 md:opacity-100 text-white text-[14px] md:text-base leading-tight font-light text-lg tracking-widest break-all line-clamp-2 md:line-clamp-none w-48 md:w-auto">
            {dungeon.description}
          </p>
        </div>
      </div>

      <div className="md:hidden flex gap-4 text-sm">
        <div
          className="whitespace-nowrap cursor-pointer px-5 py-2 items-center bg-white/10 flex gap-2"
          onClick={onCopy}
        >
          {copied ? <MdCheck /> : <MdOutlineContentCopy />}
          <p>{copied ? "Copied" : "Copy ID"}</p>
        </div>
        <div
          className="cursor-pointer px-5 py-2 items-center bg-white/10  flex gap-2"
          onClick={() => {
            setLoadingEdit(true);
            router.push(`/create-dungeon/${dungeon._id}`);
          }}
        >
          {loadingEdit ? (
            <div className="flex justify-center items-center h-6 w-6">
              <Spinner className="h-4 w-4 m-0" />
            </div>
          ) : (
            <MdEdit />
          )}
          <p>Edit</p>
        </div>
        <div
          className="cursor-pointer px-5 py-2 items-center bg-white/10  flex gap-2"
          onClick={() => setOpenDeleteDungeonModal(true)}
        >
          <MdDelete />
          <p>Delete</p>
        </div>
      </div>
      <Modal
        open={openDeleteDungeonModal}
        onClose={() => setOpenDeleteDungeonModal(false)}
        className="px-6 md:px-12 py-8 bg-black/90 md:bg-black/50 flex flex-col gap-8 text-lg md:text-xl items-center w-fit h-fit shadow-xl shadow-white/10"
      >
        <p className="uppercase text-center leading-7 tracking-[3.3px]">Delete Dungeon</p>
        <p className="whitespace-nowrap text-white/60 leading-7 tracking-[2.64px]">
          This action cannot be reversed.
        </p>
        <div className="flex flex-row justify-end gap-8">
          <Button
            className="w-fit px-8 py-3"
            variant="outline"
            onClick={() => setOpenDeleteDungeonModal(false)}
          >
            CANCEL
          </Button>
          <Button
            className="whitespace-nowrap w-fit px-8 py-3"
            onClick={() => deleteDungeon(dungeon._id)}
          >
            {isDeleting && <Spinner className="h-4 w-4 m-0" />}
            <p>Delete</p>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Dungeon;
