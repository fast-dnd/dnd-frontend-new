"use client";

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
  hydrateFromLocalStorage: () => void;
  setMusicEnabled: (enabled: boolean) => void;
  setMusicVolume: (volume: number) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setSoundVolume: (volume: number) => void;
}

export const useSoundSystem = create<SoundState>((set) => ({
  musicEnabled: false,
  musicVolume: 40,
  soundEnabled: false,
  soundVolume: 20,

  // On the client, call this to sync with localStorage
  hydrateFromLocalStorage: () => {
    if (typeof window === "undefined") return;
    set({
      musicEnabled: localStorage.getItem(STORAGE_KEYS.MUSIC_ENABLED) === "true",
      musicVolume: Number(localStorage.getItem(STORAGE_KEYS.MUSIC_VOLUME)) || 40,
      soundEnabled: localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED) === "true",
      soundVolume: Number(localStorage.getItem(STORAGE_KEYS.SOUND_VOLUME)) || 30,
    });
  },

  setMusicEnabled: (enabled) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.MUSIC_ENABLED, String(enabled));
    }
    set({ musicEnabled: enabled });
  },
  setMusicVolume: (volume) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.MUSIC_VOLUME, String(volume));
    }
    set({ musicVolume: volume });
  },
  setSoundEnabled: (enabled) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(enabled));
    }
    set({ soundEnabled: enabled });
  },
  setSoundVolume: (volume) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SOUND_VOLUME, String(volume));
    }
    set({ soundVolume: volume });
  },
}));
