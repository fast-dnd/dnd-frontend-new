import Spinner from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IDungeon } from "@/types/dnd";
import { cn } from "@/utils/style-utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdCheck, MdDelete, MdEdit, MdOutlineContentCopy } from "react-icons/md";
import useDeleteDungeon from "../hooks/use-delete-dungeon";

const Dungeon = ({ dungeon }: { dungeon: IDungeon }) => {
  const router = useRouter();

  const { mutate: deleteDungeon, isLoading } = useDeleteDungeon();

  const [loadingEdit, setLoadingEdit] = useState(false);
  const [copied, setCopied] = useState(false);

  const sharedIconClassNames =
    "cursor-pointer text-2xl text-white/75 transition-colors duration-300";

  const onCopy = () => {
    navigator.clipboard.writeText(dungeon._id);
    setCopied(true);
  };

  return (
    <div className="flex flex-row gap-8 hover:bg-white/5 transition-colors duration-300 p-4 pr-0 rounded-md">
      <Image
        src={dungeon.imageUrl || "/images/default-dungeon.png"}
        alt={dungeon.name}
        width={180}
        height={180}
        className="h-[180px]"
      />
      <div className="flex flex-col py-4 gap-4 w-full">
        <div className="flex flex-row justify-between w-full pr-8">
          <p className="text-[22px] leading-7 font-medium tracking-[0.15em] uppercase">
            {dungeon.name}
          </p>

          <div className="flex flex-row items-center px-4 gap-4 justify-self-end">
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
                  {isLoading ? (
                    <Spinner className={cn("h-[25px] w-[25px] mr-0 text-error")} />
                  ) : (
                    <MdDelete
                      onClick={() => deleteDungeon(dungeon._id)}
                      className={cn(sharedIconClassNames, "hover:text-error")}
                    />
                  )}
                </TooltipTrigger>
                <TooltipContent className="border-error">
                  {!isLoading && <p className="text-error">Delete</p>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <p className="font-light text-lg tracking-widest">{dungeon.description}</p>
      </div>
    </div>
  );
};

export default Dungeon;
