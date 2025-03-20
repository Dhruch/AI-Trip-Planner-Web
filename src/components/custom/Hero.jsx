import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

function Hero() {
  return (
    <div className='flex flex-col item-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[60px] text-center mt-4'>
      <span className='text-[#43B7BF]'>"Smart Travel Starts Here -</span><br /> Let AI Map Your Perfect Getaway!"
      </h1>
      <p className='text-xl text-gray-700 text-center text-[30px]'>
    Plan stress-free trips with AI! Get personalized recommendations, itineraries, and travel insights tailored just for you.
  </p>
    <Link to={'/create-trip'} className='text-center'>
    <button >Start Planning Now</button>
    </Link>
    <img src="public/pascal-meier-UYiesSO4FiM-unsplash copy.jpg" alt=""  className='mt-30 rounded-lg'/>
    </div>
  )
  
}

export default Hero