import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';


function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
    const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  })

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google login success:", tokenResponse);
      getUserProfile(tokenResponse);
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
  });

  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo.access_token}`)
      .then((resp) => {
        console.log("User Profile:", resp.data);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }

  return (
    <>
      <div className='p-2 shadow-sm flex justify-between items-center'>
        <a href="/">
        <img className='cursor-pointer w-20 h-20'src='./logo.svg' id='logo'  />
        </a>
        <div >
          {user ?

            <div className='flex gap-4 items-center'>
              <a href="/my-trips">
              <button className='rounded-full'>My Trips</button>
              </a>

              <Popover>
                <PopoverTrigger asChild>
                  <img src={"public/default-avatar-profile-icon-of-social-media-user-in-clipart-style-vector copy.jpg"}
                    className="h-[60px] w-[60px] rounded-full cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent><h2 className='cursor-pointer' onClick={()=>{
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                
                }}>Logout</h2></PopoverContent>
              </Popover>
            </div>
            :
            <button className='cursor-pointer' onClick={()=>setOpenDialog(true)}>Sign In</button>
          }
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
    </>
  )
}

export default Header