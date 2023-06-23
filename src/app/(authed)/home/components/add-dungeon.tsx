"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AddDungeon = () => {
  const router = useRouter();

  return (
    <div className="flex flex-row justify-end gap-8">
      <Button className="w-fit px-8" onClick={() => router.push("/create-dungeon")}>
        CREATE
      </Button>
    </div>
  );
};
export default AddDungeon;
