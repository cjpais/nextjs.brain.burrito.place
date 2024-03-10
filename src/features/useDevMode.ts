import { create } from "zustand";

interface DevModeState {
  devMode: boolean;
  setDevMode: (devMode: boolean) => void;
}

export const useDevMode = create<DevModeState>((set) => ({
  devMode: false,
  setDevMode: (devMode) => set({ devMode }),
}));
