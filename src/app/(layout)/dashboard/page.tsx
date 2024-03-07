import React from "react";
import FoodCard from "./components/FoodCard";
import MeditationCard from "./components/MeditationCard";
import GardenCard from "./components/GardenCard";
import LatestImagesCard from "./components/LatestImagesCard";
import { TanakiModel } from "@/components/Tanaki";
import TanakiChat from "./components/TanakiChat";
import OutsideCard from "./components/OutsideCard";

const Page = () => {
  return (
    <div className="container grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  p-8 gap-8 justify-items-center">
      <div className="max-w-[400px] w-full">
        <FoodCard />
      </div>
      <div className="flex flex-col gap-8  max-w-[400px] w-full">
        <MeditationCard />
        <OutsideCard />
        {/* <LatestImagesCard /> */}
      </div>
      <div className="max-w-[400px]">{/* <GardenCard /> */}</div>
      <TanakiChat />
    </div>
  );
};

export default Page;
