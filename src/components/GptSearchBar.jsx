// import React from 'react'
// import languages from '../utils/languageConstant'
// import { useSelector } from 'react-redux'
// import { useRef } from 'react'
// import openai from '../utils/gemini'

// const GptSearchBar = () => {

//   const langKey = useSelector((store) => store.config.languages)
//   const searchText = useRef(null);

//   const handleGptSearchClick = async () => {
//     try{
//     console.log(searchText.current.value);

//     const gptQuery = "Act as movie Recommendation systen and suggest some movies for the query :" + searchText.current.value + ".only give me names of 5 movies, comma separated like the example result given ahead. Example Result : Gadar, Sholay, Don, Golmaal, koi Mil Gaya";

//     const getResults = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "user", content: gptQuery },
//       ],
//     });
//     console.log(getResults.choices[0].message.content);
//   }
//     catch (error) {
//     if (error.status === 429) {
//       console.error("Rate limit or quota exceeded. Check your billing and plan.");
//     } else {
//       console.error("Error calling OpenAI API:", error);
//     }
//   }
//   }
//   return (
//     <div className='pt-[8%] flex justify-center'>
//       <form onSubmit={(e) => e.preventDefault()} className='w-1/2 bg-black grid grid-cols-12'>
//         <input ref={searchText} type='text' className='col-span-9 p-4 m-4 bg-white' placeholder={languages[langKey].gptSearchPlaceholder} />
//         <button onClick={handleGptSearchClick} className='col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg cursor-pointer'>{languages[langKey].search}</button>
//       </form>
//     </div>
//   )
// }

// export default GptSearchBar






import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import languages from "../utils/languageConstant";
import genAI from "../utils/gemini"; // changed import
import { API_OPTIONS } from "../utils/constants";
import { addGptMovieResult, setGptLoading } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.languages);
  const searchText = useRef(null);

  //search movie in tmdb
  const searchMovieTMDB = async(movie) =>{
      const data = await fetch("https://api.themoviedb.org/3/search/movie?query="+movie+"&include_adult=false&language=en-US&page=1",API_OPTIONS);
      const json = await data.json();

      return json.results;
    }

  const handleGptSearchClick = async () => {
    try {
      dispatch(setGptLoading(true));
      console.log(searchText.current.value);

      const gptQuery =
        "Act as movie Recommendation system and suggest some movies for the query :" +
        searchText.current.value +
        ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result : Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

      // Choose model (gemini-pro is for text)
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(gptQuery);
      const response = await result.response;
      // const text = response.text();
      const text = response.candidates[0].content.parts[0].text;
      const gptmovies = text.split(",").map(movie =>
        movie.trim());

        const promiseArray = gptmovies.map(movie =>searchMovieTMDB(movie));

        Promise.all(promiseArray)

        // Takes that array of promises and waits for all of them to resolve.

        // Runs them in parallel, not one by one.

        // If all succeed → returns an array of results in the same order as the input movies.

        // If any one fails → the whole Promise.all rejects with that error.
        const tmdbResults = await Promise.all(promiseArray);

        console.log(tmdbResults);
        dispatch(addGptMovieResult({movieNames:gptmovies, movieResults: tmdbResults}));
        
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      dispatch(setGptLoading(false));
    }
  };

  return (
    <div className="pt-[8%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-1/2 bg-black grid grid-cols-12"
      >
        <input
          ref={searchText}
          type="text"
          className="col-span-9 p-4 m-4 bg-white"
          placeholder={languages[langKey].gptSearchPlaceholder}
        />
        <button
          onClick={handleGptSearchClick}
          className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg cursor-pointer hover:bg-red-800"
        >
          {languages[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
