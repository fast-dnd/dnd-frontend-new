import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import { IPostChampion } from "@/services/dndService";
import { Dispatch, SetStateAction, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export interface ChampionsProps {
  champions: IPostChampion[];
  setChampions: Dispatch<SetStateAction<IPostChampion[]>>;
}

const Champions = ({ champions, setChampions }: ChampionsProps) => {
  const [status, setStatus] = useState<"LIST" | "CREATING" | "EDITING">("LIST");
  const [currentChampion, setCurrentChampion] =
    useState<Partial<IPostChampion>>();
  const [editIndex, setEditIndex] = useState(-1);

  return (
    <div className="flex w-full h-full min-h-0">
      {status === "LIST" && (
        <div className="flex flex-col gap-8 w-full h-full min-h-0">
          {champions.length > 0 && (
            <div className="flex flex-col gap-8 w-full overflow-y-auto no-scrollbar">
              {champions.map((chm, i) => (
                <div
                  key={`${chm.name}${i}`}
                  className="w-full bg-white/5 flex flex-row items-center p-4 gap-4"
                >
                  <p className="w-full text-2xl font-medium tracking-widest">
                    {i + 1}. {chm.name}
                  </p>
                  <MdEdit
                    className="text-white/75 cursor-pointer"
                    size={32}
                    onClick={() => {
                      setEditIndex(i);
                      setCurrentChampion(chm);
                      setStatus("EDITING");
                    }}
                  />

                  <MdDelete
                    className="text-white/75 cursor-pointer"
                    size={32}
                    onClick={() =>
                      setChampions(champions.filter((_, j) => i !== j))
                    }
                  />
                </div>
              ))}
            </div>
          )}

          <p className="text-xl tracking-[0.07em] text-white/50">
            Create between 2 and 4 champions
          </p>

          <Button
            variant="outline"
            disabled={champions.length >= 4}
            className="w-fit px-8"
            onClick={() => {
              setStatus("CREATING");
              setCurrentChampion({});
            }}
          >
            ADD NEW CHAMPION
          </Button>
        </div>
      )}
      {status !== "LIST" && (
        <div className="flex flex-col h-full gap-8 w-full">
          <p className="text-xl tracking-[0.07em] -my-1 text-white/50">
            Describe the champion and define custom names for its actions
          </p>
          <div className="flex flex-row gap-8 h-full">
            <div className="flex flex-col basis-1/3 gap-8 h-full min-h-0">
              <Input
                label="Name"
                value={currentChampion?.name || ""}
                onChange={(e) =>
                  setCurrentChampion({
                    ...currentChampion,
                    name: e.target.value,
                  })
                }
                className="m-0"
              />
              <div className="flex min-h-0 h-full">
                <TextArea
                  label="Description"
                  value={currentChampion?.description || ""}
                  disableResize
                  onChange={(e) =>
                    setCurrentChampion({
                      ...currentChampion,
                      description: e.target.value,
                    })
                  }
                  className="m-0 h-full"
                />
              </div>
            </div>
            <div className="flex flex-col basis-1/3 gap-8 h-full min-h-0">
              <Input
                label="Heal action text"
                value={currentChampion?.moveMapping?.discover_health || ""}
                onChange={(e) => {
                  setCurrentChampion({
                    ...currentChampion,
                    moveMapping: {
                      ...currentChampion?.moveMapping,
                      discover_health: e.target.value,
                    },
                  });
                }}
              />
              <Input
                label="Team action text"
                value={
                  currentChampion?.moveMapping?.conversation_with_team || ""
                }
                onChange={(e) => {
                  setCurrentChampion({
                    ...currentChampion,
                    moveMapping: {
                      ...currentChampion?.moveMapping,
                      conversation_with_team: e.target.value,
                    },
                  });
                }}
              />
            </div>
            <div className="flex flex-col basis-1/3 gap-8 h-full min-h-0">
              <Input
                label="Mana action text"
                value={currentChampion?.moveMapping?.discover_mana || ""}
                onChange={(e) => {
                  setCurrentChampion({
                    ...currentChampion,
                    moveMapping: {
                      ...currentChampion?.moveMapping,
                      discover_mana: e.target.value,
                    },
                  });
                }}
              />
              <Input
                label="Rest action text"
                value={currentChampion?.moveMapping?.rest || ""}
                onChange={(e) => {
                  setCurrentChampion({
                    ...currentChampion,
                    moveMapping: {
                      ...currentChampion?.moveMapping,
                      rest: e.target.value,
                    },
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end gap-8">
            <Button
              className="font-medium tracking-[0.08em] w-fit text-white/50 uppercase"
              variant="ghost"
              onClick={() => {
                setCurrentChampion({});
                setStatus("LIST");
                setEditIndex(-1);
              }}
            >
              CANCEL
            </Button>
            <Button
              className="w-fit px-8 uppercase"
              variant="outline"
              onClick={() => {
                if (status === "CREATING") {
                  setChampions([
                    ...champions,
                    currentChampion as IPostChampion,
                  ]);
                } else {
                  setChampions(
                    champions.map((chm, i) =>
                      i === editIndex ? (currentChampion as IPostChampion) : chm
                    )
                  );
                }
                setEditIndex(-1);
                setCurrentChampion({});
                setStatus("LIST");
              }}
            >
              {status === "CREATING" ? "ADD CHAMPION" : "EDIT CHAMPION"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Champions;
