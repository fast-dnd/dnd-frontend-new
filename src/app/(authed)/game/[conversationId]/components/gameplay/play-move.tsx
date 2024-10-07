/* eslint-disable react/no-unescaped-entities */
import { IPlayer, IRoomDetail } from "@/types/room";
import { cn } from "@/utils/style-utils";

import usePlayMoveSocket from "../../hooks/use-play-move-socket";
import useTimer from "../../hooks/use-timer";
import { moveStore } from "../../stores/move-store";
import MoveInput from "./move-input";
import PickPowerup from "./pick-powerup";
import RollDice from "./roll-dice";

export interface IPlayMoveProps {
  roomData: IRoomDetail;
  conversationId: string;
  currentPlayer: IPlayer;
}

const PlayMove = ({ roomData, conversationId, currentPlayer }: IPlayMoveProps) => {
  usePlayMoveSocket(conversationId);
  const { timeToDisplay } = useTimer(roomData);
  const store = moveStore.use();

  return (
    <>
      <div
        className={cn(
          "flex w-full gap-8",
          (roomData.state === "WIN" || roomData.state === "LOSE" || currentPlayer.health <= 0) &&
            "hidden",
        )}
      >
        <div
          className={cn(
            "flex h-full min-w-[500px] flex-1 flex-col gap-6",
            store.buttonState !== "DEFAULT" && "hidden lg:flex",
          )}
        >
          <div
            className={cn(
              "flex flex-row gap-x-4 rounded-md bg-white/5 px-4 py-2.5 tracking-[0.07em] lg:px-8",
              !store.canPlay && "text-white/50",
            )}
          >
            <span className="text-xl uppercase opacity-50"> {timeToDisplay()} Left</span>
            <span className="font-semibold">{getModeTranslation(currentPlayer.gameMode)}</span>
          </div>
          <MoveInput
            champion={currentPlayer.champion}
            gameMode={currentPlayer.gameMode}
            wordsChallenge={roomData.wordsChallenge}
          />
        </div>
        <div className="flex flex-col gap-6">
          <PickPowerup currentMana={currentPlayer.mana} />
          <RollDice
            currentPlayer={currentPlayer}
            roomData={roomData}
            conversationId={conversationId}
          />
        </div>
      </div>

      {currentPlayer.health <= 0 && roomData.state === "GAMING" && (
        <div className="flex h-44 w-full flex-col items-center justify-center bg-white/5 lg:text-xl">
          <p className="text-center font-semibold">Players are choosing their actions...</p>
          <p>{timeToDisplay()} Left</p>
        </div>
      )}
    </>
  );
};

function getModeTranslation(gameMode: string | null | undefined) {
  gameMode = gameMode ? gameMode : "normal";
  return (
    <div>
      {gameMode === "normal" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
          <span role="img" aria-label="Normal mode" className="text-2xl">
            ✍️
          </span>
          <p className="text-xl">Write your move normally without any restrictions.</p>
        </div>
      )}
      {gameMode === "only_emoji" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
          <span role="img" aria-label="Emoji mode" className="text-2xl">
            😃
          </span>
          <p className="text-xl">Use only emojis to express your move.</p>
        </div>
      )}
      {gameMode === "overly_descriptive" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
          <span role="img" aria-label="Overly descriptive mode" className="text-2xl">
            🎨
          </span>
          <p className="text-xl">
            Add excessive detail to your move, describing the color, texture, and smell. Brevity
            will be penalized!
          </p>
        </div>
      )}
      {gameMode === "vagueness" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
          <span role="img" aria-label="Vagueness mode" className="text-2xl">
            🌀
          </span>
          <p className="text-xl">
            Keep your move vague and open to interpretation. The more ambiguous, the better your
            rating!
          </p>
        </div>
      )}
      {gameMode === "three_languages" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
          <span role="img" aria-label="Multilingual mode" className="text-2xl">
            🌍
          </span>
          <p className="text-xl">
            Declare your move in at least 3 different languages to earn a higher rating.
          </p>
        </div>
      )}
      {gameMode === "random_words" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
          <span role="img" aria-label="Random words mode" className="text-2xl">
            🎲
          </span>
          <p className="text-xl">Incorporate random words into your move.</p>
        </div>
      )}
      {gameMode === "smart" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
          <span role="img" aria-label="Smart move" className="text-2xl">
            🧠
          </span>
          <p className="text-xl">Outsmart your opponent with a clever, strategic move.</p>
        </div>
      )}
      {gameMode === "aggressive" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
          <span role="img" aria-label="Aggressive move" className="text-2xl">
            💥
          </span>
          <p className="text-xl">Take a bold, forceful action with no hesitation.</p>
        </div>
      )}
      {gameMode === "rap_battle" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
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
          <p>[handicap]</p>
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
          <p>[handicap]</p>
          <span role="img" aria-label="Emotional move" className="text-2xl">
            😢
          </span>
          <p className="text-xl">Pour your feelings into the move — sad, happy, or overwhelmed.</p>
        </div>
      )}
      {gameMode === "sarcastic" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
          <span role="img" aria-label="Sarcastic move" className="text-2xl">
            🙄
          </span>
          <p className="text-xl">Express your move with maximum sarcasm and wit.</p>
        </div>
      )}
      {gameMode === "mysterious" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
          <span role="img" aria-label="Mysterious move" className="text-2xl">
            🕵️‍♂️
          </span>
          <p className="text-xl">Be vague, cryptic, and leave your opponent guessing.</p>
        </div>
      )}
      {gameMode === "heroic" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
          <span role="img" aria-label="Heroic move" className="text-2xl">
            🦸
          </span>
          <p className="text-xl">Make a courageous, heroic move as if you're saving the day.</p>
        </div>
      )}
      {gameMode === "lazy" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
          <span role="img" aria-label="Lazy move" className="text-2xl">
            😴
          </span>
          <p className="text-xl">Barely move, or move as little as possible with minimal effort.</p>
        </div>
      )}
      {gameMode === "flashy" && (
        <div className="flex items-center space-x-2">
          <p>[handicap]</p>
          <span role="img" aria-label="Flashy move" className="text-2xl">
            ✨
          </span>
          <p className="text-xl">
            Execute a move with flair and style. Impress everyone, even if it doesn't work.
          </p>
        </div>
      )}
    </div>
  );
}
export default PlayMove;
