import { Post } from "@/app/page";
import React from "react";

const Video = ({ post }: { post: Post }) => {
  if (post.type !== "video") return null;
  return (
    <video
      controls
      src={`${process.env.NEXT_PUBLIC_BRAIN_URL}/v/${post.hash}`}
      className="w-full rounded-2xl"
    />
  );
};

export default Video;
