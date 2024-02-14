import Entree from "@/components/entree/Entree";
import EntreeTransformation from "@/components/entree/EntreeTransformation";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import Transform from "@/components/Transform";
import dayjs from "dayjs";
import Image from "next/image";
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
        num: 50,
      }),
    }
  ).then((res) => res.json());

  return res as Post[];
};

const Home = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  let query = "Get me the latest 10 posts, sort by date";

  if (searchParams?.type) {
    query = `Get me the latest 10 posts of type ${searchParams.type}, sort by date`;
  }

  const posts = searchParams?.query
    ? await fetchSimilar(searchParams.query)
    : await fetcher<Post[]>(query);

  // const transformations =

  return (
    <div className="flex flex-col gap-8  w-full items-center font-mono text-sm lg:flex lg:px-24 px-8 py-8">
      <div className="max-w-3xl flex flex-col w-full items-center gap-4">
        <Filters />
        <Search />
      </div>
      <div className="grid grid-cols-2 w-3/4 max-w-6xl gap-8">
        {posts.map((post, i) => (
          <React.Fragment key={i}>
            <Entree key={`entree-${i}`} post={post} includeDelete={true} />
            <EntreeTransformation key={`transform-${i}`} hash={post.hash} />
            {/* <div>
              <h1>Transformation</h1>
            </div> */}
          </React.Fragment>
        ))}
        {/* {posts.map((post, i) => ( */}
      </div>
      <Transform hashes={posts.map((p) => p.hash)} />
    </div>
  );
};

export default Home;
