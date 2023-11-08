import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
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
