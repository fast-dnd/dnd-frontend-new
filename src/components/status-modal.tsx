import Link from "next/link";
import { Copy } from "iconsax-react";

import useCopy from "@/hooks/use-copy";

import HelmetIcon from "./icons/helmet-icon";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
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
  const title = {
    EDITED: `${type} EDITED SUCCESSFULLY`,
    CREATED: `${type} CREATED SUCCESSFULLY`,
    ERRORED: `ERROR EDITING ${type}`,
  } as const;

  const { copied, onCopy } = useCopy();

  if (!content) return null;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title[content.state]}</AlertDialogTitle>
          <AlertDialogDescription>
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
                  Your dungeon is complete and awaiting adventurers! Your Dungeon ID is{" "}
                  <span className="text-primary">{content.id}</span>. Be sure to copy it and share
                  with your friends so they can join in on the epic journey! You can also access
                  your newly created dungeon anytime under &apos;My Adventures&apos; for future
                  edits or to view its progress. Happy adventuring!
                </span>
              </p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>
            {content.state === "ERRORED" ? (
              "CONTINUE"
            ) : content.state === "EDITED" ? (
              <Link href="/profile">GO TO PROFILE</Link>
            ) : (
              <div className="flex gap-8">
                <Link
                  className="flex gap-2 tracking-widest"
                  href="/profile"
                  onClick={() => onCopy(content.id)}
                >
                  <Copy variant="Bold" color="#000" />
                  {copied ? "COPIED" : "COPY ID"}
                </Link>
              </div>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default StatusModal;
