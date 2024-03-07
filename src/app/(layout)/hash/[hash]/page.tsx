import { Post, fetcher } from "@/app/(layout)/page";
import ChatWindow from "@/components/chat/ChatWindow";
import Entree from "@/components/entree/Entree";
import EntreeEditor from "@/components/entree/EntreeEditor";
import React from "react";

export type SendMessageFunction = (message: string, password: string) => void;

const getMetadata = async (hash: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_BRAIN_URL!}/m/${hash}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BRAIN_AUTH_TOKEN}`,
    },
    // help me add authorization
  }).then((r) => r.json());
};

const HashPage = async ({ params }: { params: { hash: string } }) => {
  const post = (await getMetadata(params.hash)) as Post;

  return (
    <div className="flex font-mono text-sm lg:px-24 px-8 py-8 gap-12 h-full">
      <div className="w-1/2">
        <Entree post={post} display="full" />
        <EntreeEditor post={post} />
      </div>
      <ChatWindow />
      {/* < */}
    </div>
  );
};

export default HashPage;
