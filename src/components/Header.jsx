import React from 'react'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser } from '../utils/userSlice';
import { removeUser } from '../utils/userSlice';
import { useEffect } from 'react';
import { LOGO } from '../utils/constants';

export const Header = () => {

  const dispatch= useDispatch();
  const navigate=useNavigate();
  const user= useSelector(store => store.user)

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch(() => {
      navigate("/error");
    });
  }
  useEffect(() => {
    const unsubsrcibed = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
       navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return()=>unsubsrcibed;
  },[]);


  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between' >
      <img className='w-55'
        src={LOGO}
        alt='Logo' />

      {user && (<div className='p-6 flex'>
        <img className='w-9 h-9' src={user?.photoURL} ></img>
        <button onClick={handleSignOut} className='font-bold text-white cursor-pointer'>sign out</button>
      </div>
      )}
    </div>
  )
}
export default Header;