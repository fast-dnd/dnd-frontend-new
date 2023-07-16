"use client";

import { Button } from "@/components/ui/button";

const AddDungeon = () => {
  return (
    <div className="flex flex-row justify-end gap-8">
      <Button href="/create-dungeon" className="w-full px-8 lg:w-fit">
        CREATE DUNGEON
      </Button>
    </div>
  );
};
export default AddDungeon;
