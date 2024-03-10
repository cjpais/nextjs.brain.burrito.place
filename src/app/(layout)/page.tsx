import EntreeDisplay from "@/components/entree/EntreeDisplay";
import React from "react";

// TODO make this into schema
export type Post = {
  hash: string;
  type: string;
  created: number;
  title?: string;
  summary?: string;
  location?: string;
  text?: string;
  description?: string;
  caption?: string;
  audio?: {
    transcript?: string;
  };
};

export async function fetcher2<T>(query: string, schema?: any): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BRAIN_URL!}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.BRAIN_AUTH_TOKEN,
    },
    body: JSON.stringify({
      query,
      schema,
    }),
    cache: "no-cache",
  }).then((res) => res.json());
  return res as T;
}

export async function fetcher<T>(query: string, schema?: string): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BRAIN_URL!}/query/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.BRAIN_AUTH_TOKEN,
    },
    body: JSON.stringify({
      query,
    }),
    next: {
      revalidate: 10,
    },
  }).then((res) => res.json());

  // console.log("res", res);

  return res as T;
}

const fetchSimilar = async (query: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BRAIN_URL!}/query/embeddings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.BRAIN_AUTH_TOKEN,
      },
      body: JSON.stringify({
        queries: [query],
        num: 10,
      }),
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .catch((e) => console.log(e));

  return res as Post[];
};

const Home = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  let query = "Get me the latest 10 posts, sort by date";

  // if (search)
  if (searchParams?.type) {
    query = `Get me the latest 10 posts of type ${searchParams.type}, sort by date`;
  }

  if (searchParams?.data) {
    query = searchParams.data as string;
  }

  const posts = searchParams?.keyword
    ? await fetchSimilar(searchParams?.keyword as string)
    : await fetcher<Post[]>(query);

  return <EntreeDisplay posts={posts} />;
};

export default Home;
