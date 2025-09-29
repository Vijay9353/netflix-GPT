// import React from 'react'
// import { useSelector } from 'react-redux'
// import MovieList from './MovieList';

// const GptMovieSuggestion = () => {

//   const { movieResults, movieNames } = useSelector((store) => store.gpt);
//   if (!movieNames || movieNames.length === 0) {
//     return (
//       <div className="p-4 m-4  text-white flex justify-center items-center h-60">
//         {/* Loading Spinner */}
//         <div className="w-14 h-14 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
//         {/* <span className="ml-3 text-lg">Loading Movies...</span> */}
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 m-4 bg-black/90 text-white">
//       <div>
//         {movieNames.map((movieName, index) => (
//           <MovieList key={movieName} title={movieName} movies={movieResults[index]} />
//         ))}
//       </div>
//     </div>
//   )

// }

// export default GptMovieSuggestion



import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';

const GptMovieSuggestion = () => {

  const { movieResults, movieNames, isLoading } = useSelector((store) => store.gpt);
  
  // Shimmer UI while waiting for search results
  if (isLoading) {
    const ShimmerRow = ({ keyIdx }) => (
      <div key={keyIdx} className="mb-8">
        {/* Section title shimmer */}
        <div className="h-6 w-44 md:w-56 bg-gray-700/70 rounded-md mb-4 animate-pulse" />
        {/* Horizontal cards shimmer */}
        <div className="flex space-x-4 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="shrink-0">
              <div className="w-28 h-40 md:w-36 md:h-52 lg:w-40 lg:h-60 bg-gray-700/60 rounded-lg overflow-hidden relative">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700" />
              </div>
              <div className="mt-2 h-3 w-24 md:w-28 bg-gray-700/60 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="p-4 m-4 text-white">
        <div className="mb-4 h-5 w-24 bg-red-600/80 rounded-full animate-pulse" />
        <div className="bg-black/80 rounded-xl p-4 md:p-6">
          {[0, 1, 2, 3].map((k) => (
            <ShimmerRow keyIdx={k} key={k} />
          ))}
        </div>
      </div>
    );
  }

  // Empty state when not loading and no results yet
  if (!movieNames || movieNames.length === 0) {
    return (
      <div className="p-4 m-4 text-white">
        <div className="bg-black/80 rounded-xl p-8 text-center text-gray-300">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-600/80 flex items-center justify-center text-white">🎬</div>
          <p className="text-lg">Start typing a movie topic and hit <span className="text-red-500 font-semibold">Search</span> to get AI recommendations.</p>
        </div>
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







