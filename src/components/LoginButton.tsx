"use client";
import { useLogin } from "@/features/useLogin";
import React from "react";
import { Button } from "./ui/button";

const LoginButton = () => {
  const { password, setPassword } = useLogin();

  const isLoggedIn = !!password;

  const handleLogin = () => {
    if (isLoggedIn) {
      // logout
      setPassword(null);
    } else {
      const password = prompt("set password");
      setPassword(password);
    }
  };

  return (
    <Button
      onClick={handleLogin}
      className=""
      // font-mono rounded-lg py-2 px-4 border-2 text-fuchsia-700 border-fuchsia-700 hover:bg-fuchsia-300
    >
      {isLoggedIn ? "logout" : "login"}
    </Button>
  );
};

export default LoginButton;
