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
    <div key={adventure._id} className="relative h-[300px] w-[500px] overflow-hidden rounded-lg">
      <Image
        src={adventure.imageUrl || "/images/default-dungeon.png"}
        alt={adventure.name}
        width={500}
        height={300}
      />
      <div className="absolute inset-0 size-full bg-gradient-to-b from-black to-transparent to-60%" />
      <div className="absolute inset-0 size-full bg-gradient-to-t from-black via-black/30 via-60% to-transparent to-80%" />

      <div className="absolute inset-0 z-10 flex size-full flex-col justify-between px-2 py-4">
        <div className="flex justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded bg-black/30">
              <Game className="size-6" variant="Bold" color="#FF5A5A" />
            </div>
            <p className="text-lg font-bold">{adventure.maxPlayers}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded bg-black/30">
              <Star1 className="size-6" variant="Bold" color="#FF5A5A" />
            </div>
            <p className="whitespace-nowrap text-lg font-bold">
              {adventure.rating + " (" + adventure.numOfRatings + ")"}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="line-clamp-2 break-words px-3 text-lg font-semibold">{adventure.name}</p>
          {adventure.tags.length > 0 && (
            <div className="flex pl-3">
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
    <div className="flex flex-col gap-8 rounded-lg bg-dark-900 px-16 py-8">
      <div className="flex items-center gap-4">
        <div className="size-2 rotate-45 bg-primary" />
        <p className="text-xl tracking-widest" style={jibril.style}>
          YOU MAY ALSO LIKE
        </p>

        <div className="size-2 rotate-45 bg-primary" />
      </div>
      <div className="flex justify-between gap-4 overflow-x-auto">{content}</div>
    </div>
  );
};

export default RecommendedAdventures;
