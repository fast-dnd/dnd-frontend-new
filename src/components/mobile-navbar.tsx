import { jibril } from "@/utils/fonts";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";

const MobileNavbar = () => {
  return (
    <div className="flex w-full justify-between  px-5 md:hidden">
      <p style={jibril.style} className="text-lg font-bold text-white">
        V
      </p>
      <Link
        className="flex gap-1 items-center font-medium leading-3 tracking-wider uppercase"
        href="/home"
      >
        <AiOutlineLeft className="inline-block" /> GO BACK
      </Link>
    </div>
  );
};

export default MobileNavbar;
