"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dndService from "@/services/dndService";
import { useRouter } from "next/navigation";
import React from "react";

const JoinRoom = () => {
  const [roomLink, setRoomLink] = React.useState<string>("");

  const router = useRouter();

  const joinRoom = () => {
    dndService
      .joinRoom({ link: roomLink })
      .then((res) => router.push(`lobby/${res.data.conversationId}`));
  };

  return (
    <Box title="JOIN ROOM" className="flex flex-col gap-8 p-8">
      <Input label="Room ID" onChange={(e) => setRoomLink(e.target.value)} />
      <Button disabled={roomLink.length === 0} variant="outline" onClick={joinRoom}>
        JOIN
      </Button>
    </Box>
  );
};

export default JoinRoom;
