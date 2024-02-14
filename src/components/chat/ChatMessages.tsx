"use client";
import React from "react";
import ChatMessage from "./ChatMessage";
// import { useChat } from "ai/react";
import { useChat } from "@/features/useChat";

const ChatMessages = () => {
  const { messages } = useChat();
  // const { messages } = useChat();
  return (
    <div className="flex flex-col gap-8 overflow-y-scroll max-w-[620px] w-full py-4">
      {messages.map((message, index) => (
        <ChatMessage key={index} {...message} />
      ))}
    </div>
  );
};

export default ChatMessages;
