import React from "react";

const Separator = ({
  type = "horizontal",
}: {
  type: "horizontal" | "vertical";
}) => {
  return (
    <div
      className={`bg-[#86198F18] ${
        type === "horizontal" ? "w-full h-[2px]" : "h-full w-[2px]"
      }  rounded-full`}
    ></div>
  );
};

export default Separator;
