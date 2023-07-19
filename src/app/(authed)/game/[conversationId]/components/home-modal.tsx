"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner";

const HomeModal = ({ open, close }: { open: boolean; close: () => void }) => {
  const router = useRouter();
  const [goingHome, setGoingHome] = useState(false);

  return (
    <Modal
      open={open}
      onClose={close}
      className="flex h-fit w-fit flex-col items-center gap-8 bg-black/90 px-6 py-8 text-lg shadow-xl shadow-white/10 lg:px-12 lg:text-xl"
    >
      <p className="text-center font-medium uppercase leading-7 tracking-[3.3px]">
        Leave the game?
      </p>
      <p className="text-center leading-7 tracking-[2.64px] text-white/60">
        Stepping away? Remember, each game phase waits for 10 minutes. Miss it, and face a loss.
      </p>
      <div className="flex flex-row justify-center gap-4 lg:gap-8">
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
        >
          STAY AND PLAY
        </Button>
      </div>
    </Modal>
  );
};

export default HomeModal;
