import { useEffect, useState } from "react";

const useCopy = () => {
  const [copied, setCopied] = useState(false);

  const onCopy = (text: string) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return;
    }

    setCopied(true);
    navigator.clipboard.writeText(text);
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return { copied, onCopy } as const;
};

export default useCopy;
