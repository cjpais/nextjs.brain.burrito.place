import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type ChatMessage = { name: string; message: string };

interface ChatState {
  messages: ChatMessage[];
  addMessage: (message: ChatMessage) => void;
  clearMessages: () => void;
}

export const useChat = create<ChatState>()((set) => ({
  messages: [],
  addMessage: (message) =>
    set((state) => ({ messages: [...(state.messages || []), message] })),
  clearMessages: () => set({ messages: [] }),
}));
