import { Post, fetcher } from "@/app/page";
import ChatWindow from "@/components/chat/ChatWindow";
import Entree from "@/components/entree/Entree";
import React from "react";

export type SendMessageFunction = (message: string, password: string) => void;

const getMetadata = async (hash: string) => {
  return await fetch(`${process.env.NEXT_PUBLIC_BRAIN_URL!}/m/${hash}`).then(
    (r) => r.json()
  );
};

const HashPage = async ({ params }: { params: { hash: string } }) => {
  const post = (await getMetadata(params.hash)) as Post;

  return (
    <div className="flex font-mono text-sm lg:px-24 px-8 py-8 gap-12 h-full">
      <div className="w-1/2">
        <Entree post={post} display="full" />
      </div>
      <ChatWindow />
    </div>
  );
};

export default HashPage;
