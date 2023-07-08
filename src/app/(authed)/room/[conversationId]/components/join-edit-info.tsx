"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useEffect, useState } from "react";
import useGetDungeon from "@/hooks/use-get-dungeon";
import Spinner from "@/components/ui/spinner";
import { useGetKingdom } from "@/hooks/use-get-kingdom";
import useUpdateAvatar from "../hooks/use-update-avatar";
import useUpdateRole from "../hooks/use-update-role";
import useRoomSocket from "../hooks/use-room-socket";
import useStartGame from "../hooks/use-start-game";
import useGetRoomData from "@/hooks/use-get-room-data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { redirect } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DungeonDuration, dungeonDuration } from "@/utils/dungeon-options";
import { AiFillSound, AiFillStar } from "react-icons/ai";
import { BiImages } from "react-icons/bi";
import useUpdateRoom from "../hooks/use-update-room";

const imagesAudio = [
  {
    value: "images",
    icon: <BiImages />,
  },
  {
    value: "audio",
    icon: <AiFillSound />,
  },
];

const JoinEditInfo = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const { gameStarting } = useRoomSocket(conversationId);

  const [avatarId, setAvatarId] = useState<string>();
  const [role, setRole] = useState<string>();

  const [duration, setDuration] = useState<DungeonDuration>();
  const [generateImages, setGenerateImages] = useState<boolean>();
  const [generateAudio, setGenerateAudio] = useState<boolean>();

  const { data: roomData, isLoading: isLoadingRoomData, isError } = useGetRoomData(conversationId);
  const { data: dungeonData, isLoading: isLoadingDungeonData } = useGetDungeon(roomData?.dungeonId);
  const { data: kingdomData, isLoading: isLoadingKingdomData } = useGetKingdom();

  const { mutate: updateRoom } = useUpdateRoom(conversationId);
  const { mutate: updateAvatar } = useUpdateAvatar();
  const { mutate: updateRole } = useUpdateRole();
  const { mutate: startGame, isLoading: isGameStarting } = useStartGame();

  useEffect(() => {
    if (roomData) {
      const currentPlayer = roomData.playerState.find(
        (player) => player.accountId === localStorage.getItem("accountId"),
      );
      setAvatarId(currentPlayer?.avatarId);
      setRole(currentPlayer?.champion?._id);
    }
  }, [roomData]);

  useEffect(() => {
    if (duration || generateImages || generateAudio) {
      updateRoom({
        conversationId,
        responseDetailsDepth: duration,
        generateImages,
        generateAudio,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration, generateImages, generateAudio]);

  if (isError) redirect("/home");

  if (isLoadingRoomData || isLoadingDungeonData || isLoadingKingdomData) {
    return (
      <Box
        title="Join"
        className="flex flex-col items-center justify-center gap-8 flex-1 min-h-0 w-[90%] md:w-[490px] h-fit p-8"
      >
        <Spinner className="h-40 w-40" />
      </Box>
    );
  }

  if (!roomData || !dungeonData || !kingdomData) return <div>Something went wrong</div>;

  const generateAudioImagesArray = () => {
    const audioImagesArray = [];
    if (roomData.generateAudio) audioImagesArray.push("audio");
    if (roomData.generateImages) audioImagesArray.push("images");
    return audioImagesArray;
  };

  const currentPlayer = roomData.playerState.find(
    (player) => player.accountId === localStorage.getItem("accountId"),
  );

  const canBegin = roomData.playerState.every((player) => player.champion) ?? false;

  const isAdmin = localStorage.getItem("accountId") === roomData.playerState[0].accountId;

  return (
    <Box
      title="Join"
      className="flex flex-col gap-5 md:gap-8 flex-1 min-h-0  h-fit p-8 text-sm mb-4 md:mb-0"
      wrapperClassName="block w-[90%] md:w-[490px] mx-auto"
    >
      <Select
        defaultValue={currentPlayer?.avatarId}
        value={avatarId}
        onValueChange={(value) => updateAvatar({ conversationId, avatarId: value })}
      >
        <SelectTrigger label="Select an avatar" className="w-full">
          <SelectValue placeholder="Select an avatar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {kingdomData.avatars.map((avatar) => (
              <SelectItem key={avatar._id} value={avatar._id}>
                {avatar.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={role}
        onValueChange={(value) => updateRole({ conversationId, championId: value })}
      >
        <SelectTrigger label="Select a role" className="w-full">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {dungeonData.champions.map((role) => (
              <SelectItem key={role._id} value={role._id}>
                {role.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="w-full border-t border-white/20" />

      <ToggleGroup
        className="inline-flex items-center justify-center w-full"
        type="single"
        onValueChange={(value) => setDuration(value as DungeonDuration)}
        label="Duration"
        value={roomData.responseDetailsDepth}
        disabled={!isAdmin}
      >
        {dungeonDuration.map((duration) => (
          <ToggleGroupItem
            key={duration.value}
            value={duration.value}
            className="border-white/25 border text-sm md:text-base px-4 md:px-6 py-2 data-[state=on]:border-tomato transition-all duration-300 flex gap-2 items-center justify-center w-full relative"
          >
            {duration.value === dungeonData.recommendedResponseDetailsDepth && (
              <div className="absolute right-1 top-1">
                <AiFillStar className="text-tomato h-3 w-3" />
              </div>
            )}
            {duration.icon({})}
            {duration.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <ToggleGroup
        className="inline-flex gap-8 items-center justify-center w-full"
        type="multiple"
        onValueChange={(value) => {
          if (value.includes("images")) setGenerateImages(true);
          else setGenerateImages(false);

          if (value.includes("audio")) setGenerateAudio(true);
          else setGenerateAudio(false);
        }}
        value={generateAudioImagesArray()}
        disabled={!isAdmin}
      >
        {imagesAudio.map((type) => (
          <ToggleGroupItem
            key={type.value}
            value={type.value}
            className="border-white/25 border text-sm md:text-base px-6 md:px-10 py-2 data-[state=on]:border-tomato transition-all duration-300 flex gap-2 items-center justify-center w-full capitalize"
          >
            {type.icon}
            {type.value}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="px-8 uppercase"
              disabled={!isAdmin || !canBegin || gameStarting}
              isLoading={isGameStarting || gameStarting}
              onClick={() => startGame({ conversationId })}
            >
              START
            </Button>
          </TooltipTrigger>
          {!canBegin && (
            <TooltipContent>
              <p>Wait for all players to choose their role and avatar</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </Box>
  );
};

export default JoinEditInfo;
