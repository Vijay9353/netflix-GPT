import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";


const VideoBackground = ({movieId}) => {

  const trailerVideo = useSelector(store => store.movies?.trailerVideo)

  useMovieTrailer(movieId);
  return (
    <div>
        <iframe
        className="w-screen aspect-video"

        // to autoplay the youtube video we have to use "?&autoplay=1&mute=1" property in the video link
        src={"https://www.youtube.com/embed/"+trailerVideo?.key + "?&autoplay=1&mute=1"}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        
        ></iframe>
    </div>
  )
}

export default VideoBackground