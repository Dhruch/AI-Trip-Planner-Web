import React from 'react'
import PlaceCardItem from './PlaceCardItem';

function Itinerary({ trip }) {
  return (
    <div>
      <h2 className='font-bold text-xl '>Places to Visit</h2>
      <div>
        {Object.entries(trip?.tripData?.itinerary || {})
          .sort(([dayA], [dayB]) => {
            const numA = parseInt(dayA.replace(/\D/g, ""), 10); // Extract number from "Day 1"
            const numB = parseInt(dayB.replace(/\D/g, ""), 10);
            return numA - numB; // Sort numerically
          })
          .map(([day, details], index) => (
            <div key={index} >
              <h2 className='font-medium text-lg'>{day}</h2>
              <h2 className='font-medium text-sm text-cyan-600'><b>Theme of the day </b> : {details?.theme}.</h2>
              <h2 className='font-medium text-sm text-cyan-600'><b>Best Time to travel</b> : {details?.bestTime}.</h2>
              <div className='grid md:grid-cols-2 gap-7'>
              {details.plan.map((place,index)=>(
               <div className='my-3 '>
                <h2 className='font-medium text-sm'></h2>
              <PlaceCardItem place={place}/>
             </div>
              ))}
              </div>
             
            </div>
          ))}


      </div>
    </div>
  )
}

export default Itinerary