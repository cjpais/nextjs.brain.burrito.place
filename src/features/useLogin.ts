import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface LoginState {
  password: string | null;
  setPassword: (password: string | null) => void;
}

export const useLogin = create<LoginState>()(
  devtools(
    persist(
      (set) => ({
        password: null,
        setPassword: (password) => set({ password }),
      }),
      { name: "cj.burrito.place.loginStore" }
    )
  )
);
