import { Post } from "@/app/(layout)/page";
import { getEmojiForType } from "@/features/entreeTypes";
import dayjs from "dayjs";
import React from "react";

const Created = ({ post }: { post: Post }) => {
  const formatted = dayjs(post.created * 1000).format("MMM D, YYYY - h:mma");

  return <p className="">{`🗓️ ${formatted}`}</p>;
};

export default Created;
