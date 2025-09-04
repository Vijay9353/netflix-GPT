import React from 'react'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser } from '../utils/userSlice';
import { removeUser } from '../utils/userSlice';
import { useEffect } from 'react';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


export const Header = () => {

  const dispatch= useDispatch();
  const navigate=useNavigate();
  const user= useSelector(store => store.user)
  const showGptSearch = useSelector((store)=>store.gpt.showGptSearch)
  console.log(showGptSearch);

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

  const handleGptSearchClick = () =>{
      dispatch(toggleGptSearchView());
  }

  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value))
  }


  return (
    <div className='absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between' >
      <img className='w-55'
        src={LOGO}
        alt='Logo' />

      {user && (<div className='p-6 flex'>
       {showGptSearch && <select className='p-2 bg-gray-900 text-white m-2' onChange={handleLanguageChange}>
          {
            SUPPORTED_LANGUAGES.map((languages)=>(
              <option key={languages.identifier} value={languages.identifier}>{languages.name}</option>
            ))
          }
                    
        </select>
        }

       <button 
  onClick={handleGptSearchClick} 
  className="flex items-center cursor-pointer mr-2 gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
>
  {showGptSearch ? (
    "Homepage"
  ) : (

    // if you are adding more than 1 elements in your ternary operator then use this <>....</> fragments 
    <>
      <span>GPT</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="22px"
        viewBox="0 -960 960 960"
        width="22px"
        fill="currentColor"
      >
        <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z"/>
      </svg>
    </>
  )}
</button>


        <img className='w-9 h-9' src={user?.photoURL} ></img>
        <button onClick={handleSignOut} className='font-bold text-white cursor-pointer'>sign out</button>
      </div>
      )}
    </div>
  )
  
}
export default Header;