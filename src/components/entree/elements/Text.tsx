import { Post } from "@/app/(layout)/page";
import React from "react";
import Markdown from "react-markdown";

const Text = ({ post }: { post: Post }) => {
  if (!post.text) return null;

  // return <p>{post.text}</p>;
  return <Markdown>{post.text}</Markdown>;
};

export default Text;
