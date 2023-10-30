import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const ChooseCharacterControls = ({
  nextChamp,
  prevChamp,
}: {
  nextChamp: () => void;
  prevChamp: () => void;
}) => {
  return (
    <>
      <div
        className="absolute right-0 top-[50%] flex h-12 w-12 translate-x-1/2 items-center rounded-full bg-white"
        onClick={nextChamp}
      >
        <BiChevronRight className="h-7 w-auto fill-black" />
      </div>
      <div
        className="absolute left-0 top-[50%] flex h-12 w-12 -translate-x-1/2 items-center justify-end rounded-full bg-white"
        onClick={prevChamp}
      >
        <BiChevronLeft className="h-7 w-auto fill-black" />
      </div>
    </>
  );
};

export default ChooseCharacterControls;
