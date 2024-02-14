import Card from "@/components/Card";
import { Burrito } from "@burrito-place/api";
import dayjs from "dayjs";
import React from "react";
import { FoodStatus } from "./FoodStatus";

const burrito = new Burrito({
  apiKey: process.env.BRAIN_AUTH_TOKEN,
  baseUrl: process.env.NEXT_PUBLIC_BRAIN_URL,
});

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
  const last7DaysQuery = await burrito.queryData<{ hash: string }[]>({
    query:
      "get me the 7 days of hashes up to the end of yesterday. including today. make sure to include full days",
    schema: [{ hash: "string. the hash of the data" }],
  });

  const last7DaysHashes = last7DaysQuery.map((d) => d.hash);

  const foodTransform = await burrito.transform({
    hashes: last7DaysHashes,
    prompt: `does this entry relate to meals a person ate?
        
        fill in the following json if so. otherwise null
        \`\`\`json
        {
        "mealRelated": "boolean. true if this entry relates to meals a person ate, false if not",
        "date": "string in the format: YYYY-MM-DD",
        }
        \`\`\`
        `,
    systemPrompt:
      "you are a helpful assistant. a person is going to ask you a question about some data. respond to their question using the data. respond only in JSON.",
  });

  const filteredFoodTransform = foodTransform.filter(
    (t) => t.completion?.mealRelated
  );

  const groupedByDate = filteredFoodTransform.reduce((acc, t) => {
    const date = t.completion.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(t);
    return acc;
  }, {} as Record<string, any[]>);

  console.log(groupedByDate);

  //   const arr2d = Object.entries(groupedByDate).map(([date, meals]) => ({
  //     date,
  //     meals,
  //   }));

  const meals = await Promise.all(
    Object.entries(groupedByDate).map(async ([date, meals]) => {
      const mealTransform = await burrito.transform({
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
      });

      return {
        date,
        meals: mealTransform,
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
  const food = await fetchFood();
  console.log(food);

  const mealCounts = food.reduce(
    (acc, current) => {
      Object.values(current.meals).forEach((meal) => {
        if (meal.status === "home") {
          acc.homeMeals += 1;
        } else if (meal.status === "out") {
          acc.outMeals += 1;
        } else {
          acc.skippedMeals += 1;
        }
      });
      return acc;
    },
    { homeMeals: 0, outMeals: 0, skippedMeals: 0 }
  );

  const totalMeals = mealCounts.homeMeals + mealCounts.outMeals;

  console.log("total meals", mealCounts.homeMeals + mealCounts.outMeals);

  return (
    <Card>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Food Tracker</h1>
          <h2 className="text-lg font-bold">
            {((mealCounts.homeMeals / totalMeals) * 100).toFixed()}%
          </h2>
          {/* <div className="flex flex-col text-xs text-end">
            <div className="flex justify-between w-14">
              <p>home:</p>
              <p>{mealCounts.homeMeals}</p>
            </div>
            <div className="flex">
              <p>out:</p>
              <p>{mealCounts.outMeals}</p>
            </div>
          </div> */}
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-[#86198F18] w-full h-[2px] rounded-full"></div>
          {food.map((f, i) => (
            <React.Fragment key={i}>
              <FoodRow data={f} />
              <div className="bg-[#86198F18] w-full h-[2px] rounded-full"></div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </Card>
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
    <div className="flex gap-8 items-center">
      <div className="flex flex-col w-16 gap-0">
        <p className="font-bold text-lg">{day}</p>
        <p className="text-xs">
          {month} {dayOfMonth}
        </p>
      </div>
      <FoodStatus meal={data.meals.breakfast} />
      <FoodStatus meal={data.meals.lunch} />
      <FoodStatus meal={data.meals.dinner} />
    </div>
  );
};

export default FoodCard;
