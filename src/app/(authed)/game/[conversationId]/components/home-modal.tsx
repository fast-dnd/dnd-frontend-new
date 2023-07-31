"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Spinner from "@/components/ui/spinner";

const HomeModal = ({ open, close }: { open: boolean; close: () => void }) => {
  const router = useRouter();
  const [goingHome, setGoingHome] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(change) => {
        if (!change) close();
      }}
    >
      <DialogContent className="w-fit lg:w-fit">
        <DialogHeader>
          <DialogTitle>Leave the game?</DialogTitle>
          <DialogDescription className="text-center">
            Stepping away? Remember, each game phase waits for 10 minutes. Miss it, and face a loss.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="w-fit whitespace-nowrap px-4 py-3 text-base lg:px-16 lg:text-xl"
            variant="outline"
            onClick={() => {
              setGoingHome(true);
              close();
              router.push("/home");
            }}
          >
            {goingHome && <Spinner className="m-0 h-4 w-4" />}
            EXIT GAME
          </Button>
          <Button
            className="w-fit whitespace-nowrap px-4 py-3 text-base lg:px-8 lg:text-xl"
            onClick={close}
            autoFocus
          >
            STAY AND PLAY
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HomeModal;
