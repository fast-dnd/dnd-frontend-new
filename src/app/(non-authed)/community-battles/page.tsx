"use client";

import { useRouter } from "next/navigation";

import { Box } from "@/components/ui/box";

import Tournament from "./components/tournament";

const Leaderboard = () => {
  const router = useRouter();
  return (
    <>
      <Tournament />
    </>
  );
};

export default Leaderboard;
