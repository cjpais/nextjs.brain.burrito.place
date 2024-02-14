import {
  AIStream,
  AIStreamCallbacksAndOptions,
  AIStreamParser,
  OpenAIStream,
  StreamingTextResponse,
} from "ai";

// Set the runtime to edge for best performance
export const runtime = "edge";

function parseBurritoStream(): AIStreamParser {
  let previous = "";
  return (data) => {
    console.log("data", data);
    previous += data;
    return data;
  };
}

export function BurritoStream(
  res: Response,
  cb?: AIStreamCallbacksAndOptions
): ReadableStream {
  return AIStream(res, parseBurritoStream(), cb);
}

export async function POST(req: Request) {
  const { messages, password, hash } = await req.json();

  const prompt = messages[messages.length - 1].content;

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BRAIN_URL}/transform`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify({
        hashes: [hash],
        prompt,
      }),
    }
  );

  return new Response(response.body);
}
