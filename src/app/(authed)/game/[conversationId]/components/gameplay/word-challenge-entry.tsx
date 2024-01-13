import { Fragment, useRef, useState } from "react";
import { PenNib } from "@phosphor-icons/react";
import { useEffectOnce } from "usehooks-ts";

import { Input } from "@/components/ui/input";
import { cn } from "@/utils/style-utils";

import { moveStore } from "../../stores/move-store";

const WordChallengeEntry = ({ index, word }: { index: number; word: string }) => {
  const wordsChallengeValue = moveStore.wordsChallenge[index * 2].use();

  const contentEditableRef = useRef<HTMLSpanElement>(null);

  const [displayEdit, setDisplayEdit] = useState(false);

  useEffectOnce(() => {
    if (contentEditableRef && contentEditableRef.current && wordsChallengeValue) {
      const element = contentEditableRef.current;

      element.textContent = wordsChallengeValue;
    }
  });

  //   TODO: loading state design
  if (wordsChallengeValue === undefined) return null;

  return (
    <>
      {displayEdit || wordsChallengeValue?.length > 0 ? (
        <>
          <PenNib
            weight="bold"
            className="inline"
            color={wordsChallengeValue.length === 0 ? "#FFFFFF50" : "#FE9090"}
          />
          &nbsp;
          <span
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            ref={contentEditableRef}
            placeholder="Add text..."
            className={cn(
              "editable text-primary-wordChallenge caret-primary-wordChallenge outline-none",
              wordsChallengeValue.length === 0 && "italic text-white/50",
            )}
            onBlur={() => {
              if (wordsChallengeValue.length === 0) {
                setDisplayEdit(false);
              }
            }}
            onInput={(e) => {
              moveStore.wordsChallenge[index * 2].set(e.currentTarget.textContent);
            }}
          />
        </>
      ) : (
        <Input
          onFocus={() => {
            setDisplayEdit(true);
            setTimeout(() => contentEditableRef.current?.focus(), 200);
          }}
          StartIcon={() => <PenNib weight="bold" color="#ffffff50" />}
          placeholder="Add text..."
          className="mt-1 h-8 w-52 placeholder:italic lg:w-72"
          inputWrapperClassName="w-52 inline-block"
        />
      )}

      <span className="text-center font-bold"> {word} </span>
    </>
  );
};

export default WordChallengeEntry;
