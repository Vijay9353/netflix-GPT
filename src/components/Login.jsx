import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidate } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL, user_avatar } from '../utils/constants';

const Login = () => {

  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const email = useRef(null);
  const password = useRef(null);

  const changeToSignUp = () => {
    setisSignInForm(!isSignInForm);
  }
  const handleButtonClick = () => {
    // console.log(email.current.value);
    // console.log(password.current.value);
    const message = checkValidate(email.current.value, password.current.value)
    setErrorMessage(message);

    if (message) return

    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;

          updateProfile(user, {
            displayName: "name.current.value", photoURL: user_avatar,
          }).then(() => {
            const {uid, email, displayName, photoURL} = auth.currentUser;
            dispatch(addUser({uid:uid, email:email, displayName:displayName, photoURL:photoURL}));
            // Profile updated!
            // ...
          }).catch((error) => {
            // An error occurred
            setErrorMessage(error.message)
          });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "" + errorMessage);
          // ..
        });
    }
    else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user.email);

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src={BG_URL}
          alt='Logo' />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className='w-5/12 absolute p-12 bg-black my-40 mx-auto right-2 left-0 text-amber-50 rounded-3xl opacity-89'>
        <h1 className='font-bold text-3xl p-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input type='text' placeholder='Full Name' className='p-2 ml-4 mr-2 mb-4 bg-gray-700' />}
        <input ref={email} type='text' placeholder='Email Address' className='p-2 ml-4 mr-2 mb-4 bg-gray-700' />
        <input ref={password} type='password' placeholder='Passward' className='p-2 ml-4 mr-2 bg-gray-700' />

        {/* <p className='text-red-500 ml-4'>{errorMessage}</p> */}
        <p className='text-red-500 ml-4 font-bold text-lg'>{errorMessage}</p>
        <button className='p-4 hover:bg-gradient-to-b from-black hover:font-bold hover:border-t-1 cursor-pointer m-4 bg-red-700 w-full rounded-lg inset-shadow-sm inset-shadow-indigo-500/50 ...' onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p className='pl-4 cursor-pointer' onClick={changeToSignUp}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already resistered? Sign In"}</p>

      </form>

    </div>
  )
}

export default Login;