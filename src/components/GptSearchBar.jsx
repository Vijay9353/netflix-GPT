import React from 'react'
import languages from '../utils/languageConstant'
import { useSelector } from 'react-redux'
import { useRef } from 'react'
import openai from '../utils/openai'

const GptSearchBar = () => {

  const langKey = useSelector((store) => store.config.languages)
  const searchText = useRef(null);

  const handleGptSearchClick = async () => {
    try{
    console.log(searchText.current.value);

    const gptQuery = "Act as movie Recommendation systen and suggest some movies for the query :" + searchText.current.value + ".only give me names of 5 movies, comma separated like the example result given ahead. Example Result : Gadar, Sholay, Don, Golmaal, koi Mil Gaya";

    const getResults = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: gptQuery },
      ],
    });
    console.log(getResults.choices);
  }
    catch (error) {
    if (error.status === 429) {
      console.error("Rate limit or quota exceeded. Check your billing and plan.");
    } else {
      console.error("Error calling OpenAI API:", error);
    }
  }
  }
  return (
    <div className='pt-[8%] flex justify-center'>
      <form onSubmit={(e) => e.preventDefault()} className='w-1/2 bg-black grid grid-cols-12'>
        <input ref={searchText} type='text' className='col-span-9 p-4 m-4 bg-white' placeholder={languages[langKey].gptSearchPlaceholder} />
        <button onClick={handleGptSearchClick} className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg cursor-pointer'>{languages[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar