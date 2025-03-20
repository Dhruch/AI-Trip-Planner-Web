import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { PHOTO_REF_URL } from './HotelCardItem';
import { GetPlaceDetails } from '@/service/GlobalAPI';
function PlaceCardItem({place}) {
  const [photoURL,setPhotoURL]=useState();

    useEffect(()=>{
      place && GetPlacePhoto();
    },[place])
  
    const GetPlacePhoto=async()=>{
      const data={
        textQuery:place.placeName
      }
      const result=await GetPlaceDetails(data).then(resp=>{
        const PhotoURL=PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[3].name);
        setPhotoURL(PhotoURL);
      })}
      
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName } target='_blank'>
    <div className='border rounded-xl p-3  flex hover:scale-110 transition-all hover:shadow-md cursor-pointer'>
    <img src={photoURL?photoURL:'/placeholder.svg '} className='h-[130px] w-[130px] rounded-xl object-cover'/>
        <div className='ml-3' >
            <h2 className='mt-1 font-bold text-lg'>{place.placeName}</h2>
            <h2 className='text-gray-500'>{place.placeDetails}</h2>
            <h2 className='text-black '><b >Ticket Price :</b> {place.ticketPricing}</h2>
            <h2 className='text-black'>🕛 {place.travelTime}</h2>
            
        </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem