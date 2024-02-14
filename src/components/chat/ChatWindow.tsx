"use client";
import React from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useParams } from "next/navigation";

const ChatWindow = () => {
  const params = useParams<{ hash: string }>();

  return (
    <div className="flex flex-col w-full border-4 rounded-2xl border-fuchsia-800 items-center">
      <h2 className="pt-4 font-bold text-lg">Chat</h2>
      <div className="flex flex-col justify-between p-4 h-full w-full items-center">
        <ChatMessages />
        <ChatInput hash={params.hash} />
      </div>
    </div>
  );
};

export default ChatWindow;
