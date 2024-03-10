"use client";

import { Post } from "@/app/(layout)/page";
import React from "react";
import Entree from "./Entree";
import EntreeTransformation from "./EntreeTransformation";
import { useDevMode } from "@/features/useDevMode";
import { Separator } from "../ui/separator";
import { Card } from "../ui/card";

const EntreeDisplay = ({ posts }: { posts: Post[] }) => {
  const { devMode } = useDevMode();

  return (
    <div
      className={`flex flex-col w-full items-center text-sm px-8 gap-8 ${
        devMode ? "max-w-full" : "max-w-screen-md"
      }`}
    >
      {devMode ? (
        <div className="grid grid-cols-3 gap-6 w-full">
          <div className="flex flex-col w-full gap-2">
            <p className="text-start text-secondary font-medium">ENTREE</p>
            <Separator />
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="text-start text-secondary font-medium">RAW</p>
            <Separator />
          </div>
          <div className="flex flex-col w-full gap-2">
            <p className="text-start text-secondary font-medium">DEV</p>
            <Separator />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-2">
          <p className="text-start text-secondary font-medium">ENTREE</p>
          <Separator />
        </div>
      )}
      {devMode ? (
        <div className="grid grid-cols-3 gap-6">
          <div className={`grid grid-cols-2 gap-6 col-span-2`}>
            {posts.map((post, i) => (
              <React.Fragment key={i}>
                <Entree key={`entree-${i}`} post={post} />
                <Card className="bg-[#33333399] font-mono p-4 flex flex-col gap-2 text-[#FFFFFFA2]">
                  <div className="flex justify-between font-bold">
                    <p className="">0x{post.hash.slice(0, 16)}...</p>
                    <p className="underline text-secondary">Copy</p>
                  </div>
                  <Separator className="bg-[#FFFFFF42]" />
                  <pre className="text-wrap text-xs ">
                    {JSON.stringify({ ...post, embedding: null }, null, 2)}
                  </pre>
                </Card>
              </React.Fragment>
            ))}
          </div>

          <div>THIS IS SOME HUGE COL HERE</div>
        </div>
      ) : (
        <div className={`flex flex-col gap-6`}>
          {posts.map((post, i) => (
            <React.Fragment key={i}>
              <Entree key={`entree-${i}`} post={post} />
            </React.Fragment>
          ))}
          {/* {posts.map((post, i) => ( */}
        </div>
      )}
    </div>
  );
};

export default EntreeDisplay;
