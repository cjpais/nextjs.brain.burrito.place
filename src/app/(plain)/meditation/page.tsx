import React from "react";
import MeditationCard, {
  MeditationContent,
} from "../../(layout)/dashboard/components/MeditationCard";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <MeditationContent />
    </div>
  );
};

export default Page;
