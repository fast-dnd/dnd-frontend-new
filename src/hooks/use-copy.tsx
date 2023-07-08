import { useEffect, useState } from "react";

const useCopy = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return [copied, setCopied] as const;
};

export default useCopy;
