import { useCallback, useRef } from "react";

const useIntersectionObserver = ({
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: {
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
}) => {
  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastObjectRef = useCallback(
    (object: any) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((objects) => {
        if (objects[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (object) intObserver.current.observe(object);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage],
  );

  return { lastObjectRef };
};

export default useIntersectionObserver;
