import { Fragment, useEffect, useRef, useState } from "react";
import { PenNib } from "@phosphor-icons/react";

import { Input } from "@/components/ui/input";
import { cn } from "@/utils/style-utils";

import { moveStore } from "../../stores/move-store";

const WordChallengeEntry = ({ index, word }: { index: number; word: string }) => {
  const wordsChallengeValue = moveStore.wordsChallenge[index * 2].use();

  const contentEditableRef = useRef<HTMLParagraphElement>(null);

  const [displayEdit, setDisplayEdit] = useState(false);

  useEffect(() => {
    if (contentEditableRef && contentEditableRef.current && wordsChallengeValue) {
      const element = contentEditableRef.current;

      setCursorToTheEnd(element);
      element.focus();
    }
  }, [wordsChallengeValue]);

  const setCursorToTheEnd = (element: HTMLParagraphElement) => {
    const position = element.textContent?.length;
    const childNode = element.childNodes[0];
    const range = document.createRange();
    const selection = window.getSelection();

    if (!selection || !position) return;

    range.setStart(childNode, position);
    range.setEnd(childNode, position);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  //   TODO: loading state design
  if (wordsChallengeValue === undefined) return null;

  return (
    <Fragment>
      {displayEdit || wordsChallengeValue?.length > 0 ? (
        <div className="flex items-center gap-2">
          <PenNib
            weight="bold"
            color={wordsChallengeValue.length === 0 ? "#FFFFFF50" : "#FE9090"}
          />
          <p
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            ref={contentEditableRef}
            className={cn(
              "text-primary-wordChallenge caret-primary-wordChallenge outline-none",
              wordsChallengeValue.length === 0 && "italic text-white/50",
            )}
            onBlur={() => {
              if (wordsChallengeValue.length === 0) {
                setDisplayEdit(false);
              }
            }}
            onInput={(e) => {
              if (e.currentTarget.textContent?.includes("Add a text...")) {
                e.currentTarget.textContent = e.currentTarget.textContent.replace(
                  "Add a text...",
                  "",
                );
              }

              moveStore.wordsChallenge[index * 2].set(e.currentTarget.textContent);
            }}
          >
            {wordsChallengeValue.length === 0 ? "Add a text..." : wordsChallengeValue}
          </p>
        </div>
      ) : (
        <Input
          onFocus={() => {
            setDisplayEdit(true);
            setTimeout(() => contentEditableRef.current?.focus(), 200);
          }}
          StartIcon={() => <PenNib weight="bold" color="#ffffff50" />}
          placeholder="Add a text..."
          className="mt-1 h-8 w-72 placeholder:italic"
          inputWrapperClassName="w-72"
        />
      )}

      <p className="text-center font-bold">{word}</p>
    </Fragment>
  );
};

export default WordChallengeEntry;
