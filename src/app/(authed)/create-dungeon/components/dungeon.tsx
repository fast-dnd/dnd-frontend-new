"use client";

import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/text-area";
import UploadImage from "@/components/ui/upload-image";
import { Dispatch, SetStateAction, useRef } from "react";

export interface DungeonProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

const Dungeon = ({
  name,
  setName,
  description,
  setDescription,
  image,
  setImage,
}: DungeonProps) => {
  const inputFile = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-row gap-8 h-full">
      <UploadImage image={image} inputFile={inputFile} setImage={setImage} />
      <div className="flex flex-col gap-8 flex-1">
        <Input
          label="Name"
          value={name}
          className="w-1/2 m-0"
          onChange={(e) => setName(e.target.value)}
        />
        <div className="flex flex-1 w-full min-h-0">
          <TextArea
            label="Description"
            value={description}
            className="h-full m-0"
            disableResize
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dungeon;
