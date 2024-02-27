import { Burrito } from "@burrito-place/api";

export const burrito = new Burrito({
  apiKey: process.env.BRAIN_AUTH_TOKEN,
  baseUrl: process.env.NEXT_PUBLIC_BRAIN_URL,
  fetchDefaults: {
    cache: "no-cache",
  },
});
