import { GetPlaceDetails } from '@/service/GlobalAPI';
import { PHOTO_REF_URL } from '@/view-trip/components/HotelCardItem';
import React from 'react';
import  { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
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
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-110 transition-all'>

        <img src={photoURL} className='object-cover rounded corner-xl h-[300px] w-[300px] '  />
        <div>
            <h2 className='font-bold text-lg'>
                {trip?.userSelection?.location?.label}
            </h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} days trip with {trip?.userSelection?.budget} budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem