"use client";

import { Post } from "@/app/(layout)/page";
import React, { useEffect, useState } from "react";
import JsonView from "react18-json-view";
import "react18-json-view/src/style.css";
import { compare, deepClone } from "fast-json-patch";
import { editEntree } from "@/features/serverActions";
import { useLogin } from "@/features/useLogin";

const EntreeEditor = ({ post }: { post: Post }) => {
  const { password } = useLogin();
  const [prevPost, setPrevPost] = useState<Post>(deepClone(post));

  const save = async (modifiedPost: any) => {
    if (!password) return;
    const patches = compare(prevPost, modifiedPost);
    const ok = await editEntree({
      hash: post.hash,
      patches,
      password,
    });
    if (!ok) {
      console.error("Failed to save changes");
    } else {
      setPrevPost(deepClone(modifiedPost));
    }
  };

  if (!password) return <></>;

  return (
    <JsonView
      src={post}
      displaySize={"collapsed"}
      collapsed={4}
      editable={true}
      onDelete={(e) => save(e.src)}
      onEdit={(e) => save(e.src)}
      onAdd={(e) => save(e.src)}
    />
  );
};

export default EntreeEditor;
