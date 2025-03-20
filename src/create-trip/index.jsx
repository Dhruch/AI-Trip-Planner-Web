import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '@/components/ui/input'
import SelectTravelOption, { AI_PROMPT } from '@/constants/selectPeople';
import SelectBudget from '@/constants/selectBudget';
import { toast } from 'sonner';
import { chatSession } from '@/service/AImodel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {  useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    noOfPeople: "",
    budget: "",
  });
  const navigate=useNavigate();

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  useEffect(() => {
    console.log("Dialog open state changed:", openDialog);
  }, [openDialog]);

  const handleIpChange = (name, value) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google login success:", tokenResponse);
      getUserProfile(tokenResponse);
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
  });

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docID = Date.now().toString();
    await setDoc(doc(db, "AITrips", docID), {
      userSelection:formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docID,
    });
    setLoading(false);
    navigate('/view-trip/'+ docID);

  }

  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo.access_token}`)
      .then((resp) => {
        console.log("User Profile:", resp.data);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }

  const onGenerateTrip = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // Check if the user is not logged in
    if (!user) {
      setOpenDialog(true);
      return;
    }
    // Validation check
    if (!formData?.budget || !formData?.noOfPeople || !formData?.location || !formData?.noOfDays ) {
      toast("⚠️ Please fill all the details properly.");
      setLoading(false);
      return;
    }
    setLoading(true);
    // Prepare AI prompt
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.noOfPeople)
      .replace('{budget}', formData?.budget);

    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    const aiResponseText = await result.response.text();


    SaveAiTrip(aiResponseText);
    console.log("AI response: ", aiResponseText);

    setLoading(false);
    
  };

  return (
    <div>
      <div className="mt-20 md:px-40 lg:px-64 xl:px-32 px-8 flex flex-col items-center text-justify">
        <h2 className="font-extrabold text-[#43B7BF] text-2xl">
          Share your preferences for personalized travel recommendations!
        </h2>
      </div>

      <div className="mt-20 md:px-40 lg:px-64 xl:px-32 px-8 flex flex-col items-center text-left">
        <div className="w-full max-w-md p-4 rounded-lg">
          <h2 className="text-xl my-3 font-medium">What is the destination of choice?</h2>
          <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place, onChange: (v) => { setPlace(v); handleIpChange('location', v) }
            }}
            debounce={600}
          />
        </div>

        <div className="w-full max-w-md p-4 rounded-lg mt-10">
          <h2 className="text-xl mb-3 font-medium">How long do you plan to stay?</h2>
          <Input type="number" placeholder='Add number of days' className=" text-gray-500"
            onChange={(e) => handleIpChange('noOfDays', e.target.value)} />
        </div>

        <div className="w-full max-w-md p-4 rounded-lg">
          <SelectTravelOption formData={formData} setFormData={setFormData} />
        </div>

        <div className="w-full max-w-md p-4 rounded-lg mt-10">
          <SelectBudget formData={formData} setFormData={setFormData} />
        </div>
      </div>

      <div className='text-center mt-10 mb-5'>
        <button disabled={loading} className='text-center items-center' onClick={onGenerateTrip}>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
          }
        </button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <img src="/logo.svg" className='w-30 h-20' alt="Logo" />
          <h3 className='font-bold text-xl mt-5'>Sign In with Google</h3>
          <p className='mt-2.5'>Sign In to the app with Google authentication securely</p>
          <button onClick={login} className='w-full mt-5 flex gap-4 items-center justify-center'>
            <FcGoogle className='h-7 w-7' />Sign In with Google
          </button>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateTrip;
