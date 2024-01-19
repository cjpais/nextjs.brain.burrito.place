import { fetcher } from "@/app/page";
import React from "react";

const HashPage = async ({ params }: { params: { hash: string } }) => {
  const post = await fetcher<any>(`Find the hash ${params.hash} in data`);
  console.log(post);

  return (
    <div>
      <h1>{post.title}</h1>
      {/* <audio controls src={`${process.env.BRAIN_URL}/d/${post.hash}`} /> */}
      <p>Transcript: {post.audio.transcript}</p>
      <p>Summary: {post.summary}</p>
    </div>
  );
};

export default HashPage;
