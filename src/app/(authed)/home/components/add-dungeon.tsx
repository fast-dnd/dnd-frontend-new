"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const AddDungeon = () => {
  const [dungeonId, setDungeonId] = React.useState<string>("");

  return (
    <div className="flex flex-row gap-8 w-full">
      <Input placeholder="Enter dungeon ID..." onChange={(e) => setDungeonId(e.target.value)} className="h-12 m-0" />
      <Button disabled={!dungeonId} variant={dungeonId ? "primary" : "outline"} className="w-fit px-4">
        ADD
      </Button>
    </div>
  );
};
export default AddDungeon;
