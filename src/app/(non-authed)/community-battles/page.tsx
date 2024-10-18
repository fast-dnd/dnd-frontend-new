"use client";

import { useRouter } from "next/navigation";

import Tournament from "./components/tournament";

const CommunityBattle = () => {
  const router = useRouter();
  return (
    <>
      <Tournament />
    </>
  );
};

export default CommunityBattle;
