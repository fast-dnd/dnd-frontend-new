"use client";

import React from "react";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useJoinRoom from "../../hooks/use-join-room";

const JoinRoom = () => {
  const [roomLink, setRoomLink] = React.useState<string>("");

  const { mutate: joinRoom, isLoading } = useJoinRoom();

  const onJoinRoom = () => joinRoom({ link: roomLink });

  return (
    <Box title="JOIN ROOM" className="flex flex-col gap-8 p-8">
      <Input
        label="Room ID"
        placeholder="ex. clean-thoughtless-evening"
        onChange={(e) => setRoomLink(e.target.value)}
      />
      <Button
        isLoading={isLoading}
        disabled={roomLink.length === 0}
        variant="outline"
        onClick={onJoinRoom}
      >
        JOIN
      </Button>
    </Box>
  );
};

export default JoinRoom;
