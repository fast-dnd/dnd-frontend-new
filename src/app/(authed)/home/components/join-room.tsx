"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const JoinRoom = () => {
  const [roomId, setRoomId] = React.useState<string>("");

  return (
    <Box title="JOIN ROOM" className="flex flex-col gap-8 p-8">
      <Input label="Room ID" onChange={(e) => setRoomId(e.target.value)} />
      <Button disabled={roomId.length === 0} variant={roomId ? "primary" : "outline"}>
        JOIN
      </Button>
    </Box>
  );
};

export default JoinRoom;
