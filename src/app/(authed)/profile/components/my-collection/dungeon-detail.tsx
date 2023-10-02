import { AiFillHeart } from "react-icons/ai";
import { GiNightSleep } from "react-icons/gi";
import { GoPeople } from "react-icons/go";
import { HiSparkles } from "react-icons/hi";

import { IChampion, IMoveMapping } from "@/types/dungeon";
import { cn } from "@/utils/style-utils";
import useGetDungeon from "@/hooks/use-get-dungeon";
import { Dungeon } from "@/components/dungeon";

interface IDungeonDetailProps {
  dungeonDetailId: string;
  selectedChampion?: IChampion | undefined;
  onChangeChampion?: (champion: IChampion) => void;
}

const DungeonDetail = ({
  dungeonDetailId,
  selectedChampion,
  onChangeChampion,
}: IDungeonDetailProps) => {
  const { data: dungeon, isLoading } = useGetDungeon(dungeonDetailId ?? "");

  // const bgUrl = backgroundStore.bgUrl;
  // const [bgSet, setBgSet] = useState(false);

  // useEffect(() => {
  //   if (!dungeon) bgUrl.set("");
  //   if (dungeon && !bgSet) {
  //     setBgSet(true);
  //     bgUrl.set(dungeon.backgroundUrl);
  //   }
  // }, [bgSet, bgUrl, dungeon]);

  if (isLoading) return <div>Loading...</div>;

  if (!dungeon) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-1 flex-col overflow-y-auto border-b-2 border-b-white/20">
      <Dungeon dungeon={dungeon} />

      <div className="my-8">
        <p>HEROES</p>
        <div className="mt-8 flex flex-col gap-12 px-6">
          {dungeon.champions.map((champion) => (
            <div
              key={champion._id}
              className={cn(
                "flex flex-col gap-4 p-6 transition-all duration-200 hover:bg-white/10",
                champion._id === selectedChampion?._id && "border-2 border-primary bg-white/10",
              )}
              onClick={() => onChangeChampion && onChangeChampion(champion)}
            >
              <p className="text-xl font-semibold">{champion.name}</p>
              <p className="font-light">{champion.description}</p>
              <div className="flex flex-col gap-4">
                <p>ACTIONS</p>
                <div className="grid grid-cols-2 gap-4">
                  {moveMappingWithIcons(champion.moveMapping).map((move) => (
                    <div key={move.text} className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                        {move.icon}
                      </div>
                      <p>{move.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DungeonDetail;

const moveMappingWithIcons = (moveMapping: IMoveMapping) => {
  return [
    {
      text: moveMapping.discover_health,
      icon: <AiFillHeart className="h-5 w-5 fill-primary" />,
    },
    {
      text: moveMapping.conversation_with_team,
      icon: <GoPeople className="h-5 w-5" />,
    },
    {
      text: moveMapping.discover_mana,
      icon: <HiSparkles className="h-5 w-5 fill-info" />,
    },
    {
      text: moveMapping.rest,
      icon: <GiNightSleep className="h-5 w-5" />,
    },
  ];
};
