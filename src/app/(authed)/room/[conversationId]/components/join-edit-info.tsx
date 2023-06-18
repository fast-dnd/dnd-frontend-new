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
import useGetRoomData from "../hooks/use-get-room-data";
import useGetDungeon from "@/hooks/use-get-dungeon";
import Spinner from "@/components/ui/spinner";
import { useGetKingdom } from "@/hooks/use-get-kingdom";
import useUpdateAvatar from "../hooks/use-update-avatar";
import useUpdateRole from "../hooks/use-update-role";
import useRoomSocket from "../hooks/use-room-socket";
import useStartGame from "../hooks/use-start-game";

const JoinEditInfo = (props: { conversationId: string }) => {
  const { conversationId } = props;
  const { gameStarting } = useRoomSocket(conversationId);
  const [avatarId, setAvatarId] = useState<string>();
  const [role, setRole] = useState<string>();

  const { data: roomData } = useGetRoomData(conversationId);
  const { data: dungeonData } = useGetDungeon(roomData?.dungeonId);
  const { data: kingdomData } = useGetKingdom();

  const { mutate: updateAvatar } = useUpdateAvatar();
  const { mutate: updateRole } = useUpdateRole();
  const { mutate: startGame } = useStartGame();

  const onUpdate = () => {
    if (avatarId) updateAvatar({ conversationId, avatarId });
    if (role) updateRole({ conversationId, championId: role });
  };

  const canBegin = () => {
    return roomData?.playerState.every((player) => player.champion) ?? false;
  };

  useEffect(() => {
    if (roomData) {
      const currentPlayer = roomData.playerState.find(
        (player) => player.accountId === localStorage.getItem("accountId"),
      );
      setAvatarId(currentPlayer?.avatarId);
      setRole(currentPlayer?.champion?._id);
    }
  }, [roomData]);

  if (!roomData || !dungeonData || !kingdomData) {
    return (
      <Box
        title="Join"
        className="flex flex-col items-center justify-center gap-8 min-h-0 w-[490px] h-fit p-8"
      >
        <Spinner className="h-40 w-40" />
      </Box>
    );
  }

  return (
    <Box title="Join" className="flex flex-col gap-8 min-h-0 w-[490px] h-fit p-8">
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
        >
          update
        </Button>
      </div>
      <div className="w-full border-t border-white/20" />
      <Button
        className="px-8 uppercase"
        disabled={!canBegin() || gameStarting}
        onClick={() => startGame({ conversationId })}
      >
        begin
      </Button>
    </Box>
  );
};

export default JoinEditInfo;
