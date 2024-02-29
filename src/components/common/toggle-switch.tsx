import { useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/utils/style-utils";

interface IToggleSwitchProps {
  on: boolean;
  setOn: (on: boolean) => void;
  items: { text: string; icon: JSX.Element }[];
}

const ToggleSwitch = ({ on, setOn, items }: IToggleSwitchProps) => {
  const [switching, setSwitching] = useState(false);

  return (
    <div className="pointer-events-auto relative flex w-full rounded-full bg-white p-0.5">
      {items.map((item, i) => (
        <div
          key={item.text}
          className={cn(
            "z-10 mx-2.5 my-2 flex w-full select-none items-center justify-center gap-1 text-sm text-white transition-all duration-300",
            ((!on && i === 1) || (on && i === 0)) && "text-black",
          )}
          onClick={() => {
            if (((!on && i === 1) || (on && i === 0)) && !switching) {
              setOn(i === 0 ? false : true);
              setSwitching(true);
              setTimeout(() => setSwitching(false), 500);
            }
          }}
        >
          {item.icon}
          {item.text}
        </div>
      ))}

      <div
        className={cn(
          "absolute inset-0 flex size-full items-center justify-start p-0.5",
          on && "justify-end",
        )}
      >
        <motion.div
          className={cn("h-full w-1/2 rounded-full bg-primary")}
          layout
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 20,
          }}
        />
      </div>
    </div>
  );
};
export default ToggleSwitch;
