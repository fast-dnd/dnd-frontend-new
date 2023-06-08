"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UploadImage from "@/components/ui/upload-image";
import dndService from "@/services/dndService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";

const CreateAvatar = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const inputFile = useRef<HTMLInputElement | null>(null);

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
          <UploadImage
            image={image}
            setImage={setImage}
            inputFile={inputFile}
          />
          <div className="flex flex-col gap-12 justify-center w-96">
            <Input
              label="Your avatar's name"
              placeholder="Thorian Blackthorn"
              onChange={(e) => setName(e.target.value)}
              className="text-xl tracking-[0.07em]"
            />
            <Button
              disabled={!name}
              variant={name ? "primary" : "outline"}
              onClick={() => {
                dndService
                  .createAvatar({ name })
                  .then(() => router.push("/home"));
              }}
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
