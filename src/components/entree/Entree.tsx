import { Post } from "@/app/(layout)/page";
import dayjs from "dayjs";
import React from "react";
import DeleteButton from "../DeleteButton";
import { getEmojiForType } from "@/features/entreeTypes";
import Summary from "./elements/Summary";
import Location from "./elements/Location";
import Created from "./elements/Created";
import Title from "./elements/Title";
import Video from "./elements/Video";
import Image from "./elements/Image";
import Transcript from "./elements/Transcript";
import Description from "./elements/Description";
import Text from "./elements/Text"; // Add this line
import Caption from "./elements/Caption";

type EntreeDisplay = "tiny" | "medium" | "full";

const Entree = ({
  post,
  display = "medium",
  includeDelete = false,
}: {
  post: Post;
  display?: EntreeDisplay;
  includeDelete?: boolean;
}) => {
  return (
    <div className="flex items-start w-full max-h-full overflow-auto">
      {/* TODO this is meant to be a sidebar */}
      {includeDelete && (
        <div className="flex flex-col gap-2 w-12 pt-[6px]">
          <DeleteButton hash={post.hash} />
        </div>
      )}

      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col gap-2">
          <Title post={post} />

          <div className="flex justify-between">
            <Location post={post} />
            <Created post={post} />
          </div>
        </div>

        <Summary post={post} />
        <Caption post={post} />
        {display === "full" && (
          <>
            <Description post={post} />
            <Transcript post={post} />
            <Text post={post} />
          </>
        )}
        <Image post={post} />
        <Video post={post} />
      </div>
    </div>
  );
};

export default Entree;
