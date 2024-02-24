import { MagnifyingGlass } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

import { cn } from "@/utils/style-utils";

const MobileSearch = ({
  open,
  setOpen,
  setSearchName,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchName: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex justify-end overflow-hidden pr-12">
      <div
        className={cn(
          "pointer-events-auto flex h-10 min-w-[40px] items-center justify-center overflow-hidden rounded-full border border-white/[8%] bg-black p-2 transition-colors duration-300",
          open && "justify-between gap-2 border-primary px-3",
        )}
        onClick={() => {
          if (!open) setOpen(true);
        }}
      >
        <MagnifyingGlass className="size-6 shrink-0" />
        <AnimatePresence>
          {open && (
            <>
              <motion.section
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, width: "90vw" },
                  collapsed: { opacity: 0, width: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <input
                  placeholder="Search for adventures..."
                  className="w-full bg-transparent text-sm focus:text-sm focus:outline-none"
                  onChange={(e) => setSearchName(e.target.value)}
                />
              </motion.section>

              <motion.section
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
              >
                <AiOutlineClose
                  className="size-5"
                  onClick={() => {
                    setSearchName(undefined);
                    setOpen(false);
                  }}
                />
              </motion.section>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileSearch;
