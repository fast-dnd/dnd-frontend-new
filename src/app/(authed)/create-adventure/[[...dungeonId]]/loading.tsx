"use client";

import React from "react";
import { useParams } from "next/navigation";

import AdventureSkeletonLoading from "./components/adventure-skeleton-loading";

const Loading = () => {
  const params = useParams();
  const dungeonId = params.dungeonId?.[0];

  return <AdventureSkeletonLoading isEditing={!!dungeonId} />;
};

export default Loading;
