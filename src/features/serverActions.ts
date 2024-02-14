"use server";

import { revalidatePath } from "next/cache";

export const deleteEntree = async (hash: string, password: string) => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_BRAIN_URL}/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${password}`,
    },
    body: JSON.stringify({
      hash,
    }),
  })
    .then((r) => r.ok)
    .catch(() => false);
  revalidatePath("/");
  return result;
};

export const transformEntree = async ({
  systemPrompt = "You are a helpful assistant.",
  prompt,
  hashes,
  password,
  model = "gpt3.5",
}: {
  systemPrompt?: string;
  prompt: string;
  hashes: string[];
  password: string;
  model?: string;
}) => {
  console.log("transforming", prompt, systemPrompt, hashes, password, model);
  const result = await fetch(`${process.env.NEXT_PUBLIC_BRAIN_URL}/transform`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${password}`,
    },
    body: JSON.stringify({
      hashes,
      prompt,
      systemPrompt,
      stream: false,
      // model: "t3.5",
      model,
    }),
    cache: "no-cache",
  })
    .then((r) => r.json())
    // .then((r) => r.text())
    .catch((e) => {
      console.log("error", e);
      return null;
    });

  console.log(result);

  return result;
};
