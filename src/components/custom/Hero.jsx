import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function Hero() {
  return (
    <div className="flex flex-col items-center mx-4 md:mx-20 lg:mx-56 gap-6 md:gap-9">
    <h1 className="font-extrabold text-3xl md:text-5xl lg:text-[60px] text-center mt-4">
      <span className="text-[#43B7BF]">"Smart Travel Starts Here -</span><br /> Let AI Map Your Perfect Getaway!"
    </h1>
  
    <p className="text-lg md:text-xl lg:text-[30px] text-gray-700 text-center">
      Plan stress-free trips with AI! Get personalized recommendations, itineraries, and travel insights tailored just for you.
    </p>
  
    <Link to={'/create-trip'} className="text-center">
      <button className="bg-[#43B7BF] hover:bg-[#368C92] text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300">
        Start Planning Now
      </button>
    </Link>
  
    <img 
      src="public/Screenshot 2025-03-20 at 12.54.46 PM.png" 
      alt="Travel preview" 
      className="w-full md:w-[80%] lg:w-[70%] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 mt-4"
    />
  </div>
  
  )
  
}

export default Hero