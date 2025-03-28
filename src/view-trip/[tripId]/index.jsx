import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { use } from 'react';
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/infoSection';
import Hotel from '../components/Hotel';
import Itinerary from '../components/Itinerary';
import Footer from '../components/Footer';


function Viewtrip() {

    const {tripId}=useParams();
    const [trip,setTrip]=useState([]);

   useEffect(()=>{
    tripId && getTripData();
   },[tripId])

    const getTripData=async()=>{

    const docRef=doc(db,"AITrips",tripId);
    const docSnap=await getDoc(docRef);

    if (docSnap.exists()){
        console.log("trip data:",docSnap.data());
        setTrip(docSnap.data());
    }
    else{
        console.log("No such document found.")
        toast("No Trip Found!")
    }
    }
  return (

    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* information section */}
        <InfoSection trip={trip}/>
        {/* recommended hotels */}
        <Hotel trip={trip}/>
        {/* itenary */}
        <Itinerary trip={trip}/>
        {/* footer */}
        <Footer trip={trip}/>

    </div>
  )
}

export default Viewtrip