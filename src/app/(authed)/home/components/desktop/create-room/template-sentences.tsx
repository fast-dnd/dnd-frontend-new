import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

interface ITemplateSentencesProps {
  templateSentences: string;
  setTemplateSentences: (templateSentences: string) => void;
}

const TemplateSentences = ({
  templateSentences,
  setTemplateSentences,
}: ITemplateSentencesProps) => {
  const [showTemplateSentences, setShowTemplateSentences] = useState(false);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setShowTemplateSentences((prev) => !prev);
      }
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  });

  return (
    showTemplateSentences && (
      <Input
        placeholder="Template sentences"
        value={templateSentences}
        onChange={(e) => setTemplateSentences(e.target.value)}
        className="mr-4 w-96"
      />
    )
  );
};

export default TemplateSentences;
