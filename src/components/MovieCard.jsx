// import React from 'react'
// import { IMG_CDN_URL } from '../utils/constants'

// const MovieCard = ({posterPath}) => {
//   if(!posterPath) return null;
//   return (
//     <div className='w-45 pr-3'>
//         <img alt='Movie Card'
//         src={IMG_CDN_URL+posterPath}/>
//     </div>
//   )
// }

// export default MovieCard


import React, { useEffect, useRef, useState } from 'react'
import { IMG_CDN_URL } from '../utils/constants'


const MovieCard = ({posterPath}) => {

   const [loaded, setLoaded] = useState(false);
  const [dominant, setDominant] = useState({ r: 30, g: 30, b: 30 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const imgRef = useRef(null);
  const cardRef = useRef(null);


  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth) {
      extractDominantColor(img);
      setLoaded(true);
    }
  }, [posterPath]);

  if(!posterPath) return null;

 

  // Compute dominant color using a tiny canvas downsample
const extractDominantColor = (img) => {
  try {
    // SSR guard: avoid running on server
    if (typeof window === "undefined") return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // safety check

    // Ensure image is actually loaded
    if (!img.naturalWidth || !img.naturalHeight) return;

    const w = 40; // downsample width
    const h = Math.max(1, Math.floor((img.naturalHeight / img.naturalWidth) * w));
    canvas.width = w;
    canvas.height = h;

    ctx.drawImage(img, 0, 0, w, h);

    let r = 0, g = 0, b = 0, count = 0;
    const step = 8; // sample every other pixel (4 values per pixel)

    try {
      const data = ctx.getImageData(0, 0, w, h).data;

      for (let i = 0; i < data.length; i += step) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

      if (count > 0) {
        setDominant({
          r: Math.floor(r / count),
          g: Math.floor(g / count),
          b: Math.floor(b / count),
        });
      }
    } catch (e) {
      // This will happen if the image is from a different origin (CORS issue)
      console.warn("Canvas getImageData blocked by CORS", e);
    }
  } catch (err) {
    console.error("extractDominantColor error:", err);
  }
};


  const overlayGradient = `linear-gradient(180deg, rgba(${dominant.r}, ${dominant.g}, ${dominant.b}, 0.0) 0%, rgba(${dominant.r}, ${dominant.g}, ${dominant.b}, 0.35) 40%, rgba(${dominant.r}, ${dominant.g}, ${dominant.b}, 0.6) 100%)`;

  

  const handleImgLoad = (e) => {
    extractDominantColor(e.target);
    setLoaded(true);
  };

  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -6; // tilt X
    const ry = ((x / rect.width) - 0.5) * 6;  // tilt Y
    setTilt({ rx, ry });
  };
  const onMouseLeave = () => setTilt({ rx: 0, ry: 0 });

  return (
    <div className='w-45 pr-3'>
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className='group relative rounded-xl p-2 transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:p-4 hover:shadow-2xl'
        style={{
          backgroundColor: `rgba(${dominant.r}, ${dominant.g}, ${dominant.b}, 0.35)`,
          transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-4px)`,
        }}
      >
        {/* Poster image with shimmer while loading */}
        <div className='relative overflow-hidden rounded-lg'>
          {!loaded && (
            <div className='absolute inset-0 animate-pulse bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700' />
          )}
          <img
            ref={imgRef}
            alt='Movie Card'
            onLoad={handleImgLoad}
            className={`w-full h-full object-cover rounded-lg transition-all duration-300 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'} group-hover:brightness-75`}
            src={IMG_CDN_URL + posterPath}
          />

          {/* Adaptive color overlay */}
          <div
            className='pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg'
            style={{ backgroundImage: overlayGradient }}
          />
        </div>

        {/* Subtle glow using dominant color */}
        <div
          className='pointer-events-none absolute -inset-1 rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-300'
          style={{ background: `radial-gradient(40% 60% at 50% 80%, rgba(${dominant.r}, ${dominant.g}, ${dominant.b}, 0.6), rgba(0,0,0,0))` }}
        />
      </div>
    </div>
  )
}

export default MovieCard
