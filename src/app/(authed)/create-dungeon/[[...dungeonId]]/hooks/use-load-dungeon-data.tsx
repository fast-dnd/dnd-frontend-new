import { useEffect, useState } from "react";

import { IDungeonDetail } from "@/types/dungeon";

import { dungeonFormStore, initialDungeonFormData } from "../stores/dungeon-form-store";
import { tagsAttachLabel } from "../utils/tags-utils";

interface IUseLoadDungeonDataProps {
  dungeonData: IDungeonDetail | undefined;
}

const useLoadDungeonData = ({ dungeonData }: IUseLoadDungeonDataProps) => {
  const dungeonFormData = dungeonFormStore.dungeonFormData.use();

  const [isMounted, setIsMounted] = useState(false);
  const [aborting, setAborting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (dungeonFormData._id !== dungeonData?._id) {
      if (dungeonData && !aborting) {
        // editing...
        dungeonFormStore.dungeonFormData.set({
          ...dungeonData,
          tags: tagsAttachLabel(dungeonData.tags),
        });
      } else {
        // creating...
        if (JSON.stringify(dungeonFormData) === JSON.stringify(initialDungeonFormData)) {
          dungeonFormStore.dungeonFormData.set({ ...initialDungeonFormData });
        }
      }
    }
  }, [dungeonData, aborting, dungeonFormData]);

  return { isMounted, setAborting };
};

export default useLoadDungeonData;
