"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dndService from "@/services/dndService";
import { cn } from "@/utils/style-utils";
import { toBase64 } from "@/utils/to-base64";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineUpload } from "react-icons/ai";

const CreateAvatar = () => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const inputFile = useRef<HTMLInputElement | null>(null);

  return (
    <div className="flex flex-col items-center gap-8 mt-16">
      <div
        className="flex flex-row gap-1 items-center font-medium tracking-[0.08em] cursor-pointer uppercase"
        onClick={() => router.back()}
      >
        <AiOutlineLeft className="inline-block" /> GO BACK
      </div>
      <div>
        <Box title="CREATE AVATAR" className="flex flex-row gap-8 p-8">
          <div className="relative h-[250px] w-[250px]">
            <div
              className={cn(
                "absolute h-[250px] w-[250px] bg-black/50 text-white/75 flex flex-col z-10 gap-4 items-center cursor-pointer justify-center",
                image && "bg-black/20"
              )}
              onClick={() => {
                inputFile.current?.click();
              }}
            >
              <input
                type="file"
                ref={inputFile}
                className="hidden"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const base64 = await toBase64(file as File);
                  setImage(base64 as string);
                }}
              />
              <AiOutlineUpload size={90} />
              <p className="text-xs font-medium tracking-[0.07em] text-center indent-[0.07em] uppercase">
                UPLOAD IMAGE
              </p>
            </div>
            <Image
              src={image || "/images/bg-cover.png"}
              width={250}
              height={250}
              className={cn("h-[250px]", !image && "opacity-40")}
              alt="avatar image"
            />
          </div>

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
