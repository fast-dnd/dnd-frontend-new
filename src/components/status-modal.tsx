import { useRouter } from "next/navigation";
import { Copy } from "iconsax-react";

import useCopy from "@/hooks/helpers/use-copy";

import HelmetIcon from "./icons/helmet-icon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export type StatusModalContent =
  | {
      state: "EDITED" | "CREATED";
      id: string;
    }
  | {
      state: "ERRORED";
      errorMessages: string[];
    };

interface IStatusModalProps {
  open: boolean;
  type: "ADVENTURE" | "CAMPAIGN";
  content?: StatusModalContent;
  onClose: () => void;
}

const StatusModal = ({ open, type, content, onClose }: IStatusModalProps) => {
  const router = useRouter();
  const title = {
    EDITED: `${type} EDITED SUCCESSFULLY`,
    CREATED: `${type} CREATED SUCCESSFULLY`,
    ERRORED: `ERROR EDITING ${type}`,
  } as const;

  const { copied, onCopy } = useCopy();

  if (!content) return null;

  const leave = () => {
    if (content.state === "EDITED") {
      router.push("/profile");
    } else if (content.state === "CREATED") {
      onCopy(content.id);
      router.push("/profile");
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title[content.state]}</AlertDialogTitle>
          <div className="text-white/60">
            {content.state === "ERRORED" && (
              <ul className="my-8 flex list-disc flex-col items-center justify-center gap-2">
                {content.errorMessages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>
            )}
            {content.state === "EDITED" && (
              <p className="my-8 text-center text-white/60">
                You can start your story with your new adventure now!
              </p>
            )}
            {content.state === "CREATED" && (
              <p className="flex flex-col items-center gap-4 text-white">
                <HelmetIcon />
                <span className="text-2xl font-semibold">Congratulations, Dungeon Master!</span>
                <span className="text-center text-xl">
                  Your {type.toLowerCase()} is complete and awaiting adventurers! Your{" "}
                  {type.toLowerCase()} ID is <span className="text-primary">{content.id}</span>. Be
                  sure to copy it and share with your friends so they can join in on the epic
                  journey! You can also access your newly created {type.toLowerCase()} anytime under{" "}
                  {type} Tab for future edits or to view its progress. Happy adventuring!
                </span>
              </p>
            )}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              onClose();
              leave();
            }}
          >
            {content.state === "ERRORED" ? (
              "CONTINUE"
            ) : content.state === "EDITED" ? (
              "GO TO PROFILE"
            ) : (
              <div className="flex gap-2.5">
                <Copy variant="Bold" color="#000" />
                {copied ? "COPIED" : "COPY ID"}
              </div>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StatusModal;
