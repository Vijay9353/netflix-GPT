import React from 'react'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { addUser } from '../utils/userSlice';
import { removeUser } from '../utils/userSlice';
import { useEffect } from 'react';
import { LOGO, SUPPORTED_LANGUAGES, user_avatar } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';


export const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user)
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
  // console.log(showGptSearch);

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
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubsrcibed;
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
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
            SUPPORTED_LANGUAGES.map((languages) => (
              <option key={languages.identifier} value={languages.identifier}>{languages.name}</option>
            ))
          }

        </select>
        }

        <button
          onClick={handleGptSearchClick}
      
        >
          {showGptSearch ? (
            <img className='w-10 h-10 z-10 m-2 rounded-3xl' title='Home' src='data:image/jpeg;base64,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' alt='home_logo' />
          ) : (

            // if you are adding more than 1 elements in your ternary operator then use this <>....</> fragments 
            <>
              <div title='Search movies' className='flex items-center cursor-pointer mr-2 gap-1 px-2 py-1.5
bg-gradient-to-r from-purple-600 to-purple-800 
hover:from-purple-700 hover:to-purple-900 
text-white font-medium rounded-lg 
shadow-md hover:shadow-lg 
transition-all duration-300 ease-in-out 
transform hover:scale-105 active:scale-95'>
                <span>GPT</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="22px"
                  viewBox="0 -960 960 960"
                  width="22px"
                  fill="currentColor"
                >
                  <path d="M765-144 526-383q-30 22-65.79 34.5-35.79 12.5-76.18 12.5Q284-336 214-406t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.03q0 40.39-12.5 76.18Q599-464 577-434l239 239-51 51ZM384-408q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" />
                </svg>
              </div>
            </>
          )}
        </button>


        {/* <img className='w-9 h-9' src={user?.photoURL}></img> */}
        <img className='w-10 h-10 rounded-full m-2' title='User' src={user_avatar}></img>
        <button onClick={handleSignOut} className='pl-2 font-bold text-white cursor-pointer bg-red-600 hover:bg-red-800 pr-1 w-20 h-9 rounded-xl mt-2.5'>sign out</button>
      </div>
      )}
    </div>
  )

}
export default Header;