"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AddDungeon = () => {
  const router = useRouter();

  const [createLoading, setCreateLoading] = useState(false);

  return (
    <div className="flex flex-row justify-end gap-8">
      <Button
        isLoading={createLoading}
        className="w-full md:w-fit px-8"
        onClick={() => {
          setCreateLoading(true);
          router.push("/create-dungeon");
        }}
      >
        CREATE
      </Button>
    </div>
  );
};
export default AddDungeon;
