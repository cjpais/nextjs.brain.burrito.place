import Card from "@/components/Card";
import { burrito } from "@/features/burrito";
import dayjs from "dayjs";
import React from "react";

// THIS IS WHAT THE BURRITO API LOOKS LIKE
// NOTE: NO NEXTJS CACHE FOR APP ROUTER. IF NOT APP ROUTER DONT NEED FETCH DEFAULTS
// export const burrito = new Burrito({
//     apiKey: process.env.BRAIN_AUTH_TOKEN,
//     baseUrl: process.env.NEXT_PUBLIC_BRAIN_URL,
//     fetchDefaults: {
//       cache: "no-cache",
//     },
//   });

type OutsideDetail = {
  date: string;
  duration: number;
  activity: string;
};

export const getLast7Days = async () => {
  const last7DaysQuery = await burrito.queryData<{ hash: string }[]>({
    query: "get me the last 7 days of hashes",
    schema: [{ hash: "string. the hash of the data" }],
  });

  return last7DaysQuery.map((d) => d.hash);
};

const getOutdoorsRelatedEntries = async (hashes: string[]) => {
  // this transform runs on each hash individually
  const outdoorsTransform = await burrito.transform<{
    outdoorsRelated: boolean;
    date: string;
  }>({
    hashes,
    prompt: `does this entry relate to a person being outside?

fill in the following json if so. otherwise null. respond only in json
\`\`\`json
{
  "outdoorsRelated": "boolean. true if this entry relates to person being outside, false if not",
  "date": "date in the format: YYYY-MM-DD",
}
\`\`\``,
    systemPrompt:
      "you are a helpful assistant. a person is going to ask you a question about some data. the userData field is especially salient. respond to their question using the data. respond only in JSON.",
    save: {
      app: "outside",
      key: "outside",
    },
  });

  return outdoorsTransform
    .filter((t) => t.completion?.outdoorsRelated)
    .map((t) => t.hash);
};

const getDaysOutdoors = async (hashes: string[]) => {
  return (await burrito.transform<OutsideDetail[]>({
    hashes: hashes,
    prompt: `what days did i go outside?
        
        respond in JSON exactly as follows:
        \`\`\`json
        [
            {
               "date": "YYYY-MM-DD",
               "activity": "string. the activity i did outside",
               "duration": "number. the duration i was outside in minutes. if unknown, put 0"
            }
        ]
        \`\`\``,
    systemPrompt:
      "you are a helpful assistant. a person is going to ask you a question about some data. the userData field is especially salient. respond to their question using the data. respond only in JSON.",
    mode: "all", // this mode instead of running on each hash, runs the transform over all of the hashes given
    model: "gpt4",
  })) as OutsideDetail[];
};

const getOutsideTime = async () => {
  // 1. Get the last 7 days of hashes
  const last7DaysHashes = await getLast7Days();

  // 2. Get true or false for each hash if related to the outdoors. Return only true ones
  const potentialOutdoorsHashes = await getOutdoorsRelatedEntries(
    last7DaysHashes
  );

  // 3. Use GPT4 to make a list of the days we did go outside based on the potential outdoor hashes
  const daysOutdoorsTransform = await getDaysOutdoors(potentialOutdoorsHashes);

  return daysOutdoorsTransform;
};

const OutsideCard = async () => {
  const outsideTimes = await getOutsideTime();

  const last7Days = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(i, "day").format("YYYY-MM-DD")
  ).reverse();

  return (
    <Card>
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-4xl font-bold">🌳</h1>

        <div className="flex gap-2">
          {last7Days.map((day, i) => {
            const outside = outsideTimes.find((m) => m.date === day);
            return (
              <div
                key={i}
                className={`flex flex-col items-center ${
                  outside ? "text-fuchsia-700" : "text-neutral-500"
                }`}
              >
                <p className="text-xl font-bold">{dayjs(day).format("dd")}</p>
                {/* <p>{outside?.activity}</p> */}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default OutsideCard;
