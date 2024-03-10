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
import { Separator } from "../ui/separator";

type EntreeDisplay = "tiny" | "medium" | "full";

const Entree = ({
  post,
  display = "medium",
}: {
  post: Post;
  display?: EntreeDisplay;
  includeDelete?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-2">
        <Title post={post} />

        <div className="grid grid-cols-3 font-medium">
          <Created post={post} />
          <Location post={post} />
        </div>

        <Separator className="bg-sep" />
      </div>

      <div className="flex flex-col gap-2 text-dark">
        <Summary post={post} />
        <Caption post={post} />
        <Description post={post} />
        {display === "full" && (
          <>
            <Transcript post={post} />
            <Text post={post} />
          </>
        )}
      </div>

      <Separator className="bg-sep" />

      <Image post={post} />
      <Video post={post} />
      <Separator className="mt-6" />
    </div>
  );
};

export default Entree;
