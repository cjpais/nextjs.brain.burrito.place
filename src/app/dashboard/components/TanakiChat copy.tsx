"use client";
import { TanakiModel } from "@/components/Tanaki";
import { useChat } from "@/features/useChat";
import React, { use, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { TypeAnimation } from "react-type-animation";

const INTERMEDIATE_RESPONSE = "reaching out to friends schedules";
const FINAL_RESPONSE =
  "yo, it looks like caroline, alex, kyle, kristen, and austin are available. austin is coming into town on tuesday so it may be good to round up the gang";

const splitString = (text: string) => {
  const result: string[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    // Determine the length of the next segment, ensuring it's between 2 and 5
    // and does not exceed the length of the remaining part of the string.
    const segmentLength = Math.min(
      Math.floor(Math.random() * (5 - 2 + 1)) + 2,
      text.length - currentIndex
    );

    // Extract the segment and add it to the result array.
    const segment = text.substring(currentIndex, currentIndex + segmentLength);
    result.push(segment);

    // Update the current index to move to the next segment.
    currentIndex += segmentLength;
  }

  return result;
};

const generateMessageSequence = (text: string) => {
  const split = splitString(text);

  function getRandomNumber() {
    return Math.floor(Math.random() * (200 - 50)) + 50;
  }

  // Use reduce to build a new array with interleaved numbers
  const sequence: Array<string | number> = split.reduce<Array<string | number>>(
    (acc, current, index) => {
      // Add the current string
      if (acc.length > 0) {
        acc.push(acc[acc.length - 2] + current);
      } else {
        acc.push(current);
      }

      // If it's not the last element, add a random number
      if (index < split.length - 1) {
        acc.push(getRandomNumber()); // Convert to string to keep consistent data type
      }

      return acc;
    },
    []
  ); // Initial value is an empty array

  return sequence;
};

const TypingEffect = ({ text }: { text: string }) => {
  const sequence = generateMessageSequence(text);

  return (
    <TypeAnimation
      sequence={sequence}
      cursor={false}
      speed={{ type: "keyStrokeDelayInMs", value: 0 }}
    />
  );
};

const TanakiChat2 = () => {
  const { messages, addMessage, clearMessages } = useChat();
  const [isFocused, setIsFocused] = React.useState(false);
  const [message, setMessage] = React.useState("");

  useEffect(() => {
    clearMessages();
    addMessage({ name: "tanaki", message: "sup bud!" });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

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

      setTimeout(() => {
        addMessage({ name: "tanaki", message: INTERMEDIATE_RESPONSE });
      }, 1500);

      setTimeout(() => {
        addMessage({ name: "tanaki", message: FINAL_RESPONSE });
      }, 8500);

      const tokens = setMessage("");
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 lg:block p-6 w-[500px]">
      <div className="flex flex-col gap-4">
        <TanakiModel />
        <div className="flex flex-col gap-3 text-sm font-sans">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl flex flex-col justify-end ${
                m.name === "tanaki"
                  ? "bg-fuchsia-200 mr-auto"
                  : "ml-auto text-right bg-white"
              }`}
              style={{
                boxShadow: "0 7px 14px 0px rgba(134, 25, 143, .1)",
              }}
            >
              <p className="font-bold">{m.name}</p>
              {m.name === "tanaki" ? (
                <TypingEffect text={m.message} />
              ) : (
                <p>{m.message}</p>
              )}
            </div>
          ))}

          <div
            className={`max-w-[700px] items-center w-full grid grid-cols-12 border-2 border-fuchsia-700 rounded-lg p2 hover:bg-fuchsia-200 transition-colors duration-100 ease-in-out ${
              isFocused && "bg-fuchsia-200"
            }`}
          >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TanakiChat2;
