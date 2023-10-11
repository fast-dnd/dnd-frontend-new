import { useEffect, useRef, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const StyledAudio = ({ audio }: { audio?: string }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audio && !!audioRef.current) audioRef.current.currentTime = 0.01;
  }, [audio]);

  return (
    <>
      {!!audio && (
        <audio
          src={audio}
          ref={audioRef}
          controls
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
        <div className="w-3/4 lg:w-60">
          {!!audio && !!audioRef.current?.duration && (
            <Slider
              min={0}
              max={audioRef.current.duration}
              value={[progress]}
              onValueChange={(values) => {
                if (audioRef.current) audioRef.current.currentTime = values[0];
                setProgress(values[0]);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default StyledAudio;
