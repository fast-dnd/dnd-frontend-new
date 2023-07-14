/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { isEqual } from "lodash";

import { IDungeon } from "@/types/dungeon";
import useStore from "@/hooks/use-store";

import { initialDungeonFormData, useDungeonFormStore } from "../stores/form-store";

interface IUseLoadDungeonDataProps {
  dungeonId: string | undefined;
  dungeonData: IDungeon | undefined;
}

const useLoadDungeonData = ({ dungeonId, dungeonData }: IUseLoadDungeonDataProps) => {
  const dungeonFormStore = useStore(useDungeonFormStore, (state) => state);

  const previousDungeonFormStore = useRef(dungeonFormStore);

  const loadDungeonData = () => {
    if (dungeonId) {
      // editing...
      if (dungeonData && dungeonFormStore && !dungeonFormStore.dungeonFormData.id) {
        dungeonFormStore.populateDataFromAPI(dungeonId, dungeonData);
      }
    } else {
      // creating...
      if (dungeonFormStore) {
        // if the user is not in creation process but just started it then reset the form
        if (isEqual(dungeonFormStore.dungeonFormData, initialDungeonFormData))
          dungeonFormStore?.resetDungeonFormData();
      }
    }

    // Update previousDungeonFormStore two times to ensure it is always one step behind dungeonFormStore
    previousDungeonFormStore.current = dungeonFormStore;
  };

  useEffect(() => {
    loadDungeonData();
  }, [dungeonData, dungeonId]);

  //! Hacky way to wait for dungeonFormStore to become defined (mounted) after nextjs hydration
  useEffect(() => {
    // Check if dungeonFormStore has become defined
    if (dungeonFormStore && !previousDungeonFormStore.current) {
      loadDungeonData();
    }
  }, [dungeonFormStore]);

  return dungeonFormStore;
};

export default useLoadDungeonData;
