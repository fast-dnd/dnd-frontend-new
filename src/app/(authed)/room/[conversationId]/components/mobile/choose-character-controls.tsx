import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import useCharacterControls from "../../hooks/use-character-controls";

const ChooseCharacterControls = ({ conversationId }: { conversationId: string }) => {
  const { nextChamp, prevChamp } = useCharacterControls({ conversationId });

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
