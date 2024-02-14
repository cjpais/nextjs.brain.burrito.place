"use client";

import { transformEntree } from "@/features/serverActions";
import { useLogin } from "@/features/useLogin";
import { useTransformations } from "@/features/useTransformations";
import { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

const modelOptions = [
  { value: "gpt3.5", label: "gpt-3.5" },
  { value: "gpt4", label: "gpt-4" },
  { value: "mixtral", label: "mixtral" },
  { value: "mistral7b", label: "mistral-7b" },
];

const Transform = ({ hashes }: { hashes: string[] }) => {
  const { password } = useLogin();
  const {
    setTransformations,
    transformations,
    prompt,
    model,
    systemPrompt,
    setSystemPrompt,
    setModel,
    setPrompt,
  } = useTransformations();

  // const handleKeyDown = async (
  //   event: React.KeyboardEvent<HTMLTextAreaElement>
  // ) => {
  //   if (
  //     event.key === "Enter" &&
  //     !event.shiftKey &&
  //     !event.metaKey &&
  //     !event.ctrlKey
  //   ) {
  //     event.preventDefault(); // Prevent the default action to avoid adding a new line
  //   }
  // };

  const transform = async () => {
    if (!password || !prompt) return;
    const result = await transformEntree({
      prompt,
      systemPrompt,
      hashes,
      model,
      password: password!,
    });
    if (!result) return;
    setTransformations(result);
  };

  const saveTransform = async () => {
    if (!transformations || transformations.length === 0) return;

    const payload = {
      params: {
        prompt,
        systemPrompt,
        model,
      },
      transformations,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transformations.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 lg:block p-6 w-[640px]">
      <div className="flex flex-col gap-2">
        <div>
          <b>system prompt</b>
          <ReactTextareaAutosize
            className="rounded-lg bg-fuachsia-50 w-full min-h-24 p-4 outline-none resize-none text-xs"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            // onKeyDown={handleKeyDown}
          />
        </div>
        <div>
          <b>prompt</b>
          <ReactTextareaAutosize
            className="rounded-lg bg-fuachsia-50 w-full min-h-24 p-4 outline-none resize-none text-xs"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            // onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex gap-4 items-center">
          <b>model</b>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="p-2 rounded-lg border-2 border-fuchsia-700 text-fuchsia-700 bg-transparent hover:bg-fuchsia-200 transition-colors duration-100 ease-in-out outline-none"
          >
            {modelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <button
            className="font-mono rounded-lg py-2 px-4 border-2 text-fuchsia-700 border-fuchsia-700 hover:bg-fuchsia-300 col-span-2"
            onClick={transform}
          >
            transform
          </button>
          <button
            className="font-mono rounded-lg py-2 px-4 border-2 text-green-700 border-green-700 hover:bg-green-300"
            onClick={saveTransform}
          >
            save transform
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transform;
