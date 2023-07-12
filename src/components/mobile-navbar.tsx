import Image from "next/image";
import Link from "next/link";
import { AiOutlineExclamationCircle, AiOutlineLeft, AiOutlineQuestionCircle } from "react-icons/ai";

interface IMobileNavbarProps {
  goBackAction?: () => void;
  goBackText?: string;
  href?: string;
  howTo?: boolean;
  onClickHowTo?: () => void;
  feedback?: boolean;
  onClickFeedback?: () => void;
}

const MobileNavbar = ({
  goBackAction,
  goBackText,
  href,
  howTo = false,
  onClickHowTo,
  feedback = false,
  onClickFeedback,
}: IMobileNavbarProps) => {
  return (
    <div className="flex w-full justify-between px-5 lg:hidden">
      <Image src="/images/mobile-navbar-logo.svg" width={36} height={24} alt="mobile-navbar-logo" />
      <div className="flex items-center gap-4">
        {howTo && (
          <div onClick={onClickHowTo} className="text-xl text-white/75 hover:text-white">
            <AiOutlineQuestionCircle />
          </div>
        )}
        {feedback && (
          <div onClick={onClickFeedback} className="text-xl text-white/75 hover:text-white">
            <AiOutlineExclamationCircle />
          </div>
        )}
        <Link
          className="flex items-center gap-1 font-medium uppercase leading-3 tracking-wider"
          href={href !== undefined ? href : "/home"}
          onClick={goBackAction}
        >
          <AiOutlineLeft className="inline-block" /> {goBackText ?? "GO BACK"}
        </Link>
      </div>
    </div>
  );
};

export default MobileNavbar;
