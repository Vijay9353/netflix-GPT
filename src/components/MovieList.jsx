import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {

    console.log(movies);
    if (!movies || movies.length === 0) {
        return null; // or <p>Loading...</p>
    }
    return (
        <div className='p-4 '>
            <h1 className='text-2xl py-1 text-amber-50'>{title}</h1>
            <div className='flex overflow-x-auto'>
                <div className='flex'>
                    {
                        movies.map((movie) => (
                         <MovieCard key={movie.id} posterPath={movie.poster_path} />))
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieList