"use client";

import { useRouter } from "next/navigation";

import AiBoxWrapper from "./components/ai-box";

const AiBoxPage = () => {
  const router = useRouter();
  return (
    <>
      <AiBoxWrapper />
    </>
  );
};

export default AiBoxPage;
