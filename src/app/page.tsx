import dayjs from "dayjs";
import Image from "next/image";

// TODO make this into schema
type Post = {
  title: string;
  created: number;
  summary: string;
  hash: string;
};

export async function fetcher2<T>(query: string, schema?: any): Promise<T> {
  const res = await fetch(`${process.env.BRAIN_URL!}/query`, {
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
  const res = await fetch(`${process.env.BRAIN_URL!}/query/data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + process.env.BRAIN_AUTH_TOKEN,
    },
    body: JSON.stringify({
      query,
    }),
  }).then((res) => res.json());

  return res as T;
}

const Home = async () => {
  const posts = await fetcher<Post[]>(
    "Get me the latest 10 posts with the title, created date in UNIX timestamp, summary, and hash"
  );

  return (
    <div className="flex flex-col items-center justify-between gap-8">
      {posts.map((post, i) => (
        <div key={i} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <a
              href={`/hash/${post.hash}`}
              className="text-lg underline text-neutral-200"
            >
              {post.title}
            </a>
            <p className="text-neutral-500">
              {dayjs(post.created * 1000).format("MMM D, YYYY - h:mma")}
            </p>
          </div>
          <p className="text-neutral-100">Summary: {post.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
