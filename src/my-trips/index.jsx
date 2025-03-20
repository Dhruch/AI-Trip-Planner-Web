import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
    const navigate = useNavigate();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrips();
    }, []); // Run only once on mount

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (!user) {
            navigate('/');
            return;
        }

        try {
            const q = query(collection(db, "AITrips"), where("userEmail", "==", user.email));
            const querySnapshot = await getDocs(q);
            
            const trips = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setUserTrips(trips);
        } catch (error) {
            console.error("Error fetching trips:", error);
        }
    };

    return (
        <div className='mt-20 md:px-40 lg:px-64 xl:px-32 px-8 flex flex-col items-center text-justify'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
                
                {userTrips?.length>0? userTrips.map((trip,index) => (
                    <UserTripCardItem key={trip.id} trip={trip}  />
                )):
                [1,2,3,4,5,6].map((item,index)=>(
                    <div key={index} className='h-[300px]  w-full bg-slate-200 animate-pulse rounded-xl'>

                    </div>
                ))
                }
            </div>
        </div>
    );
}

export default MyTrips;
