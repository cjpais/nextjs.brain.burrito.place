import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="p-8 rounded-2xl bg-white font-sans text-fuchsia-800"
      style={{
        boxShadow: "0 7px 14px 0px rgba(134, 25, 143, .1)",
      }}
    >
      {children}
    </div>
  );
};

export default Card;
