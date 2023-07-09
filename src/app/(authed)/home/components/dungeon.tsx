import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/style-utils";
import { MdCheck, MdDelete, MdEdit, MdOutlineContentCopy } from "react-icons/md";

import { IDungeon } from "@/types/dnd";
import useCopy from "@/hooks/use-copy";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import useDeleteDungeon from "../hooks/use-delete-dungeon";

const Dungeon = ({ dungeon }: { dungeon: IDungeon }) => {
  const router = useRouter();

  const { mutate: deleteDungeon, isLoading: isDeleting } = useDeleteDungeon();

  const [openDeleteDungeonModal, setOpenDeleteDungeonModal] = useState(false);

  const [loadingEdit, setLoadingEdit] = useState(false);
  const [copied, setCopied] = useCopy();

  const [showDesktopActions, setShowDesktopActions] = useState(false);

  const sharedIconClassNames =
    "cursor-pointer text-2xl text-white/75 transition-colors duration-300";

  const onCopy = () => {
    navigator.clipboard.writeText(dungeon._id);
    setCopied(true);
  };

  return (
    <div
      className="flex flex-col gap-4 rounded-md border border-white/10 p-3 pr-0 transition-colors duration-300 hover:bg-white/5 lg:border-0 lg:p-4"
      onMouseOver={() => setShowDesktopActions(true)}
      onMouseLeave={() => setShowDesktopActions(false)}
    >
      <div className="flex flex-row gap-8">
        <Image
          src={dungeon.imageUrl || "/images/default-dungeon.png"}
          alt={dungeon.name}
          width={180}
          height={180}
          className="h-16 w-16 lg:h-[180px] lg:w-[180px]"
        />
        <div className="flex w-full flex-col gap-1 lg:gap-4 lg:py-4">
          <div className="flex w-full flex-row justify-between pr-4">
            <p className="w-48 truncate text-lg font-normal uppercase tracking-wider lg:w-auto lg:text-[22px] lg:font-medium lg:leading-7 lg:tracking-[0.15em]">
              {dungeon.name}
            </p>

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
                  <TooltipTrigger>
                    {loadingEdit && (
                      <div className="flex h-6 w-6 items-center justify-center">
                        <Spinner className="m-0 h-5 w-5 text-warning" />
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
                      <Spinner className={cn("mr-0 h-[25px] w-[25px] text-error")} />
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
          <p className="line-clamp-2 w-48 break-all text-[14px] font-light leading-tight tracking-widest text-white opacity-50 lg:line-clamp-none lg:w-auto lg:text-base lg:opacity-100">
            {dungeon.description}
          </p>
        </div>
      </div>

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
          onClick={() => {
            setLoadingEdit(true);
            router.push(`/create-dungeon/${dungeon._id}`);
          }}
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
        <div
          className="flex w-full items-center justify-center gap-2 bg-white/10 px-3 py-2"
          onClick={() => setOpenDeleteDungeonModal(true)}
        >
          <MdDelete />
          <p>Delete</p>
        </div>
      </div>
      <Modal
        open={openDeleteDungeonModal}
        onClose={() => setOpenDeleteDungeonModal(false)}
        className="flex h-fit w-fit flex-col items-center gap-8 bg-black/90 px-6 py-8 text-lg shadow-xl shadow-white/10 lg:bg-black/50 lg:px-12 lg:text-xl"
      >
        <p className="text-center uppercase leading-7 tracking-[3.3px]">Delete Dungeon</p>
        <p className="whitespace-nowrap leading-7 tracking-[2.64px] text-white/60">
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
            className="w-fit whitespace-nowrap px-8 py-3"
            onClick={() => deleteDungeon(dungeon._id)}
          >
            {isDeleting && <Spinner className="m-0 h-4 w-4" />}
            <p>Delete</p>
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Dungeon;
