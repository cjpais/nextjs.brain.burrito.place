"use client";
import { SendMessageFunction } from "@/app/(layout)/hash/[hash]/page";
import { transformEntree } from "@/features/serverActions";
import { useChat } from "@/features/useChat";
import { useLogin } from "@/features/useLogin";
// import { useChat } from "ai/react";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";

const ChatInput = ({ hash }: { hash: string }) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const { password } = useLogin();
  const { addMessage } = useChat();
  // const { messages, input, handleInputChange, handleSubmit } = useChat({
  //   id: hash,
  //   body: {
  //     password: password!,
  //     hash: hash,
  //   },
  // });

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.metaKey &&
      !event.ctrlKey
    ) {
      event.preventDefault(); // Prevent the default action to avoid adding a new line
      // Trigger send action
      // console.log("Message to send:", message);

      addMessage({ name: "cj", message });
      // Clear message or handle sending logic here
      setMessage("");
      console.log("Sending:", message);
      const result = await transformEntree({
        prompt: message,
        hashes: [hash],
        password: password!,
      });
      console.log("complete:", message);
      // const result = await fetch("/api/chat", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     messages: [{ content: message }],
      //     hash,
      //     password,
      //   }),
      // });

      // if (result) {
      //   const reader = result.body.getReader();
      //   while (true) {
      //     const { done, value } = await reader.read();

      //     if (done) {
      //       break;
      //     }

      //     console.log(value);
      //   }
      // }
      addMessage({ name: "tanaki", message: result! });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div
      className={`max-w-[700px] items-center w-full grid grid-cols-12 border-2 border-fuchsia-700 rounded-lg p2 hover:bg-fuchsia-200 transition-colors duration-100 ease-in-out ${
        isFocused && "bg-fuchsia-200"
      }`}
    >
      {/* <form onSubmit={handleSubmit}> */}
      <TextareaAutosize
        className=" placeholder-fuchsia-950 outline-none bg-transparent resize-none col-span-11 p-4"
        placeholder="message tanaki"
        minRows={1}
        maxRows={5}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={message}
        // onChange={handleInputChange}
      />
      <button
        className="col-span-1 cursor-pointer justify-self-end mr-2"
        type="submit"
      >
        <img src="/send.svg" alt="send" className="w-8 h-8" />
      </button>
      {/* </form> */}
    </div>
  );
};

export default ChatInput;
