"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadImage from "@/components/ui/upload-image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import useCreateAvatar from "./hooks/use-create-avatar";

const CreateAvatar = () => {
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const inputFile = useRef<HTMLInputElement | null>(null);

  const { mutate: createAvatar, isLoading } = useCreateAvatar();

  const onCreateAvatar = () => {
    createAvatar({ name });
  };

  return (
    <div className="flex flex-col items-center gap-8 mt-16">
      <Link
        className="flex gap-1 items-center font-medium tracking-[0.08em] uppercase"
        href="/home"
      >
        <AiOutlineLeft className="inline-block" /> GO BACK
      </Link>
      <div>
        <Box title="CREATE AVATAR" className="flex flex-row gap-8 p-8">
          <UploadImage image={image} setImage={setImage} inputFile={inputFile} />
          <div className="flex flex-col gap-12 justify-center w-96">
            <Input
              label="Your avatar's name"
              placeholder="Thorian Blackthorn"
              onChange={(e) => setName(e.target.value)}
              className="text-xl tracking-[0.07em]"
            />
            <Button
              isLoading={isLoading}
              disabled={!name}
              variant={name ? "primary" : "outline"}
              onClick={onCreateAvatar}
            >
              CREATE
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default CreateAvatar;
