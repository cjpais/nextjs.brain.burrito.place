import React from "react";
import FoodCard from "./components/FoodCard";

const Page = () => {
  return (
    <div className="container grid grid-cols-12 p-8">
      <div className="w-full max-w-[380px] col-span-12 sm:col-span-8 lg:col-span-6 xl:col-span-4 justify-self-center">
        <FoodCard />
      </div>
    </div>
  );
};

export default Page;
