import { useEffect, useRef, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

import { cn } from "@/utils/style-utils";
import { Button } from "@/components/ui/button";

const StyledAudio = (props: { audio?: string }) => {
  const { audio } = props;
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const progRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (progRef.current && audioRef.current) {
      const percent = Math.floor((100 * progress) / audioRef.current.duration);
      const width = percent < 60 ? percent + 1 : Math.min(percent - 1, 98);
      progRef.current.style.width = `${width}%`;
    }
  }, [progress]);

  return (
    <div>
      {!!audio && (
        <audio
          src={audio}
          ref={audioRef}
          className="hidden"
          onTimeUpdate={(e) => {
            setProgress(e.currentTarget.currentTime);
          }}
          onEnded={() => setPlaying(false)}
        />
      )}

      <div className="flex items-center gap-2">
        <Button
          disabled={!audio}
          variant="ghost"
          className="w-fit text-white"
          onClick={() => {
            if (audio) {
              if (playing) audioRef.current?.pause();
              else audioRef.current?.play();
              setPlaying(!playing);
            }
          }}
        >
          {playing && <BsPauseFill />}
          {!playing && <BsPlayFill />}
        </Button>
        <div className="relative flex w-3/4 items-center lg:w-48">
          {!!audioRef.current && !!audioRef.current.duration && (
            <input
              type="range"
              min="0"
              max={audioRef.current.duration}
              value={progress}
              onChange={(e) => {
                if (audioRef.current) audioRef.current.currentTime = +e.target.value;
                setProgress(+e.target.value);
              }}
              className={cn(
                "h-1 w-full appearance-none rounded-full bg-white/25",
                "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none",
                "[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
              )}
            />
          )}

          <div
            className={cn("pointer-events-none absolute h-1 rounded-full bg-white")}
            ref={progRef}
          />
        </div>
      </div>
    </div>
  );
};

export default StyledAudio;
