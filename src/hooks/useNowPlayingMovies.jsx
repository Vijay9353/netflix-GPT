import { API_OPTIONS } from '../utils/constants'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addNowPlayingMovies } from '../utils/moviesSlice'

const useNowPlayingMovies = () =>{

      const dispatch = useDispatch();

  const getNowPlayingMovies = async () =>{

    // fetch the link from TMDB documentation ->api references -> fetch request and import API_OPTIONS from the constants
    const data =await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
    const json = await data.json();
    // console.log(json.results);

    dispatch(addNowPlayingMovies(json.results));
  }

  useEffect(()=>{
    getNowPlayingMovies();
  },[])
}
export default useNowPlayingMovies;