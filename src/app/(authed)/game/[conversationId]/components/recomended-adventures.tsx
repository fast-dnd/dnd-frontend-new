import Image from "next/image";
import { Game, Star1 } from "iconsax-react";

import useGetDungeons from "@/hooks/queries/use-get-dungeons";
import useGetRoomData from "@/hooks/queries/use-get-room-data";
import { jibril } from "@/utils/fonts";

const RecommendedAdventures = ({ conversationId }: { conversationId: string }) => {
  const { data: roomData } = useGetRoomData(conversationId);
  const { data: adventuresData, isError, isLoading } = useGetDungeons({ filter: "recommended" });

  if (!roomData || isLoading || (roomData.state !== "LOSE" && roomData.state !== "WIN"))
    return <></>;

  if (isError) return <div>Something went wrong...</div>;

  const content = adventuresData?.pages[0].dungeons.slice(0, 3).map((adventure) => (
    <div
      key={adventure._id}
      className="relative h-[148px] w-[190px] overflow-hidden max-lg:shrink-0 lg:h-[300px] lg:w-[500px] lg:rounded-lg"
    >
      <Image
        src={adventure.imageUrl || "/images/default-dungeon.png"}
        alt={adventure.name}
        width={500}
        height={300}
      />
      <div className="absolute inset-0 size-full bg-gradient-to-b from-black to-transparent to-60%" />
      <div className="absolute inset-0 size-full bg-gradient-to-t from-black via-black/30 via-60% to-transparent to-80%" />

      <div className="absolute inset-0 z-10 flex size-full flex-col justify-between px-2 pt-2 lg:py-4">
        <div className="flex justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded bg-black/30 lg:size-7">
              <Game className="size-4 lg:size-6" variant="Bold" color="#FF5A5A" />
            </div>
            <p className="text-sm font-bold lg:text-lg">{adventure.maxPlayers}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded bg-black/30 lg:size-7">
              <Star1 className="size-4 lg:size-6" variant="Bold" color="#FF5A5A" />
            </div>
            <p className="whitespace-nowrap text-sm font-bold lg:text-lg">
              {adventure.rating + " (" + adventure.numOfRatings + ")"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="line-clamp-2 break-words px-2 text-lg font-semibold lg:px-3">
            {adventure.name}
          </p>
          {adventure.tags.length > 0 && (
            <div className="flex pl-3 max-lg:hidden">
              <div className="flex gap-2">
                {adventure.tags.map((tag) => (
                  <div
                    key={tag}
                    className="whitespace-nowrap text-xs capitalize leading-none opacity-70"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex flex-col gap-4 rounded-lg py-4 pl-6 max-lg:-mt-32 max-lg:mb-4 lg:gap-8 lg:bg-dark-900 lg:px-16 lg:py-8">
      <div className="flex items-center gap-4">
        <div className="size-2 rotate-45 bg-primary" />
        <p className="text-lg tracking-widest lg:text-xl" style={jibril.style}>
          YOU MAY ALSO LIKE
        </p>

        <div className="size-2 rotate-45 bg-primary" />
      </div>
      <div className="flex flex-row justify-between gap-4 overflow-x-auto">{content}</div>
    </div>
  );
};

export default RecommendedAdventures;
