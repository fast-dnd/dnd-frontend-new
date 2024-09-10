/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useReadLocalStorage } from "usehooks-ts";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TextArea } from "@/components/ui/text-area";
import { IChampion } from "@/types/dungeon";
import { IGameMode, IWordsChallenge } from "@/types/room";

import { moveStore } from "../../stores/move-store";
import WordChallengeEntry from "./word-challenge-entry";

interface IMoveInputProps {
  champion: IChampion | null | undefined;
  gameMode: IGameMode | null | undefined;
  wordsChallenge: IWordsChallenge | undefined | null;
}

const MoveInput = ({ champion, gameMode, wordsChallenge }: IMoveInputProps) => {
  const canPlay = moveStore.canPlay.use();
  const freeWill = moveStore.freeWill.use();

  const maxCharacters = 250;

  gameMode = gameMode ? gameMode : "normal";
  const accountId = useReadLocalStorage<string>("accountId");

  const wordChallengeForPlayer = wordsChallenge?.find(
    (wordChallenge) => wordChallenge.accountId === accountId,
  );

  const isWordsChallenge = gameMode == "random_words";
  console.log("Is words challenge", isWordsChallenge);
  useEffect(() => {
    if (wordChallengeForPlayer) {
      moveStore.wordsChallenge.set([
        "",
        ...wordChallengeForPlayer.words.flatMap((word) => [word, ""]),
      ]);
    }
  }, [wordChallengeForPlayer]);

  if (!champion) return <div>Something went wrong</div>;

  return (
    <div className="flex h-60 flex-col gap-4 lg:h-full">
      <div className="relative flex flex-1">
        {
          <>
            {isWordsChallenge ? (
              wordChallengeForPlayer && (
                <div className="flex h-28 w-full rounded-md bg-black/60 pr-2">
                  <div className="flex size-full flex-col overflow-y-auto p-4">
                    <div className="inline">
                      {wordChallengeForPlayer.words.map((word, index) => (
                        <WordChallengeEntry
                          key={JSON.stringify({ ...wordsChallenge, index })}
                          index={index}
                          word={word}
                        />
                      ))}
                      <WordChallengeEntry
                        key={JSON.stringify({
                          ...wordsChallenge,
                          index: wordChallengeForPlayer.words.length,
                        })}
                        index={wordChallengeForPlayer.words.length}
                        word="."
                      />
                    </div>
                  </div>
                </div>
              )
            ) : (
              <>
                <span className="absolute right-2 top-2 text-xs text-white/50">
                  {freeWill.length}/{maxCharacters}
                </span>
                <TextArea
                  maxLength={maxCharacters}
                  className="m-0 h-full border-white/50 focus-within:border-white"
                  placeholder="I found a secret tunnel and escape through it..."
                  disabled={!canPlay}
                  onChange={(e) => {
                    const inputText = e.target.value;

                    // Trim the input to the max number of characters
                    const trimmedText = inputText.slice(0, maxCharacters);

                    moveStore.freeWill.set(trimmedText);
                  }}
                  value={freeWill}
                />

                <Popover>
                  <PopoverTrigger className="absolute bottom-2 right-2" asChild>
                    <div className="rounded-xl transition-all duration-300 hover:scale-125 hover:bg-white/10">
                      <span role="img" aria-label="Emoji mode" className="text-2xl">
                        😃
                      </span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="border-transparent bg-transparent shadow-none">
                    <EmojiPicker
                      theme={Theme.DARK}
                      onEmojiClick={(emoji) => {
                        moveStore.freeWill.set(freeWill + emoji.emoji);
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </>
            )}
          </>
        }
      </div>
    </div>
  );
};

// const MoveDisplay = ({ move }: { move: IDefaultMove }) => {
//   return (
//     <div className="flex basis-1/2 flex-col items-center justify-center gap-2">
//       <div
//         className={cn(
//           "flex items-center gap-2 text-xl font-medium",
//           move === "discover_health" && "text-primary",
//           move === "discover_mana" && "text-cyan-500",
//           move === "conversation_with_team" && "text-green-500",
//           move === "rest" && "text-purple-400",
//         )}
//       >
//         {move === "discover_health" && (
//           <>
//             <AiFillHeart /> Heal action
//           </>
//         )}
//         {move === "discover_mana" && (
//           <>
//             <HiSparkles /> Mana action
//           </>
//         )}
//         {move === "conversation_with_team" && (
//           <>
//             <GoPeople /> Round bonus action
//           </>
//         )}
//         {move === "rest" && (
//           <>
//             <GiNightSleep /> Rest action
//           </>
//         )}
//       </div>
//       <p className="text-center opacity-50">
//         {move === "discover_health" && "Your health could increase or decrease"}
//         {move === "discover_mana" && "Your mana could increase or decrease"}
//         {move === "conversation_with_team" &&
//           "Your health could decrease or your mana could increase"}
//         {move === "rest" && "Your stats won't be affected"}
//       </p>
//     </div>
//   );
// };
export default MoveInput;
