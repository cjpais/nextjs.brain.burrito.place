import { Post } from "@/app/page";
import React from "react";

const Location = ({ post }: { post: Post }) => {
  if (!post.location) return null;

  return <p className="text-neutral-950">📍 {post.location}</p>;
};

export default Location;
