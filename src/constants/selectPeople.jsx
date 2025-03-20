import React, { useState } from "react";
import { User, Heart, Users, Group } from "lucide-react"; // Icons for travel options

const travelOptions = [
  { id: "solo", label: "Solo", icon: <User size={40} className="text-[#43B7BF]" /> },
  { id: "couple", label: "Couple", icon: <Heart size={40} className="text-[#FF4F5A]" /> },
  { id: "family", label: "Family", icon: <Users size={40} className="text-[#F4A261]" /> },
  { id: "friends", label: "Friends", icon: <Group size={40} className="text-[#2A9D8F]" /> },
];

function SelectTravelOption({ formData, setFormData }) {
  const handleSelect = (option) => {
    setFormData({ ...formData, noOfPeople: option });
  };

  return (
    <div className="mt-10 text-left w-full">
      <h2 className="text-xl font-medium mb-5">How many people are going?</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-lg mx-auto">
        {travelOptions.map((option) => (
          <div
            key={option.id}
            className={`p-5 border-2 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all
              ${
                formData.noOfPeople === option.id
                  ? "border-[#43B7BF] bg-[#E0F7FA] shadow-lg"
                  : "border-gray-300 bg-white"
              }
              hover:bg-[#F4E1E3] hover:border-[#219EBC] hover:shadow-md
            `}
            onClick={() => handleSelect(option.id)}
          >
            {option.icon}
            <p className="mt-3 text-lg font-medium">{option.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export const AI_PROMPT="Generate travel plan for location: {location} for {totalDays} days for {traveler} with a {budget} budget, give me hotels option list with hotelName, hotel address, price, hotel images url,  geo coordinates, rating, description, and suggest itenary with place name , place details, place image url, geo coordinate, ticket pricing, time t travel each of the loacation for {totalDays} days with each day plan with the best time to visit in JSON format\n"
export default SelectTravelOption;
