import { Post } from "@/app/(layout)/page";
import React from "react";

const Description = ({ post }: { post: Post }) => {
  if (!post.description) return null;

  return (
    <div className="text-xs">
      <b className="mr-1">Description:</b>
      <i>{post.description}</i>
    </div>
  );
};

export default Description;
