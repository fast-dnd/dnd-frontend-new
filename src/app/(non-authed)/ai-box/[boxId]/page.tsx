"use client";

import React from "react";

import AiBoxWrapper from "../components/ai-box";

const AiBoxCustom = ({ params }: { params: { boxId: string } }) => {
  const boxId = params.boxId;
  return (
    <>
      <AiBoxWrapper state="open" boxId={boxId} />
    </>
  );
};

export default AiBoxCustom;
