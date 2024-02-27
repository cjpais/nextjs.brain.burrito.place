"use client";

import { entreeTypes, getEmojiForType } from "@/features/entreeTypes";
import { useRouter } from "next/navigation";
import React from "react";

const Filters = () => {
  const router = useRouter();

  return (
    <div className="flex gap-6">
      {entreeTypes.map((type) => (
        <button key={type} onClick={() => router.push(`/?type=${type}`)}>
          {getEmojiForType(type)}
        </button>
        // <div key={type} className="flex gap-2 items-center">
        //   <label htmlFor={type}>{type}</label>
        // </div>
      ))}
      {/* THESE ARE LENSES (PROVIDE youR OWN LENSES) */}
    </div>
  );
};

export default Filters;
