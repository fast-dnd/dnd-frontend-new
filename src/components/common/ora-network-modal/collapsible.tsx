/* eslint-disable tailwindcss/no-custom-classname */
import { useEffect, useRef, useState } from "react";
import { Book } from "@phosphor-icons/react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  isOpenDefault?: boolean;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children, isOpenDefault = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState(isOpenDefault ? "none" : "0px");

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setMaxHeight(`${contentRef.current?.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="hover:bg-primary-dark flex items-center justify-between rounded-md bg-primary p-2 text-white"
        onClick={toggleOpen}
      >
        <Book size={44} color="orange" />
        <span className="text-xl font-medium">{title}</span>
        {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>
      <div
        ref={contentRef}
        style={{
          maxHeight: maxHeight,
          transition: "max-height 0.5s ease-in-out",
          overflow: "hidden",
        }}
        className={`mt-2 rounded-md bg-gray-800 p-4 ${!isOpen && "hidden"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Collapsible;
