import React from "react";
import LoginButton from "./LoginButton";

const Header = () => {
  return (
    <div className="w-full grid grid-cols-3 px-4 pt-2">
      <div></div>
      <div className="flex items-center justify-center pt-6">
        <a href="/" className="text-2xl text-fuchsia-800 font-bold font-mono">
          cj's brain
        </a>
      </div>
      <div className="flex items-start justify-end">
        <LoginButton />
      </div>
    </div>
  );
};

export default Header;
