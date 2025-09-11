export const LOGO = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-24/consent/87b6a5c0-0104-4e96-a291-092c11350111/019808e2-d1e7-7c0f-ad43-c485b7d9a221/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const user_avatar = "https://media.licdn.com/dms/image/v2/D5635AQGLcZn9OLFF6A/profile-framedphoto-shrink_100_100/B56ZhtrIwdG0Ao-/0/1754186681712?e=1757948400&v=beta&t=76zpqVNco8mnjfKw857wRe02Tbnep4NLoWwdM8_m2-E";

// take this options from tmdb->api reference
export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_KEY,
  },
};

//take down the below link fromt the TMDB api website-> Guides -> Basics
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500/";

export const BG_URL = 'https://assets.nflxext.com/ffe/siteui/vlv3/258d0f77-2241-4282-b613-8354a7675d1a/web/IN-en-20250721-TRIFECTA-perspective_cadc8408-df6e-4313-a05d-daa9dcac139f_small.jpg';

export const SUPPORTED_LANGUAGES = [{ identifier: "en", name: "English" },
{ identifier: "hindi", name: "Hindi" },
{ identifier: "spanish", name: "Spanish" }];

// go to https://platform.openai.com/api-keys  and create new secret key
// export const OPENAI_KEY = "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";


// You can get your key from Google AI Studio
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;