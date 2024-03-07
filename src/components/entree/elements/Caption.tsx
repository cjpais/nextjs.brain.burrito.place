import { Post } from "@/app/(layout)/page";
import React from "react";

const Caption = ({ post }: { post: Post }) => {
  if (!post.caption) return null;

  return (
    <div className="text-neutral-950 text-xs">
      <b className="mr-1">Caption:</b>
      <i>{post.caption}</i>
    </div>
  );
};

export default Caption;
