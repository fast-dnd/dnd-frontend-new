"use client";

import { useEffect, useState } from "react";
import { MusicNote } from "@phosphor-icons/react";
import { DialogClose } from "@radix-ui/react-dialog";
import { AiOutlineClose } from "react-icons/ai";

import { Slider } from "@/components/ui/slider";

import { Dialog, DialogContent, DialogTrigger } from "../../ui/dialog";
import ToggleSwitch from "../toggle-switch";
import { useSoundSystem } from "./sound-system";

const soundtracks = [
  "/sounds/background-music-1.mp3",
  "/sounds/background-music-2.mp3",
  "/sounds/background-music-3.mp3",
];

const MusicSettingsModal = () => {
  const {
    musicEnabled,
    musicVolume,
    soundEnabled,
    soundVolume,
    setMusicEnabled,
    setMusicVolume,
    setSoundEnabled,
    setSoundVolume,
  } = useSoundSystem();

  useEffect(() => {
    useSoundSystem.getState().hydrateFromLocalStorage();
  }, []);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(() =>
    Math.floor(Math.random() * soundtracks.length),
  );
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    let newAudio: HTMLAudioElement | null = new Audio(soundtracks[currentTrackIndex]);
    newAudio.loop = false;
    newAudio.volume = musicVolume / 100;

    if (musicEnabled) {
      newAudio.play();
    }

    const handleTrackEnd = () => {
      setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % soundtracks.length);
    };

    newAudio.addEventListener("ended", handleTrackEnd);
    setAudio(newAudio);

    return () => {
      if (newAudio) {
        newAudio.pause();
        newAudio.removeEventListener("ended", handleTrackEnd);
        newAudio = null;
      }
    };
  }, [musicEnabled, currentTrackIndex, musicVolume, soundVolume, soundEnabled]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-white/20">
          <MusicNote
            className={`${musicEnabled ? "text-green-500" : "text-white"} h-4 w-4 lg:h-8 lg:w-8`}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="z-[100] flex flex-col gap-12 bg-black p-4 max-lg:size-full max-lg:max-h-[80vh] max-lg:max-w-full max-lg:overflow-y-auto max-lg:rounded-none max-lg:bg-dark-900 lg:p-8">
        <div className="flex flex-col gap-4">
          <div className="flex justify-end">
            <DialogClose className="rounded-lg p-2 hover:bg-white/10">
              <AiOutlineClose />
            </DialogClose>
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <p className="mt-1 text-lg uppercase tracking-widest lg:text-xl lg:tracking-[6.4px]">
              Sound settings
            </p>
            <div className="flex w-full flex-col gap-6">
              <div className="flex flex-col gap-2">
                <ToggleSwitch
                  on={musicEnabled}
                  setOn={setMusicEnabled}
                  items={[
                    { text: "Music Off", icon: <MusicNote size={14} /> },
                    { text: "Music On", icon: <MusicNote size={14} /> },
                  ]}
                />
                <Slider
                  min={0}
                  max={100}
                  label="Music volume"
                  value={[musicVolume]}
                  onValueChange={(newValue) => setMusicVolume(newValue[0])}
                  disabled={!musicEnabled}
                />
              </div>
              <div className="flex flex-col gap-2">
                <ToggleSwitch
                  on={soundEnabled}
                  setOn={setSoundEnabled}
                  items={[
                    { text: "Sound Off", icon: <MusicNote size={14} /> },
                    { text: "Sound On", icon: <MusicNote size={14} /> },
                  ]}
                />
                <Slider
                  min={0}
                  max={100}
                  label="Sound volume"
                  value={[soundVolume]}
                  onValueChange={(newValue) => setSoundVolume(newValue[0])}
                  disabled={!soundEnabled}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MusicSettingsModal;
