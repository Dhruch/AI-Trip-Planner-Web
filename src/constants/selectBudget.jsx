import React from "react";

const budgetOptions = [
  { id: "cheap", name: "Cheap", icon: "🏨" },
  { id: "medium", name: "Medium", icon: "🏠" },
  { id: "high", name: "High", icon: "🏦" }
];

const SelectBudget = ({ formData, setFormData }) => {
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 text-[#3D4044]">What is your budget?</h2>
      <div className="flex flex-col space-y-4">
        {budgetOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleInputChange("budget", option.name)}
            className={`flex items-center space-x-4 p-4 w-full rounded-2xl border shadow-md transition-all
              ${
                formData.budget === option.name
                  ? "border-[#43B7BF] bg-[#E0F7FA]"
                  : "border-gray-300 bg-white hover:bg-[#F4E1E3] hover:border-[#219EBC]"
              }`}
          >
            <span className="text-2xl">{option.icon}</span>
            <span className="font-semibold text-[#219EBC]">{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
export const AI_PROMPT="Generate travel plan for location: {location} for {totalDays} days for {traveler} with a {budget} budget, give me hotels option list with hotelName, hotel address, price, hotel images url,  geo coordinates, rating, description, and suggest itenary with place name , place details, place image url, geo coordinate, ticket pricing, time t travel each of the loacation for {totalDays} days with each day plan with the best time to visit in JSON format\n"

export default SelectBudget;
