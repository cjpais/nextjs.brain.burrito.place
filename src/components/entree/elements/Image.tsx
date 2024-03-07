import { Post } from "@/app/(layout)/page";
import React from "react";

const Image = ({ post }: { post: Post }) => {
  if (post.type !== "image") return null;

  return (
    <img
      src={`${process.env.NEXT_PUBLIC_BRAIN_URL}/i/${post.hash}`}
      alt={post.title}
      className="w-full rounded-2xl"
    />
  );
};

export default Image;
