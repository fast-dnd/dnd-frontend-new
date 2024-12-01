import Markdown from "react-markdown";

import { jibril } from "@/utils/fonts";

import useGeneral from "../hooks/use-general";

const MovieTime = ({ conversationId }: { conversationId: string }) => {
  const { roomData, asciiMovieHistory } = useGeneral(conversationId);

  if (!roomData || roomData.state !== "GAMING") return <></>;

  const content = (
    <div className="relative h-[50px] w-[190px] max-lg:shrink-0 lg:h-[100px] lg:w-[500px] lg:rounded-lg">
      {Array.from({ length: asciiMovieHistory.length }, (_, i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="overflow-x-auto rounded-md bg-white/10 px-4 py-2">
            <Markdown className="markdown whitespace-pre">{asciiMovieHistory[i]}</Markdown>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-4 rounded-lg py-4 pl-6 max-lg:-mt-32 max-lg:mb-4 lg:gap-8 lg:bg-dark-900 lg:px-16 lg:py-8">
      <div className="flex items-center gap-4">
        <div className="size-2 rotate-45 bg-primary" />
        <p className="text-lg tracking-widest lg:text-xl" style={jibril.style}>
          Movie time
        </p>
        <div className="size-2 rotate-45 bg-primary" />
      </div>
      <div className="flex flex-row justify-between gap-4 overflow-x-auto">{content}</div>
    </div>
  );
};

export default MovieTime;
