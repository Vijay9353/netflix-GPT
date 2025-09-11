import { API_OPTIONS } from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPopularMovies } from '../utils/moviesSlice'

const usePopularMovies = () =>{

      const dispatch = useDispatch();
      const popularMovies = useSelector((store)=>store.movies.popularMoviesMovies);

  const getPopularMovies = async () =>{

    // fetch the link from TMDB documentation ->api references -> fetch request and import API_OPTIONS from the constants
    const data =await fetch('https://api.themoviedb.org/3/movie/popular?page=1', API_OPTIONS);
    const json = await data.json();
    // console.log(json.results);

    dispatch(addPopularMovies(json.results));
  }

  useEffect(()=>{
    !popularMovies && getPopularMovies();
  },[])
}
export default usePopularMovies;