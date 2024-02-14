"use client";
import { useTransformations } from "@/features/useTransformations";
import React from "react";

const EntreeTransformation = ({ hash }: { hash: string }) => {
  const { getTransformation } = useTransformations();
  const transformation = getTransformation(hash);

  return (
    <div>
      <h1>Transformation</h1>
      <pre className="max-w-[420px] whitespace-pre-wrap">
        {JSON.stringify(transformation, null, 2)}
      </pre>
    </div>
  );
};

export default EntreeTransformation;
