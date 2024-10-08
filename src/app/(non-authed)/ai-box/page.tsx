"use client";

import { useRouter } from "next/navigation";

import AiBox from "./components/ai-box";

const AiBoxPage = () => {
  const router = useRouter();
  return (
    <>
      <AiBox />
    </>
  );
};

export default AiBoxPage;
