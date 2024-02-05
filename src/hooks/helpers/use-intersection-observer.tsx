import { useCallback, useRef } from "react";

interface IUseIntersectionObserverProps {
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
}

const useIntersectionObserver = ({
  isFetchingNextPage,
  fetchNextPage,
  hasNextPage,
}: IUseIntersectionObserverProps) => {
  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastObjectRef = useCallback(
    (object: Element | null) => {
      if (isFetchingNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
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
