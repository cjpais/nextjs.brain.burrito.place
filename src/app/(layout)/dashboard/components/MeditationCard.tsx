import Card from "@/components/Card";
import { burrito } from "@/features/burrito";
import { BurritoTransformResponse } from "@burrito-place/api";
import dayjs from "dayjs";
import React from "react";
import Separator from "./Separator";

type MeditationDetail = {
  date: string;
  duration: number;
};

const getMeditations = async () => {
  const last7DaysQuery = await burrito.queryData<{ hash: string }[]>({
    query: "get me the last 7 days of hashes",
    schema: [{ hash: "string. the hash of the data" }],
    // force: true,
  });

  const last7DaysHashes = last7DaysQuery.map((d) => d.hash);

  const meditationTransform = await burrito.transform<{
    meditationRelated: boolean;
    date: string;
  }>({
    hashes: last7DaysHashes,
    prompt: `does this entry relate to a meditation the person did?

fill in the following json if so. otherwise null
\`\`\`json
{
  "meditationRelated": "boolean. true if this entry relates to a meditation this person did, false if not",
  "date": "date in the format: YYYY-MM-DD",
}
\`\`\``,
    systemPrompt:
      "you are a helpful assistant. a person is going to ask you a question about some data. the userData field is especially salient. respond to their question using the data. respond only in JSON.",
    save: {
      app: "meditation",
      key: "meditation",
    },
  });

  const potentialMeditationHashes = meditationTransform
    .filter((t) => t.completion?.meditationRelated)
    .map((t) => t.hash);

  const potentialMeditationTransform = (await burrito.transform<
    MeditationDetail[]
  >({
    hashes: potentialMeditationHashes,
    prompt: `what days did i meditate?
        
        respond in JSON exactly as follows:
        \`\`\`json
        [
            {
               "date": "YYYY-MM-DD",
               "duration": "number. the duration of the meditation in minutes. if unknown, put 15"
            }
        ]
        \`\`\``,
    systemPrompt:
      "you are a helpful assistant. a person is going to ask you a question about some data. the userData field is especially salient. respond to their question using the data. respond only in JSON.",
    mode: "all",
    model: "gpt4",
    // force: true,
  })) as MeditationDetail[];

  const sorted = potentialMeditationTransform.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return sorted;
};

const MeditationCard = async () => {
  return (
    <Card>
      <MeditationContent />
    </Card>
  );
};

export const MeditationContent = async () => {
  const meditations = await getMeditations();

  const totalDuration = meditations.reduce(
    (acc, meditation) => acc + meditation.duration,
    0
  );

  const last7Days = Array.from({ length: 7 }, (_, i) =>
    dayjs().subtract(i, "day").format("YYYY-MM-DD")
  ).reverse();

  const latestMeditationDate = dayjs(meditations[0].date);
  const daysSinceLastMeditation = dayjs().diff(latestMeditationDate, "day");
  const daysAgoString =
    daysSinceLastMeditation === 0
      ? "today"
      : daysSinceLastMeditation === 1
      ? "1 day ago"
      : `${daysSinceLastMeditation} days ago`;

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-4xl font-bold">🧘🏾</h1>

      <div className="flex gap-2">
        {last7Days.map((day, i) => {
          const meditation = meditations.find((m) => m.date === day);
          return (
            <div
              key={i}
              className={`flex flex-col items-center ${
                meditation ? "text-fuchsia-700" : "text-neutral-500"
              }`}
            >
              <p className="text-xl font-bold">{dayjs(day).format("dd")}</p>
              {/* <p>{meditation ? "🧘🏾" : "❌"}</p> */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MeditationCard;
