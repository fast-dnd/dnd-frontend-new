import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import useJoinRoom from "../../hooks/use-join-room";

interface IMobileJoinRoomProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  show?: boolean;
}

const MobileJoinRoom = ({ open, setOpen, show = true }: IMobileJoinRoomProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [roomLink, setRoomLink] = useState<string>("");

  const { mutate: joinRoom, isLoading } = useJoinRoom();

  useEffect(() => {
    const timeout = open ? setTimeout(() => inputRef.current?.focus(), 1000) : undefined;

    return () => clearTimeout(timeout);
  }, [open]);

  const onJoinRoom = () => joinRoom({ link: roomLink });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ right: -100, opacity: 0 }}
          animate={{ right: -44, opacity: 1 }}
          exit={{ right: -100, opacity: 0 }}
          className="fixed bottom-14 z-40 -rotate-90"
        >
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <div className="rounded-t-md bg-white/50 px-4 py-1.5 text-sm font-bold">
                JOIN ROOM
              </div>
            </DialogTrigger>
            <DialogContent
              fromBottom
              className="inset-0 flex h-full w-full max-w-full translate-x-0 translate-y-0 flex-col rounded-none bg-dark-900 p-4 data-[state=closed]:duration-500 data-[state=open]:duration-500"
            >
              <div className="flex flex-1 items-center">
                <Input
                  label="Room ID"
                  placeholder="ex. clean-thoughtless-evening"
                  onChange={(e) => setRoomLink(e.target.value)}
                  ref={inputRef}
                />
              </div>
              <button autoFocus className="pointer-events-none opacity-0" />

              <div className="flex justify-center">
                <Button
                  isLoading={isLoading}
                  disabled={roomLink.length === 0}
                  onClick={onJoinRoom}
                  className="w-52 text-sm"
                >
                  JOIN ROOM
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileJoinRoom;
