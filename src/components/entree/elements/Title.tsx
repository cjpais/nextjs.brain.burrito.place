import { Post } from "@/app/(layout)/page";
import React from "react";

const Title = ({ post }: { post: Post }) => {
  return (
    <a
      href={`/hash/${post.hash}`}
      className="text-lg underline text-fuchsia-800"
    >
      {post.title?.replaceAll('"', "")}
    </a>
  );
};

export default Title;
