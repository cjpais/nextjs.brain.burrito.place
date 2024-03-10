import { Post } from "@/app/(layout)/page";
import React from "react";

const Location = ({ post }: { post: Post }) => {
  if (!post.location) return null;

  return <p className="col-span-2">🗺️ {post.location}</p>;
};

export default Location;
