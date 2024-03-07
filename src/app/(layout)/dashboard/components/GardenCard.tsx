import Card from "@/components/Card";
import { burrito } from "@/features/burrito";
import React from "react";
import Separator from "./Separator";
import dayjs from "dayjs";
import ReactTimeago from "react-timeago";

type PlantStatus = {
  name: string;
  status: string;
  emojiStatus: string;
  notes: string;
  latestUpdate: string;
};

const getGardenStatus = async () => {
  const last7DaysQuery = await burrito.queryData<{ hash: string }[]>({
    query: "get me the last 10 days of hashes",
    schema: [{ hash: "string. the hash of the data" }],
  });

  const garden = await burrito.transform<{ gardenRelated: boolean }>({
    prompt: `does this entry relate to the speaker/writers garden? 

    fill in the following json if so. otherwise null
    \`\`\`json
    {
      "gardenRelated": "boolean. true if this entry relates to the speakers garden, false if not",
    }
    \`\`\``,
    systemPrompt:
      "you are a helpful assistant. a person is going to ask you a question about some data. respond to their question using the data. respond only in JSON.",
    hashes: last7DaysQuery.map((d) => d.hash),
    save: {
      app: "garden-tracker",
      key: "garden",
    },
  });

  const filtered = garden.filter((g) => g.completion.gardenRelated);

  const result = await burrito.transform<PlantStatus[]>({
    prompt: `respond in this format

[
  {
    name: "name of the plant",
    status: "status of the plant related to how it can be eaten.",
    emojiStatus:
    "emoji of the status: 🟢, 🟡, or 🔴. green for ready to eat, yellow for growing, red for not good",
    notes: "any additional notes",
    latestUpdate: "date of the latest update"
  },
]`,
    systemPrompt:
      "you are a helpful assistant. a person is going to ask you a question about some data. respond to their question using the data. respond only in JSON.",
    hashes: filtered.map((f) => f.hash),
    mode: "all",
    model: "gpt4",
  });

  // sort by 🟢, 🟡, 🔴
  const sorted = result.sort((a, b) => {
    if (a.emojiStatus > b.emojiStatus) {
      return -1;
    }
    if (a.emojiStatus < b.emojiStatus) {
      return 1;
    }
    return 0;
  });

  return sorted;
};

const GardenCard = async () => {
  const gardenStatus = await getGardenStatus();
  // const latestGardenPhoto =

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-xl">Garden Status</h2>
        <Separator type="horizontal" />
        {gardenStatus.map((plant, i) => (
          <div key={i} className="flex flex-col gap-1 px-1 text-sm">
            <div className="flex gap-2 items-center font-bold">
              <p>{plant.emojiStatus}</p>
              <p>{plant.name}</p>
              <p className="ml-auto font-semibold">
                {dayjs(plant.latestUpdate, "MMM DD, YYYY - hh:mma").format(
                  "MMM DD"
                )}
              </p>
              {/* <ReactTimeago
                date={dayjs(
                  plant.latestUpdate,
                  "MMM DD, YYYY - hh:mma"
                ).toDate()}
              /> */}
            </div>

            <div className="text-xs italic">{plant.notes}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default GardenCard;
