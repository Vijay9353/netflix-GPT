import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestion = () => {

  const { movieResults, movieNames } = useSelector((store) => store.gpt);
  if (!movieNames || movieNames.length === 0) {
    return (
      <div className="p-4 m-4  text-white flex justify-center items-center h-60">
        {/* Loading Spinner */}
        <div className="w-14 h-14 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
        {/* <span className="ml-3 text-lg">Loading Movies...</span> */}
      </div>
    );
  }

  return (
    <div className="p-4 m-4 bg-black/90 text-white">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList key={movieName} title={movieName} movies={movieResults[index]} />
        ))}
      </div>
    </div>
  )

}

export default GptMovieSuggestion



