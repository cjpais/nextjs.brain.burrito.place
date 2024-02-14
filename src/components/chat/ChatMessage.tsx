import React from "react";

const ChatMessage = ({ message, name }: { message: string; name: string }) => {
  const icon = name === "cj" ? "/me.jpeg" : "/tanakisq.svg";

  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-1 items-center">
        <img src={icon} alt="profile" className="w-12 h-12 rounded-full" />
        <p className="font-bold w-16 text-xs text-center">{name}</p>
      </div>
      <div className="">{message}</div>
    </div>
  );
};

export default ChatMessage;
