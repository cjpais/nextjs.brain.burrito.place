import React from "react";
import { fetcher, fetcher2 } from "../page";

const TestPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="grid gap-4">
        <People />
      </div>
    </div>
  );
};

const People = async () => {
  const question = "Who have I talked to this week?";
  const responseSchema = [
    {
      name: "name of the person",
      dates: ["dates i talked to them"],
      summary: "summary of the interactions/conversations over the week.",
      parasocial:
        "does this seem like a person i know or someone i don't know?",
    },
  ];

  const data = await fetcher2<any>(question, responseSchema);

  console.log(data);

  return (
    <div className="flex flex-col min-w-96 gap-4">
      <div className="font-mono">
        <p>Question: {question}</p>
        <p>Response Schema: {JSON.stringify(responseSchema)}</p>
      </div>

      <h1 className="text-2xl">People</h1>
      {/* {JSON.stringify(people)} */}
      {data.data.map((person, i) => (
        <div key={i} className="flex flex-col gap-1 border-white">
          <h1>name: {person.name}</h1>
          <p>dates: {JSON.stringify(person.dates)}</p>
          <p>conversation summary: {person.summary}</p>
          <p>parasocial?: {person.parasocial}</p>
        </div>
      ))}
      {JSON.stringify(data)}
    </div>
  );
};

export default TestPage;

{
  /* <DaysSurfing /> */
}
{
  /* <TodoItems /> */
}
{
  /* <Thoughts /> */
}
{
  /* <Passion /> */
}
const DaysSurfing = async () => {
  const days = await fetcher2<any[]>("When did I surf this week?", []);

  //   console.log(days);

  return (
    <div className="flex flex-col min-w-96">
      <h1 className="text-2xl">Days</h1>
      <p className="font-mono">{JSON.stringify(days)}</p>
      {/* {days.map((day, i) => (
        <div key={i}>
          <h1>{day.day}</h1>
        </div>
      ))} */}
    </div>
  );
};

const TodoItems = async () => {
  const todos = await fetcher2<any[]>(
    "Get me all of my todos from the past 3 days. Collapse any todos that are similar. ",
    ["todo item"]
  );

  //   console.log(todos);

  return (
    <div className="flex flex-col min-w-96">
      <h1 className="text-2xl">TODO</h1>
      <p className="font-mono">{JSON.stringify(todos)}</p>
      {/* {todos.map((todo, i) => (
        <div key={i}>
          <h1>{todo.title}</h1>
        </div>
      ))} */}
    </div>
  );
};

const Thoughts = async () => {
  const thoughts = await fetcher2<any[]>(
    "Summarize all my thinking from the last week into broad categories.",
    {
      categories: [
        {
          name: "string",
          summary: "summary of category",
          references: ["hashes relevant to this category"],
        },
      ],
      overallSummary: "summary of all my thinking",
    }
  );

  //   console.log(thoughts);

  return (
    <div className="flex flex-col w-32">
      <h1 className="text-2xl">Thoughts</h1>
      {JSON.stringify(thoughts)}
      {/* {thoughts.map((thought, i) => (
        <div key={i}>
          <h1>{thought.title}</h1>
        </div>
      ))} */}
    </div>
  );
};

const Passion = async () => {
  const passions = await fetcher2<any[]>(
    "What are the most passionately discussed subjects from the last week.",
    {
      passions: [
        {
          name: "string",
          score: "one word to describe how passionate i am",
        },
      ],
      overallSummary: "summary of all my passions",
    }
  );

  //   console.log(thoughts);

  return (
    <div className="flex flex-col w-32">
      <h1 className="text-2xl">Passions</h1>
      {JSON.stringify(passions)}
      {/* {thoughts.map((thought, i) => (
        <div key={i}>
          <h1>{thought.title}</h1>
        </div>
      ))} */}
    </div>
  );
};
