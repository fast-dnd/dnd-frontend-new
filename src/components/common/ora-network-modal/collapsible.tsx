import { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
  isOpenDefault?: boolean;
}

const Collapsible: React.FC<CollapsibleProps> = ({ title, children, isOpenDefault = false }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center">
      <button
        className="flex items-center justify-between rounded-md bg-blue-500 p-2 text-white hover:bg-blue-700"
        onClick={toggleOpen}
      >
        <span className="text-lg font-medium">{title}</span>
        {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
      </button>
      {isOpen && <div className="mt-2 rounded-md bg-gray-800 p-4">{children}</div>}
    </div>
  );
  // return (
  //   <div className="w-full">
  //     <button
  //       className="hover:bg-primary-dark flex w-full items-center justify-between rounded-md bg-primary p-4 text-white"
  //       onClick={toggleOpen}
  //     >
  //       <span className="text-lg font-medium">{title}</span>
  //       {isOpen ? <AiOutlineUp /> : <AiOutlineDown />}
  //     </button>
  //     {isOpen && <div className="mt-2 rounded-md bg-gray-800 p-4">{children}</div>}
  //   </div>
  // );
};

export default Collapsible;
