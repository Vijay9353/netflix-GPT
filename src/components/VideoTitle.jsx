import React from 'react'

const VideoTitle = ( {title, overview}) => {
  return (
    <div className=' pt-50 px-12 absolute bg-gradient-to-r from-black text-white'>
        <h1 className='text-4xl font-bold'>{title}</h1>
        <p className='py-6 text-lg w-1/3'>{overview}</p>
    <div>
        <button className='hover:cursor-pointer bg-white text-black pb-1 px-10 text-xl font-bold '><span className='text-3xl'>‣</span>Play</button>
        <button  className=' mx-2 bg-gray-300 text-white p-1 px-4 text-xl bg-opacity-50'>❕More Info</button>
    </div>
    </div>
  )
}

export default VideoTitle;