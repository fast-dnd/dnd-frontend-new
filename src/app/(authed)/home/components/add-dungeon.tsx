"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const AddDungeon = () => {
  const router = useRouter();

  const [createLoading, setCreateLoading] = useState(false);

  return (
    <div className="flex flex-row justify-end gap-8">
      <Button
        isLoading={createLoading}
        className="w-full px-8 lg:w-fit"
        onClick={() => {
          setCreateLoading(true);
          router.push("/create-dungeon");
        }}
      >
        CREATE DUNGEON
      </Button>
    </div>
  );
};
export default AddDungeon;
