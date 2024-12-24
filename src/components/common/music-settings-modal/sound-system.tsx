import { create } from "zustand";

export const STORAGE_KEYS = {
  MUSIC_ENABLED: "music-enabled",
  MUSIC_VOLUME: "music-volume",
  SOUND_ENABLED: "sound-enabled",
  SOUND_VOLUME: "sound-volume",
} as const;

interface SoundState {
  musicEnabled: boolean;
  musicVolume: number;
  soundEnabled: boolean;
  soundVolume: number;
  setMusicEnabled: (enabled: boolean) => void;
  setMusicVolume: (volume: number) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setSoundVolume: (volume: number) => void;
}

export const useSoundSystem = create<SoundState>((set) => ({
  musicEnabled: localStorage.getItem(STORAGE_KEYS.MUSIC_ENABLED) === "true",
  musicVolume: Number(localStorage.getItem(STORAGE_KEYS.MUSIC_VOLUME)) || 40,
  soundEnabled: localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED) === "true",
  soundVolume: Number(localStorage.getItem(STORAGE_KEYS.SOUND_VOLUME)) || 20,

  setMusicEnabled: (enabled: boolean) => {
    localStorage.setItem(STORAGE_KEYS.MUSIC_ENABLED, String(enabled));
    set({ musicEnabled: enabled });
  },
  setMusicVolume: (volume: number) => {
    localStorage.setItem(STORAGE_KEYS.MUSIC_VOLUME, String(volume));
    set({ musicVolume: volume });
  },
  setSoundEnabled: (enabled: boolean) => {
    localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(enabled));
    set({ soundEnabled: enabled });
  },
  setSoundVolume: (volume: number) => {
    localStorage.setItem(STORAGE_KEYS.SOUND_VOLUME, String(volume));
    set({ soundVolume: volume });
  },
}));
