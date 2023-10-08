import { useEffect, useState } from "react";

import { IRoomDetail } from "@/types/room";

interface IUseUpdateStoriesProps {
  roomData: IRoomDetail;
  lastStory?: string;
}

const useUpdateStories = ({ roomData, lastStory }: IUseUpdateStoriesProps) => {
  const [stories, setStories] = useState<string[]>([]);

  useEffect(() => {
    if (roomData) {
      if (lastStory) {
        setStories([...roomData.chatGptResponses, lastStory]);
      } else if (roomData.chatGptResponses.length >= roomData.currentRound + 1) {
        setStories(roomData.chatGptResponses);
      }
    }
  }, [roomData, lastStory]);

  return { stories };
};

export default useUpdateStories;
