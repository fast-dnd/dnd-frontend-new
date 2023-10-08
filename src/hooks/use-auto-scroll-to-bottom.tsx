import { DependencyList, useEffect, useRef } from "react";

const useAutoScrollToBottom = (deps?: DependencyList) => {
  const autoBottomScrollDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoBottomScrollDiv.current) {
      autoBottomScrollDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [deps]);

  return { autoBottomScrollDiv };
};

export default useAutoScrollToBottom;
