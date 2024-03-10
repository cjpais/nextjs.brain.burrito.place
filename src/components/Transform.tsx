"use client";

import { installTransform, transformEntree } from "@/features/serverActions";
import { useLogin } from "@/features/useLogin";
import { useTransformations } from "@/features/useTransformations";
import ReactTextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { BurritoModels } from "@burrito-place/api";
import { Input } from "./ui/input";

const modelOptions: { value: BurritoModels; label: string }[] = [
  { value: "gpt3.5", label: "gpt-3.5" },
  { value: "gpt4", label: "gpt-4" },
  { value: "mixtral", label: "mixtral" },
  { value: "mistral7b", label: "mistral-7b" },
  { value: "mistral-small", label: "mistral-small" },
  { value: "mistral-medium", label: "mistral-medium" },
  { value: "mistral-large", label: "mistral-large" },
];

const Transform = ({ hashes }: { hashes: string[] }) => {
  const { password } = useLogin();
  const {
    setTransformations,
    transformations,
    prompt,
    model,
    json,
    systemPrompt,
    mode,
    outputMode,
    setMode,
    setOutputMode,
    setSystemPrompt,
    setModel,
    setPrompt,
    setJson,
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

    const p =
      outputMode === "json"
        ? `${prompt}\n\noutput schema:\n${JSON.stringify(
            json.reduce<{ [key: string]: string }>((acc, curr) => {
              acc[curr.key] = curr.description;
              return acc;
            }, {})
          )}`
        : prompt;

    const result = await transformEntree({
      prompt: p,
      systemPrompt,
      hashes,
      model,
      password: password!,
      mode,
    });
    if (!result) return;
    console.log("transform result", result);
    setTransformations(result);
  };

  const saveTransform = async () => {
    if (!transformations || transformations.length === 0) return;

    const payload = {
      params: {
        prompt,
        systemPrompt,
        model,
        mode,
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

  const install = async () => {
    if (!password || !prompt) return;
    const result = await installTransform({
      prompt,
      systemPrompt,
      model,
      password: password!,
      mode: "each",
    });
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 lg:block p-6 w-[640px]">
      <div className="flex flex-col gap-2">
        <div>
          <b>system prompt</b>
          <ReactTextareaAutosize
            className="rounded-lg bg-white w-full min-h-24 p-4 outline-none resize-none text-xs"
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            // onKeyDown={handleKeyDown}
          />
        </div>
        <select
          value={outputMode}
          onChange={(e) => setOutputMode(e.target.value as "json" | "text")}
          className="p-2 rounded-lg border-2 border-fuchsia-700 text-fuchsia-700 bg-transparent hover:bg-fuchsia-200 transition-colors duration-100 ease-in-out outline-none w-1/6"
        >
          <option value="json">json</option>
          <option value="text">text</option>
        </select>
        <div>
          <b>prompt</b>
          <ReactTextareaAutosize
            className="rounded-lg bg-white w-full min-h-24 p-4 outline-none resize-none text-xs"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            // onKeyDown={handleKeyDown}
          />
        </div>
        {outputMode === "json" && (
          <div>
            <b>json output</b>
            <div className="flex flex-col gap-2 py-4">
              {json.map((j, i) => (
                <div className="grid grid-cols-12 gap-4 items-center" key={i}>
                  <button
                    className="rounded-lg border-2 border-red-700 text-red-700 bg-transparent hover:bg-red-200 transition-colors duration-100 ease-in-out outline-none col-span-1 w-6 h-6"
                    onClick={() =>
                      setJson(json.filter((_, index) => index !== i))
                    }
                  >
                    -
                  </button>
                  <Input
                    placeholder="key"
                    className="col-span-4"
                    value={j.key}
                    onChange={(e) => {
                      setJson(
                        json.map((item, index) => {
                          if (index === i) {
                            return {
                              ...item,
                              key: e.target.value,
                            };
                          }
                          return item;
                        })
                      );
                    }}
                  ></Input>
                  <Input
                    value={j.description}
                    placeholder="description"
                    className="col-span-7"
                    onChange={(e) => {
                      setJson(
                        json.map((item, index) => {
                          if (index === i) {
                            return {
                              ...item,
                              description: e.target.value,
                            };
                          }
                          return item;
                        })
                      );
                    }}
                  ></Input>
                </div>
              ))}
              <button
                className="w-6 h-6 rounded-lg border-2 border-green-700 text-green-700 bg-transparent hover:bg-green-200 transition-colors duration-100 ease-in-out outline-none"
                onClick={() => setJson([...json, { key: "", description: "" }])}
              >
                +
              </button>
            </div>
          </div>
        )}
        <div className="flex gap-4 items-center">
          <b>model</b>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value as BurritoModels)}
            className="p-2 rounded-lg border-2 border-fuchsia-700 text-fuchsia-700 bg-transparent hover:bg-fuchsia-200 transition-colors duration-100 ease-in-out outline-none"
          >
            {modelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <b>mode</b>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as "each" | "all")}
            className="p-2 rounded-lg border-2 border-fuchsia-700 text-fuchsia-700 bg-transparent hover:bg-fuchsia-200 transition-colors duration-100 ease-in-out outline-none"
          >
            <option value="each">each</option>
            <option value="all">all</option>
          </select>
        </div>
        <div className="grid grid-cols-6 gap-4">
          <button
            className="rounded-lg py-2 px-4 border-2 text-fuchsia-700 border-fuchsia-700 hover:bg-fuchsia-300 col-span-2"
            onClick={transform}
          >
            transform
          </button>
          <button
            className="rounded-lg py-2 px-4 border-2 text-green-700 border-green-700 hover:bg-green-300 col-span-2"
            onClick={install}
            disabled={mode !== "each"}
          >
            install transform
          </button>
          <button
            className="rounded-lg py-2 px-4 border-2 text-green-700 border-green-700 hover:bg-green-300 col-span-2"
            onClick={saveTransform}
          >
            dl transform
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transform;
