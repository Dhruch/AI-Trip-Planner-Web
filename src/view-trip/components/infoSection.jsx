import { GetPlaceDetails } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { FaShare } from "react-icons/fa";
import { PHOTO_REF_URL } from './HotelCardItem';

function InfoSection({trip}) {
  const [photoURL,setPhotoURL]=useState();
  useEffect(()=>{
    trip && GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location?.label
    }
    const result=await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name);
      const PhotoURL=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
      setPhotoURL(PhotoURL);
    })
    
  }
  return (
    <div>

        <img src={photoURL?photoURL:'/placeholder.svg '} className='h-[340px] w-full object-cover rounded-xl flex '  />

        <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl mb-3'>{trip?.userSelection?.location?.label}</h2>
            <div className='gap-5 flex '>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-xs md:text-lg'> 📆 {trip?.userSelection?.noOfDays} days </h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-xs md:text-lg'> 💸 {trip?.userSelection?.budget} budget </h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-xs md:text-lg'> 🥂 {trip?.userSelection?.noOfPeople}  </h2>
            </div>
        </div>
        <button><FaShare/> </button>
        </div>
        
    </div>
  )
}

export default InfoSection