import { Post } from "@/app/(layout)/page";
import React from "react";

const Summary = ({ post }: { post: Post }) => {
  if (!post.summary || post.type === "video") return null;

  return (
    <div className="text-xs">
      <b className="mr-1">Summary:</b>
      <i>{post.summary}</i>
    </div>
  );
};

export default Summary;
