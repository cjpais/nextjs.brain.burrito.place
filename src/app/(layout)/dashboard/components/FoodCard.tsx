import Card from "@/components/Card";
import { BurritoTransformResponse } from "@burrito-place/api";
import dayjs from "dayjs";
import React from "react";
import { FoodStatus } from "./FoodStatus";
import { burrito } from "@/features/burrito";
import Separator from "./Separator";

export type MealDetail = {
  // description of the meal
  food: string;

  // location of the meal. out if meal was eaten out. if no meal was eaten put none. otherwise put home
  status: "home" | "out" | "none";

  // who this meal was eaten with. only include friends who i ate with
  friends: string[];

  // any other people involved who are not friends
  people: string[];
};

type Meal = {
  breakfast: MealDetail;
  lunch: MealDetail;
  dinner: MealDetail;
};

type FoodData = {
  date: string;
  meals: Meal;
};

const fetchFood = async () => {
  const last7DaysQuery = await burrito.queryData<{ hash: string }[] | string[]>(
    {
      query: "get me the last 7 days of hashes, include full days",
      schema: [{ hash: "string. the hash of the data" }],
    }
  );

  console.log("last7DaysQuery", last7DaysQuery);

  const last7DaysHashes = last7DaysQuery.map((d) => d.hash || d);

  const foodTransform = await burrito.transform<{
    mealRelated: boolean;
    date: string;
  }>({
    hashes: last7DaysHashes,
    prompt: `does this entry relate to meals a person ate?

fill in the following json if so. otherwise null
\`\`\`json
{
  "mealRelated": "boolean. true if this entry relates to meals a person ate, false if not",
  "date": "the day the meal was eaten. respond in string in the format: YYYY-MM-DD",
}
\`\`\``,
    systemPrompt:
      "you are a helpful assistant. a person is going to ask you a question about some data. respond to their question using the data. respond only in JSON.",
    save: {
      app: "food-tracker",
    },
    // force: true,
    debug: true,
  });

  const filteredFoodTransform = foodTransform.filter(
    (t) => t.completion?.mealRelated
  );

  console.log("filteredFoodTransform", filteredFoodTransform);

  // return [];

  const groupedByDate = filteredFoodTransform.reduce((acc, t) => {
    const date = t.completion.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(t);
    return acc;
  }, {} as Record<string, any[]>);

  // console.log("groupedByDate", JSON.stringify(groupedByDate, null, 2));
  // return groupedByDate;

  const arr2d = Object.entries(groupedByDate).map(([date, meals]) => ({
    date,
    meals,
  }));

  const meals = await Promise.all(
    Object.entries(groupedByDate).map(async ([date, meals]) => {
      const mealTransform = await burrito.transform<Meal>({
        prompt: `what was eaten for breakfast, lunch, and dinner?

            Do your best to infer from the data

            Responding in JSON fill out a Meal according to:
            \`\`\`typescript
            type MealDetail = {
                // description of the meal
                food: string;

                // location of the meal. out if meal was eaten out. if no meal was eaten put none. otherwise put home
                status: "home" | "out" | "none";

                // who this meal was eaten with. only include friends who i ate with
                friends: string[];

                // any other people involved who are not friends
                people: string[];
            }

            type Meal = {
                breakfast: MealDetail;
                lunch: MealDetail;
                dinner: MealDetail;
            }
            \`\`\`
            `,
        systemPrompt:
          "you are a helpful assistant. a person is going to ask you a question about some data. respond to their question using the data.",
        hashes: meals.map((m: any) => m.hash),
        mode: "all",
        completionType: "json",
        model: "gpt4",
        // force: true,
      });

      return {
        date,
        meals: mealTransform as Meal,
      };
    })
  );

  const ordered = meals.sort((a, b) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    return 0;
  });

  return ordered;
};

const FoodCard = async () => {
  return (
    <Card>
      <FoodContent />
    </Card>
  );
};

export const FoodContent = async () => {
  const food = await fetchFood();

  const mealCounts = food.reduce(
    (acc, current) => {
      Object.values(current.meals).forEach((meal) => {
        if (meal.friends.length > 0) {
          acc.friends += 1;
          acc.total += 1;
        } else if (meal.status === "home") {
          acc.home += 1;
          acc.total += 1;
        } else if (meal.status === "out") {
          acc.out += 1;
          acc.total += 1;
        } else {
          acc.skipped += 1;
        }
      });
      return acc;
    },
    { home: 0, out: 0, skipped: 0, friends: 0, total: 0 }
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold b">Food Tracker</h1>
          <div className="flex gap-10 pr-1 justify-end font-bold">
            <p>🍳</p>
            <p>🥪</p>
            <p>🍽️</p>
          </div>
        </div>
        <Separator type="horizontal" />
        {food.map((f, i) => (
          <React.Fragment key={i}>
            <FoodRow data={f} />
            <Separator type="horizontal" />
          </React.Fragment>
        ))}
      </div>
      <div className="grid grid-cols-12 text-xs items-center min-[300px]:w-full">
        <h2 className="font-bold col-span-2">meals</h2>
        <div className="col-span-10 grid grid-cols-4 justify-items-center">
          <p className="text-fuchsia-800 font-bold">w/ friends</p>
          <p className="text-green-800 font-bold">@ home</p>
          <p className="text-blue-800 font-bold">eaten out</p>
          <p className="text-neutral-500 font-bold">skipped</p>
        </div>

        <h2 className="col-span-2 font-bold">count</h2>
        <div className="col-span-10 grid grid-cols-4 justify-items-center">
          <p className="text-fuchsia-800">{mealCounts.friends}</p>
          <p className="text-green-800">{mealCounts.home}</p>
          <p className="text-blue-800">{mealCounts.out}</p>
          <p className="text-neutral-500">{mealCounts.skipped}</p>
        </div>

        <h2 className="col-span-2 font-bold">perc</h2>
        <div className="col-span-10 grid grid-cols-4 justify-items-center">
          <p className="text-fuchsia-800">
            {((mealCounts.friends / mealCounts.total) * 100).toFixed()}%
          </p>
          <p className="text-green-800">
            {((mealCounts.home / mealCounts.total) * 100).toFixed()}%
          </p>
          <p className="text-blue-800">
            {((mealCounts.out / mealCounts.total) * 100).toFixed()}%
          </p>
          <p className="text-neutral-500">-</p>
        </div>
      </div>
    </div>
  );
};

type RowData = {
  date: string;
  breakfastStatus: "home" | "out" | "none" | "friends";
};

const FoodRow = ({ data }: { data: FoodData }) => {
  const date = dayjs(data.date);
  const day = date.format("ddd");
  const month = date.format("MMM");
  const dayOfMonth = date.format("DD");
  const bfastStatus =
    data.meals.breakfast.friends.length > 0
      ? "friends"
      : data.meals.breakfast.status;
  const lunchStatus =
    data.meals.lunch.friends.length > 0 ? "friends" : data.meals.lunch.status;
  const dinnerStatus =
    data.meals.dinner.friends.length > 0 ? "friends" : data.meals.dinner.status;

  return (
    <div className="flex gap-8 items-center justify-between">
      <div className="flex gap-3 items-center">
        <div className="flex flex-col w-16 gap-0">
          <p className="font-bold text-lg">{day}</p>
          <p className="text-xs">
            {month} {dayOfMonth}
          </p>
        </div>
        <div className=" flex-col w-full font-mono text-[.5rem] min-[400px]:flex hidden">
          <p className="line-clamp-1">b: {data.meals.breakfast.food}</p>
          <p className="line-clamp-1">l: {data.meals.lunch.food}</p>
          <p className="line-clamp-1">d: {data.meals.dinner.food}</p>
        </div>
      </div>
      <div className="flex gap-8">
        <FoodStatus meal={data.meals.breakfast} />
        <FoodStatus meal={data.meals.lunch} />
        <FoodStatus meal={data.meals.dinner} />
      </div>
    </div>
  );
};

export default FoodCard;
