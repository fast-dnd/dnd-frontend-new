"use client";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

const avatars = ["Random avatar 1", "Random avatar 2", "Random avatar 3", "Random avatar 4"];
const roles = ["Random role 1", "Random role 2", "Random role 3", "Random role 4"];

const JoinEditInfo = () => {
  const [avatar, setAvatar] = useState<string>();
  const [role, setRole] = useState<string>();

  return (
    <Box title="Join" className="flex flex-col gap-8 min-h-0 w-[490px] h-fit p-8">
      <Select value={avatar} onValueChange={(value) => setAvatar(value)}>
        <SelectTrigger label="Select an avatar" className="w-full">
          <SelectValue placeholder="Select an avatar" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Avatars</SelectLabel>
            {avatars.map((avatar) => (
              <SelectItem key={avatar} value={avatar}>
                {avatar}
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
            <SelectLabel>Avatars</SelectLabel>
            {roles.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="w-full flex justify-end">
        <Button variant="primary" className="w-fit px-8 uppercase">
          enter
        </Button>
      </div>
    </Box>
  );
};

export default JoinEditInfo;
