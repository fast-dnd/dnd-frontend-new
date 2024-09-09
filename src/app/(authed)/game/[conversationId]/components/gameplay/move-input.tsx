/* eslint-disable react/no-unescaped-entities */
import { useEffect } from "react";
import { Smiley } from "@phosphor-icons/react";
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
                <TextArea
                  maxLength={300}
                  className="m-0 h-full border-white/50 focus-within:border-white"
                  placeholder="I found a secret tunnel and escape through it..."
                  disabled={!canPlay}
                  onChange={(e) => {
                    moveStore.freeWill.set(e.target.value);
                  }}
                  value={freeWill}
                />

                <Popover>
                  <PopoverTrigger className="absolute bottom-2 right-2" asChild>
                    <div className="rounded-lg transition-all duration-300 hover:bg-white/10">
                      <Smiley size={32} />
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
      <div>
        {gameMode === "normal" && (
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Normal mode" className="text-2xl">
              ✍️
            </span>
            <p className="text-xl">Write your move normally without any restrictions.</p>
          </div>
        )}
        {gameMode === "only_emoji" && (
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Emoji mode" className="text-2xl">
              😃
            </span>
            <p className="text-xl">Use only emojis to express your move.</p>
          </div>
        )}
        {gameMode === "random_words" && (
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Random words mode" className="text-2xl">
              🎲
            </span>
            <p className="text-xl">Incorporate random words into your move.</p>
          </div>
        )}
        {gameMode === "smart" && (
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Smart move" className="text-2xl">
              🧠
            </span>
            <p className="text-xl">Outsmart your opponent with a clever, strategic move.</p>
          </div>
        )}
        {gameMode === "aggressive" && (
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Aggressive move" className="text-2xl">
              💥
            </span>
            <p className="text-xl">Take a bold, forceful action with no hesitation.</p>
          </div>
        )}
        {gameMode === "rap_battle" && (
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Rap battle move" className="text-2xl">
              🎤
            </span>
            <p className="text-xl">
              Deliver your move in the form of rhymes and rhythm. Get ready to rap your way out!
            </p>
          </div>
        )}
        {gameMode === "stupid" && (
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Stupid move" className="text-2xl">
              🧟
            </span>
            <p className="text-xl">
              Make a move that’s completely random and nonsensical. No brainpower required.
            </p>
          </div>
        )}
        {gameMode === "emotional" && (
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Emotional move" className="text-2xl">
              😢
            </span>
            <p className="text-xl">
              Pour your feelings into the move — sad, happy, or overwhelmed.
            </p>
          </div>
        )}
        {gameMode === "sarcastic" && (
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Sarcastic move" className="text-2xl">
              🙄
            </span>
            <p className="text-xl">Express your move with maximum sarcasm and wit.</p>
          </div>
        )}
        {gameMode === "mysterious" && (
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Mysterious move" className="text-2xl">
              🕵️‍♂️
            </span>
            <p className="text-xl">Be vague, cryptic, and leave your opponent guessing.</p>
          </div>
        )}
        {gameMode === "heroic" && (
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Heroic move" className="text-2xl">
              🦸
            </span>
            <p className="text-xl">Make a courageous, heroic move as if you're saving the day.</p>
          </div>
        )}
        {gameMode === "lazy" && (
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Lazy move" className="text-2xl">
              😴
            </span>
            <p className="text-xl">
              Barely move, or move as little as possible with minimal effort.
            </p>
          </div>
        )}
        {gameMode === "flashy" && (
          <div className="flex items-center space-x-2">
            <span role="img" aria-label="Flashy move" className="text-2xl">
              ✨
            </span>
            <p className="text-xl">
              Execute a move with flair and style. Impress everyone, even if it doesn't work.
            </p>
          </div>
        )}
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
