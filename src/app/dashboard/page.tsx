import React from "react";
import FoodCard from "./components/FoodCard";

const Page = () => {
  return (
    <div className="container grid grid-cols-12 p-8">
      <div className="xl:col-span-3 sm:col-span-6 col-span-12">
        <FoodCard />
      </div>
    </div>
  );
};

export default Page;
