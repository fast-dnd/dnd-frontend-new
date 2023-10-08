import { useEffect, useRef } from "react";

import { IRoomDetail } from "@/types/room";

interface IUserAutoScrollToBottomProps {
  roomData?: IRoomDetail;
  stories: string[];
  lastStory?: string;
}

const useAutoScrollToBottom = ({ roomData, stories, lastStory }: IUserAutoScrollToBottomProps) => {
  const autoBottomScrollDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoBottomScrollDiv.current) {
      autoBottomScrollDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [stories, roomData, lastStory]);

  return { autoBottomScrollDiv };
};

export default useAutoScrollToBottom;
