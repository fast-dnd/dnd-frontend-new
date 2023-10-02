import { useState } from "react";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ObservableObject } from "@legendapp/state";
import { AddCircle } from "iconsax-react";

import { IChampion, ILocation } from "@/types/dungeon";
import { Button } from "@/components/ui/button";

import { dungeonFormStore } from "../stores/dungeon-form-store";
import { StatusType } from "../utils/step-utils";
import Champion from "./champion";
import Location from "./location";
import SortableItem from "./sortable-item";

interface IChampionsLocationsWrapperProps {
  locationOrChampion: "Location" | "Champion";
  status: StatusType;
  setStatus: React.Dispatch<React.SetStateAction<StatusType>>;
}

const ChampionsLocationsWrapper = ({
  locationOrChampion,
  status,
  setStatus,
}: IChampionsLocationsWrapperProps) => {
  const dungeonFormField = locationOrChampion === "Location" ? "locations" : "champions";
  type ObservableChampionLocation = ObservableObject<(ILocation | IChampion)[]>;

  const { dungeonFormData } = dungeonFormStore.use();

  const isDisabledAddButton = dungeonFormData.locations.length >= 4;

  const chmpLocObservable = dungeonFormStore.dungeonFormData[
    dungeonFormField
  ] as ObservableChampionLocation;

  const [editIndex, setEditIndex] = useState(-1);

  const onEdit = (index: number) => {
    setEditIndex(index);
    setStatus("EDITING");
  };

  const onDelete = (index: number) => {
    chmpLocObservable.set((prev) => {
      const newPrev = [...prev];
      newPrev.splice(index, 1);

      return newPrev;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      chmpLocObservable.set((prev) => {
        const newPrev = [...prev];
        const oldIndex = prev.findIndex((chmpLoc) => JSON.stringify(chmpLoc) === active.id);
        const newIndex = prev.findIndex((chmpLoc) => JSON.stringify(chmpLoc) === over.id);
        const [removed] = newPrev.splice(oldIndex, 1);
        newPrev.splice(newIndex, 0, removed);

        return newPrev;
      });
    }
  };

  return (
    <>
      <div className="flex min-h-0 w-full flex-1">
        {status === "LIST" ? (
          <div className="flex h-full w-full flex-col gap-5 overflow-y-auto lg:gap-8">
            {dungeonFormData[dungeonFormField].length > 0 ? (
              <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <div className="flex w-full flex-col gap-5 lg:gap-8">
                  <SortableContext
                    items={dungeonFormData[dungeonFormField].map((chmpLoc) =>
                      JSON.stringify(chmpLoc),
                    )}
                    strategy={verticalListSortingStrategy}
                  >
                    {dungeonFormData[dungeonFormField].map((chmpLoc, i) => (
                      <SortableItem
                        key={Math.random()}
                        item={chmpLoc}
                        i={i}
                        onEdit={onEdit}
                        onDelete={onDelete}
                      />
                    ))}
                  </SortableContext>
                </div>
              </DndContext>
            ) : locationOrChampion === "Location" ? (
              <div className="flex w-full items-center justify-center">
                <div className="flex h-full w-[490px] flex-col items-center justify-start p-5 lg:gap-2 ">
                  <CastleIcon />
                  <p className="text-center text-lg font-semibold uppercase leading-7 tracking-[3.30px] lg:text-xl">
                    Empty Halls Await Your Imagination!
                  </p>
                  <p className="text-center text-sm font-normal leading-7 tracking-widest text-white/50 lg:text-base">
                    Your dungeon is an open book, waiting for its first chapter. Add a new location
                    and start writing your adventure&apos;s exciting tale!
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex w-full items-center justify-center">
                <div className="flex h-full w-[490px] flex-col items-center justify-start p-5 lg:gap-2 ">
                  <HelmetIcon />
                  <p className="text-center text-lg font-semibold uppercase leading-7 tracking-[3.30px] lg:text-xl">
                    Call Forth a Hero!
                  </p>
                  <p className="text-center text-sm font-normal leading-7 tracking-widest text-white/50 lg:text-base">
                    Your story needs a hero. Click &apos;Add New Champion&apos; to create a legend
                    as unique and bold as your own imagination. Let&apos;s start the saga!
                  </p>
                </div>
              </div>
            )}

            <Button
              variant="outline"
              disabled={isDisabledAddButton}
              className="flex w-full items-center gap-2 px-8 text-base uppercase"
              onClick={() => setStatus("CREATING")}
            >
              <AddCircle variant="Bold" />
              ADD NEW {locationOrChampion}
            </Button>

            <div className="block w-full border-t border-white/20 lg:hidden" />

            <div className="flex flex-row items-center justify-between gap-8 lg:hidden"></div>
          </div>
        ) : locationOrChampion === "Location" ? (
          <Location
            editIndex={editIndex}
            setEditIndex={setEditIndex}
            status={status}
            setStatus={setStatus}
          />
        ) : (
          <Champion
            editIndex={editIndex}
            setEditIndex={setEditIndex}
            status={status}
            setStatus={setStatus}
          />
        )}
      </div>
    </>
  );
};

export default ChampionsLocationsWrapper;

const CastleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
    <path d="M24.25 33.75H8L10.5 36.25H21.75L24.25 33.75Z" fill="white" fillOpacity="0.8" />
    <path d="M41.75 20H19.25L21.75 22.5H39.25L41.75 20Z" fill="white" />
    <path
      d="M21.75 26.25V28.75H18V26.25H14.25V28.75H10.5V26.25H8V33.75H24.25V26.25H21.75Z"
      fill="white"
    />
    <path
      d="M36.75 12.5V15H33V12.5H28V15H24.25V12.5H19.25V20H41.75V12.5H36.75Z"
      fill="white"
      fillOpacity="0.6"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M21.75 22.5H39.25V55H34.25V48.75C34.25 46.6788 32.5712 45 30.5 45C28.4288 45 26.75 46.6788 26.75 48.75V55H21.75V22.5Z"
      fill="white"
      fillOpacity="0.5"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10.5 36.25H21.75V55H8L10.5 36.25ZM14.25 40.625V45H18V40.625C18 39.59 17.16 38.75 16.125 38.75C15.09 38.75 14.25 39.59 14.25 40.625Z"
      fill="white"
      fillOpacity="0.8"
    />
    <path d="M36.75 33.75H53L50.5 36.25H39.25L36.75 33.75Z" fill="white" fillOpacity="0.8" />
    <path
      d="M39.25 26.25V28.75H43V26.25H46.75V28.75H50.5V26.25H53V33.75H36.75V26.25H39.25Z"
      fill="white"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M50.5 36.25H39.25V55H53L50.5 36.25ZM46.75 40.625V45H43V40.625C43 39.59 43.84 38.75 44.875 38.75C45.91 38.75 46.75 39.59 46.75 40.625Z"
      fill="white"
      fillOpacity="0.8"
    />
  </svg>
);

const HelmetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="61" height="60" viewBox="0 0 61 60" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.25 38.75V53.75L51.75 48.75L48 41.25C48 41.25 52.6513 30.695 49.2025 21.3613C46.6127 14.3552 39.5882 10.9673 34.7508 8.63429C32.8779 7.73099 31.3328 6.98582 30.5 6.25V35L34.1337 28.6413C34.9787 27.1625 36.5512 26.25 38.2537 26.25C40.875 26.25 43 28.3738 43 30.995V30.9963C43 32.6988 42.0875 34.2713 40.6088 35.1163L34.25 38.75ZM35.8661 20.3661C36.1005 20.1317 36.4185 20 36.75 20C37.0815 20 37.3995 20.1317 37.6339 20.3661C37.8683 20.6005 38 20.9185 38 21.25C38 21.5815 37.8683 21.8995 37.6339 22.1339C37.3995 22.3683 37.0815 22.5 36.75 22.5C36.4185 22.5 36.1005 22.3683 35.8661 22.1339C35.6317 21.8995 35.5 21.5815 35.5 21.25C35.5 20.9185 35.6317 20.6005 35.8661 20.3661ZM40.8661 20.3661C41.1005 20.1317 41.4185 20 41.75 20C42.0815 20 42.3995 20.1317 42.6339 20.3661C42.8683 20.6005 43 20.9185 43 21.25C43 21.5815 42.8683 21.8995 42.6339 22.1339C42.3995 22.3683 42.0815 22.5 41.75 22.5C41.4185 22.5 41.1005 22.3683 40.8661 22.1339C40.6317 21.8995 40.5 21.5815 40.5 21.25C40.5 20.9185 40.6317 20.6005 40.8661 20.3661ZM45.8661 20.3661C46.1005 20.1317 46.4185 20 46.75 20C47.0815 20 47.3995 20.1317 47.6339 20.3661C47.8683 20.6005 48 20.9185 48 21.25C48 21.5815 47.8683 21.8995 47.6339 22.1339C47.3995 22.3683 47.0815 22.5 46.75 22.5C46.4185 22.5 46.1005 22.3683 45.8661 22.1339C45.6317 21.8995 45.5 21.5815 45.5 21.25C45.5 20.9185 45.6317 20.6005 45.8661 20.3661Z"
      fill="white"
      fillOpacity="0.7"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M26.75 38.75V53.75L9.25 48.75L13 41.25C13 41.25 8.34875 30.695 11.7975 21.3613C14.3873 14.3552 21.4118 10.9673 26.2492 8.63429C28.1221 7.73099 29.6672 6.98582 30.5 6.25V35L26.8662 28.6413C26.0212 27.1625 24.4487 26.25 22.7463 26.25C20.125 26.25 18 28.3738 18 30.995V30.9963C18 32.6988 18.9125 34.2713 20.3912 35.1163L26.75 38.75ZM13.3661 20.3661C13.6005 20.1317 13.9185 20 14.25 20C14.5815 20 14.8995 20.1317 15.1339 20.3661C15.3683 20.6005 15.5 20.9185 15.5 21.25C15.5 21.5815 15.3683 21.8995 15.1339 22.1339C14.8995 22.3683 14.5815 22.5 14.25 22.5C13.9185 22.5 13.6005 22.3683 13.3661 22.1339C13.1317 21.8995 13 21.5815 13 21.25C13 20.9185 13.1317 20.6005 13.3661 20.3661ZM18.3661 20.3661C18.6005 20.1317 18.9185 20 19.25 20C19.5815 20 19.8995 20.1317 20.1339 20.3661C20.3683 20.6005 20.5 20.9185 20.5 21.25C20.5 21.5815 20.3683 21.8995 20.1339 22.1339C19.8995 22.3683 19.5815 22.5 19.25 22.5C18.9185 22.5 18.6005 22.3683 18.3661 22.1339C18.1317 21.8995 18 21.5815 18 21.25C18 20.9185 18.1317 20.6005 18.3661 20.3661ZM23.3661 20.3661C23.6005 20.1317 23.9185 20 24.25 20C24.5815 20 24.8995 20.1317 25.1339 20.3661C25.3683 20.6005 25.5 20.9185 25.5 21.25C25.5 21.5815 25.3683 21.8995 25.1339 22.1339C24.8995 22.3683 24.5815 22.5 24.25 22.5C23.9185 22.5 23.6005 22.3683 23.3661 22.1339C23.1317 21.8995 23 21.5815 23 21.25C23 20.9185 23.1317 20.6005 23.3661 20.3661Z"
      fill="white"
      fillOpacity="0.7"
    />
    <path
      d="M34.1337 28.6413L30.5 35V3.75C30.5 3.75 34.9787 27.1625 34.1337 28.6413Z"
      fill="white"
    />
    <path
      d="M26.8659 28.6413L30.4996 35V3.75C30.4996 3.75 26.0209 27.1625 26.8659 28.6413Z"
      fill="white"
      fillOpacity="0.5"
    />
  </svg>
);
