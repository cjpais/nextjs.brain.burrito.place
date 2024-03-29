"use client";

import { useState } from "react";
import { MealDetail } from "./FoodCard";

export const FoodStatus = ({ meal }: { meal: MealDetail }) => {
  //   const [isHovering, setIsHovering] = useState(false);
  const status = meal.friends.length > 0 ? "friends" : meal.status;

  const getComponent = () => {
    switch (status) {
      case "home":
        return <div className="h-6 w-6 bg-green-800 rounded-full" />;
      case "out":
        return <div className="h-6 w-6 bg-blue-800 rounded-full" />;
      case "none":
        return (
          <div className="h-6 w-6 bg-transparent border-2 border-neutral-300 rounded-full" />
        );
      case "friends":
        return <div className="h-6 w-6 bg-fuchsia-800 rounded-full" />;
      default:
        return (
          <div className="h-6 w-6 bg-transparent border-2 border-neutral-300 rounded-full" />
        );
    }
  };

  return (
    <div className="relative flex justify-center items-center cursor-pointer group">
      {getComponent()}
      <div className="absolute bottom-full mb-2 hidden w-48 p-4 bg-fuchsia-950 text-white text-sm rounded-lg shadow-lg group-hover:block text-xs">
        <div className="flex flex-col">
          <p>{`Ate: ${meal.food}`}</p>
          {meal.friends.length > 0 && (
            <p>{`With: ${meal.friends.join(", ")}`}</p>
          )}
        </div>
      </div>
    </div>
  );
};
