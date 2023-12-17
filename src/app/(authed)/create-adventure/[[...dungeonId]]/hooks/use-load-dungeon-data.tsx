import { useEffect, useState } from "react";

import { IDungeonDetail } from "@/types/dungeon";

import {
  dungeonFormStore,
  getInitialDungeonFormData,
  initialDungeonFormData,
} from "../stores/dungeon-form-store";
import { tagsAttachLabel } from "../utils/tags-utils";

interface IUseLoadDungeonDataProps {
  dungeonData: IDungeonDetail | undefined;
}

const useLoadDungeonData = ({ dungeonData }: IUseLoadDungeonDataProps) => {
  const dungeonFormData = dungeonFormStore.dungeonFormData.use();

  const [aborting, setAborting] = useState(false);

  useEffect(() => {
    if (!dungeonData && dungeonFormData._id) {
      dungeonFormStore.dungeonFormData.set(getInitialDungeonFormData());
    } else if (dungeonFormData._id !== dungeonData?._id) {
      if (dungeonData && !aborting) {
        // editing...
        dungeonFormStore.dungeonFormData.set({
          ...dungeonData,
          tags: tagsAttachLabel(dungeonData.tags),
        });
      } else {
        // creating...
        if (JSON.stringify(dungeonFormData) === JSON.stringify(initialDungeonFormData)) {
          dungeonFormStore.dungeonFormData.set(getInitialDungeonFormData());
        }
      }
    }
  }, [dungeonData, aborting, dungeonFormData]);

  return { setAborting };
};

export default useLoadDungeonData;
