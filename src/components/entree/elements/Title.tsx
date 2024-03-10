import { Post } from "@/app/(layout)/page";
import React from "react";

const Title = ({ post }: { post: Post }) => {
  return (
    <a
      href={`/hash/${post.hash}`}
      className="font-bold text-2xl hover:underline"
    >
      {post.title?.replaceAll('"', "")}
    </a>
  );
};

export default Title;
