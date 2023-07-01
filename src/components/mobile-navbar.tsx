import Image from "next/image";
import Link from "next/link";
import { AiOutlineLeft } from "react-icons/ai";
import mobileNavbarLogo from "../../public/images/mobile-navbar-logo.svg";

const MobileNavbar = () => {
  return (
    <div className="flex w-full justify-between  px-5 md:hidden">
      <Image src={mobileNavbarLogo} alt="mobile-navbar-logo" />
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
