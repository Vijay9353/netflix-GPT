import React from 'react'
import languages from '../utils/languageConstant'
import { useSelector } from 'react-redux'

const GptSearchBar = () => {

  const langKey = useSelector((store)=>store.config.languages)
  return (
    <div className='pt-[8%] flex justify-center'>
      <form className='w-1/2 bg-black grid grid-cols-12'>
        <input type='text' className='col-span-9 p-4 m-4 bg-white' placeholder={languages[langKey].gptSearchPlaceholder} />
        <button className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg cursor-pointer'>{languages[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar