import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// export type  = { name: string; message: string };
export type Transformation = { hash: string; completion: string };

interface TransformationState {
  prompt: string;
  systemPrompt: string;
  model: string;
  mode: "each" | "all";
  transformations: Transformation[];
  setPrompt: (p: string) => void;
  setMode: (m: "each" | "all") => void;
  setSystemPrompt: (p: string) => void;
  setModel: (m: string) => void;
  getTransformation: (hash: string) => Transformation | undefined;
  setTransformations: (t: Transformation[]) => void;
  clearTransformations: () => void;
}

export const useTransformations = create<TransformationState>()((set, get) => {
  console.log(get());
  return {
    prompt: "",
    model: "mistral7b",
    systemPrompt:
      "you are a helpful assistant. a person is going to ask you a question about some data. respond to their question using the data. respond only in JSON.",
    transformations: [],
    mode: "each",
    setPrompt: (p) => set({ prompt: p }),
    setMode: (m) => set({ mode: m }),
    setSystemPrompt: (p) => set({ systemPrompt: p }),
    setModel: (m) => set({ model: m }),
    getTransformation: (hash) =>
      get().transformations.find((t) => t.hash === hash),
    setTransformations: (t) => set({ transformations: t }),
    clearTransformations: () => set({ transformations: [] }),
  };
});

// is this something someone explicitly ate for lunch? make sure to check the time and see if it is around lunchtime.

// respond in json:
// { "answer": boolean }

// export const useChat = create<ChatState>()((set) => ({
//   messages: [],
//   addMessage: (message) =>
//     set((state) => ({ messages: [...(state.messages || []), message] })),
//   clearMessages: () => set({ messages: [] }),
// }));
