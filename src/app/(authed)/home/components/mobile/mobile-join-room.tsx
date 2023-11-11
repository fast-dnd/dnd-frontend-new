import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import useJoinRoom from "../../hooks/use-join-room";

const MobileJoinRoom = ({
  open,
  setOpen,
  show = true,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  show?: boolean;
}) => {
  const [roomLink, setRoomLink] = useState<string>("");

  const { mutate: joinRoom, isLoading } = useJoinRoom();

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
  return (
    <>
      <AnimatePresence>
        {show && !open && (
          <motion.div className="fixed -right-11 bottom-14 z-40 -rotate-90">
            <button
              onClick={() => {
                setOpen(true);
              }}
              className="rounded-t-md bg-white/50 px-4 py-1.5 text-sm font-bold"
            >
              JOIN ROOM
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {show && open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-30 flex h-full w-full flex-col bg-dark-900 p-4"
          >
            <div className="flex flex-1 items-center">
              <Input
                label="Room ID"
                placeholder="ex. clean-thoughtless-evening"
                onChange={(e) => setRoomLink(e.target.value)}
              />
            </div>
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileJoinRoom;
