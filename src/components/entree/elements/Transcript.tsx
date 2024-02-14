import { Post } from "@/app/page";
import React from "react";

const Transcript = ({ post }: { post: Post }) => {
  if (!post.audio?.transcript) return null;

  return (
    <div className="text-neutral-950 text-xs">
      <b className="mr-1">Transcript:</b>
      <i>{post.audio.transcript}</i>
    </div>
  );
};

export default Transcript;
