import { useEffect, useState } from "react";
import { MusicNote } from "@phosphor-icons/react";
import { DialogClose } from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";

import { Slider } from "@/components/ui/slider";

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import ToggleSwitch from "../toggle-switch";

let audio: HTMLAudioElement | null = null;

const soundtracks = [
  "/sounds/background-music-1.mp3",
  "/sounds/background-music-2.mp3",
  "/sounds/background-music-3.mp3",
];

const MusicSettingsModal = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(40);
  const [soundVolume, setSoundVolume] = useState(20);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(() =>
    Math.floor(Math.random() * soundtracks.length),
  ); // Start with a random track
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    let newAudio: HTMLAudioElement | null = new Audio(soundtracks[currentTrackIndex]);
    newAudio.loop = false;
    newAudio.volume = musicVolume / 100; // Set initial volume

    if (isMusicPlaying) {
      newAudio.play();
    }

    const handleTrackEnd = () => {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % soundtracks.length);
    };

    newAudio.addEventListener("ended", handleTrackEnd);

    // Store the audio object in state
    setAudio(newAudio);

    return () => {
      if (newAudio) {
        newAudio.pause();
        newAudio.removeEventListener("ended", handleTrackEnd);
        newAudio = null;
      }
    };
  }, [isMusicPlaying, currentTrackIndex]);

  // Dynamically update the volume without resetting the track or audio state
  useEffect(() => {
    if (audio) {
      audio.volume = musicVolume / 100;
    }
  }, [musicVolume, audio]);

  return (
    <Dialog>
      <DialogTrigger asChild className="max-lg:hidden">
        <button className="flex items-center gap-2 hover:opacity-70">
          {isMusicPlaying ? (
            <MusicNote className="size-7" color="green" />
          ) : (
            <MusicNote className="size-7" color="white" />
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="flex h-auto max-h-full w-full max-w-md flex-col gap-12 bg-black p-4 max-lg:rounded-none max-lg:bg-dark-900 lg:h-auto lg:max-w-lg lg:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end lg:hidden">
            <DialogClose>
              <AiOutlineClose />
            </DialogClose>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="mt-1 text-lg uppercase tracking-widest lg:text-xl lg:tracking-[6.4px]">
              Sound settings
            </p>
            <ToggleSwitch
              on={isMusicPlaying}
              setOn={(checked) => setIsMusicPlaying(checked)}
              items={[
                { text: "Off", icon: <MusicNote size={14} /> },
                { text: "On", icon: <MusicNote size={14} /> },
              ]}
            />
            <div className="flex w-full flex-col gap-4 p-10">
              <Slider
                min={0}
                max={100}
                label="Music volume"
                value={[musicVolume]}
                onValueChange={(newValue: any) => setMusicVolume(newValue[0])}
                aria-label="Music volume"
              />
              <Slider
                min={0}
                max={100}
                label="Sound volume"
                value={[soundVolume]}
                onValueChange={(newValue: any) => setSoundVolume(newValue[0])}
                aria-label="Sound volume"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MusicSettingsModal;
