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

const JoinEditInfo = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const { gameStarting } = useRoomSocket(conversationId);
  const [avatarId, setAvatarId] = useState<string>();
  const [role, setRole] = useState<string>();
  const [copied, setCopied] = React.useState(false);

  const { data: roomData, isLoading: isLoadingRoomData, isError } = useGetRoomData(conversationId);
  const { data: dungeonData, isLoading: isLoadingDungeonData } = useGetDungeon(roomData?.dungeonId);
  const { data: kingdomData, isLoading: isLoadingKingdomData } = useGetKingdom();

  const { mutate: updateAvatar, isLoading: isUpdatingAvatar } = useUpdateAvatar();
  const { mutate: updateRole, isLoading: isUpdatingRole } = useUpdateRole();
  const { mutate: startGame, isLoading: isGameStarting } = useStartGame();

  const onUpdate = () => {
    if (avatarId) updateAvatar({ conversationId, avatarId });
    if (role) updateRole({ conversationId, championId: role });
  };

  const canBegin = roomData?.playerState.every((player) => player.champion) ?? false;

  useEffect(() => {
    if (roomData) {
      const currentPlayer = roomData.playerState.find(
        (player) => player.accountId === localStorage.getItem("accountId"),
      );
      setAvatarId(currentPlayer?.avatarId);
      setRole(currentPlayer?.champion?._id);
    }
  }, [roomData]);

  if (isError) redirect("/home");

  if (isLoadingRoomData || isLoadingDungeonData || isLoadingKingdomData) {
    return (
      <Box
        title="Join"
        className="flex flex-col items-center justify-center gap-8 flex-1 min-h-0 w-[490px] h-fit p-8"
      >
        <Spinner className="h-40 w-40" />
      </Box>
    );
  }

  if (!roomData || !dungeonData || !kingdomData) return <div>Something went wrong</div>;

  const onCopyRoomId = () => {
    navigator.clipboard.writeText(roomData.link);
    setCopied(true);
  };

  return (
    <Box
      title="Join"
      className="flex flex-col gap-8 justify-between flex-1 min-h-0 w-[490px] h-fit p-8"
    >
      <Select value={avatarId} onValueChange={(value) => setAvatarId(value)}>
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
      <Select value={role} onValueChange={(value) => setRole(value)}>
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
      <div className="w-full flex justify-end">
        <Button
          variant="primary"
          disabled={gameStarting}
          className="w-fit px-8 uppercase"
          onClick={onUpdate}
          isLoading={isUpdatingAvatar || isUpdatingRole}
        >
          {isUpdatingAvatar || isUpdatingRole ? "updating" : "update"}
        </Button>
      </div>
      <div className="w-full border-t border-white/20" />
      <div className="flex justify-between gap-4">
        <p className="mt-2 text-lg text-center flex-1 whitespace-nowrap">{roomData.link}</p>
        <Button
          onClick={onCopyRoomId}
          variant={copied ? "primary" : "outline"}
          className="uppercase text-lg w-fit px-4 whitespace-nowrap"
        >
          {copied ? "Copied" : "Copy room id"}
        </Button>
      </div>
      <div className="w-full border-t border-white/20" />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="px-8 uppercase"
              disabled={!canBegin || gameStarting}
              isLoading={isGameStarting || gameStarting}
              onClick={() => startGame({ conversationId })}
            >
              begin
            </Button>
          </TooltipTrigger>
          {!canBegin && (
            <TooltipContent>
              <p>Please choose your role and avatar</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </Box>
  );
};

export default JoinEditInfo;
