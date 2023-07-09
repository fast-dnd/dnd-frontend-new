import Image from "next/image";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";

interface IMobileNavbarProps {
  goBackAction?: () => void;
}

const MobileNavbar = ({ goBackAction }: IMobileNavbarProps) => {
  return (
    <div className="flex w-full justify-between  px-5 lg:hidden">
      <Image src="/images/mobile-navbar-logo.svg" width={36} height={24} alt="mobile-navbar-logo" />
      <Link
        className="flex items-center gap-1 font-medium uppercase leading-3 tracking-wider"
        href="/home"
        onClick={goBackAction}
      >
        <AiOutlineLeft className="inline-block" /> GO BACK
      </Link>
    </div>
  );
};

export default MobileNavbar;
