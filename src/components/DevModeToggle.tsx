"use client";

import { useDevMode } from "@/features/useDevMode";
import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";

const DevModeToggle = () => {
  const { devMode, setDevMode } = useDevMode();

  return (
    <Button onClick={() => setDevMode(!devMode)} className="bg-transparent">
      <Image
        width={36}
        height={36}
        src={devMode ? "/dev-on.svg" : "dev-off.svg"}
        alt="dev mode"
      />
    </Button>
  );
};

export default DevModeToggle;
