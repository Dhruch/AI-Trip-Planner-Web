import { GetPlaceDetails } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({ hotel }) {
    const [photoURL,setPhotoURL]=useState();
      useEffect(()=>{
        hotel && GetPlacePhoto();
      },[hotel])
    
      const GetPlacePhoto=async()=>{
        const data={
          textQuery:hotel?.hotelName
        }
        const result=await GetPlaceDetails(data).then(resp=>{
          console.log(resp.data.places[0].photos[3].name);
          const PhotoURL=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
          setPhotoURL(PhotoURL);
        })}
    return (


        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotelAddress} target='_blank'>
            <div className='hover:scale-110 transition-all cursor-pointer'>
                <img src={photoURL?photoURL:'/placeholder.svg '} className='rounded-xl h-[200px] w-full object-cover' />
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium '> {hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                    <h2>{hotel?.price}</h2>
                    <h2>⭐ {hotel?.rating} stars</h2>
                </div>
            </div>
        </Link>


    )
}

export default HotelCardItem
export const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key='+import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
