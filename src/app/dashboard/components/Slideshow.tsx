"use client";

import React, { useEffect, useRef } from "react";
import { PeerPhoto } from "./LatestImagesCard";
import TimeAgo from "react-timeago";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";

const Slideshow = ({ photos }: { photos: PeerPhoto[] }) => {
  const [currImageIndex, setCurrImageIndex] = React.useState(0);
  const timerRef = useRef<NodeJS.Timeout>(); // Ref to store the current timeout ID

  const curr = photos[currImageIndex];

  useEffect(() => {
    // Set up a new timer
    timerRef.current = setTimeout(() => {
      setCurrImageIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 20000);

    // Cleanup function to clear the timer when the component unmounts or before setting a new timer
    return () => clearTimeout(timerRef.current);
  }, [currImageIndex]); // This effect depends on `currImageIndex`

  // Handler for changing image on user click
  const changeImage = (to: number) => {
    clearTimeout(timerRef.current); // Clear the existing timer using the ref
    setCurrImageIndex(to); // Set the new image index, which will trigger the useEffect to create a new timer
  };

  return (
    <AnimatePresence mode="wait">
      <div className="flex flex-col gap-2">
        <motion.div
          className="flex flex-col gap-2 min-h-[300px]"
          key={currImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }} // Transition duration 1 second
        >
          {/* <div className="flex justify-between text-[.75rem]"> */}
          {/* <Created post={curr.photo as Post} /> */}
          {/* </div> */}
          <div className="flex gap-2 justify-between items-center">
            <div className="flex flex-col w-2/3">
              <p className="font-bold">{curr.peer.name}</p>
              <div className="text-[.65rem]">
                {/* <Location post={curr.photo as Post} /> */}
                {curr.photo.location && (
                  <p className="text-xs italic">{curr.photo.location}</p>
                )}
              </div>
            </div>
            <div className="text-sm">
              <TimeAgo date={dayjs(curr.photo.created * 1000).toDate()} />
            </div>
          </div>
          <img
            src={`${curr.peer.url}/i/${curr.photo.hash}`}
            className={`rounded-xl`}
          />
          <p className="text-sm self-center">
            {curr.photo.userData
              ? curr.photo.userData
              : curr.photo.title.replaceAll('"', "")}
          </p>
          {/* <div className="text-xs">
        <Location post={curr.photo as Post} />
      </div> */}
        </motion.div>
        <div className="flex self-center pt-2 gap-4">
          {photos.map((photo, i) => (
            <div
              key={i}
              className={`hover:cursor-pointer w-[10px] h-[10px] rounded-full ${
                i === currImageIndex ? "bg-fuchsia-700" : "bg-gray-400"
              }`}
              onClick={() => changeImage(i)}
            ></div>
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Slideshow;
