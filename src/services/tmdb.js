const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

async function tmdbFetch(endpoint) {
  const response = await fetch(
    `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error(
      `TMDB API Error: ${response.status}`
    );
  }

  return response.json();
}


// 🔥 Trending Movies — Today
export async function getTrendingMovies() {
  return tmdbFetch("/trending/movie/day");
}


// 🔥 Trending Movies — This Week
export async function getTrendingMoviesWeek() {
  return tmdbFetch("/trending/movie/week");
}


// ⭐ Popular Movies
export async function getPopularMovies() {
  return tmdbFetch("/movie/popular");
}


// 🎬 Now Playing
export async function getNowPlayingMovies() {
  return tmdbFetch("/movie/now_playing");
}


// 🚀 Upcoming Movies
export async function getUpcomingMovies() {
  return tmdbFetch("/movie/upcoming");
}


// ⭐ Top Rated
export async function getTopRatedMovies() {
  return tmdbFetch("/movie/top_rated");
}


// 🔎 Search Movies
export async function searchMovies(query) {
  if (!query?.trim()) {
    return {
      results: [],
    };
  }

  const response = await fetch(
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(
      `TMDB Search Error: ${response.status}`
    );
  }

  return response.json();
}


// 🎬 Movie Details
export async function getMovieDetails(movieId) {
  return tmdbFetch(
    `/movie/${movieId}`
  );
}


// 🎬 Movie Trailer / Videos
export async function getMovieVideos(movieId) {
  return tmdbFetch(
    `/movie/${movieId}/videos`
  );
}


// 🎭 Movie Credits
export async function getMovieCredits(movieId) {
  return tmdbFetch(
    `/movie/${movieId}/credits`
  );
}


// ⭐ Similar Movies
export async function getSimilarMovies(movieId) {
  return tmdbFetch(
    `/movie/${movieId}/similar`
  );
}


// 🖼️ Poster URL
export function getPosterUrl(
  posterPath,
  size = "w500"
) {
  if (!posterPath) {
    return "/placeholder-movie.jpg";
  }

  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}


// 🖼️ Backdrop URL
export function getBackdropUrl(
  backdropPath,
  size = "original"
) {
  if (!backdropPath) {
    return "";
  }

  return `https://image.tmdb.org/t/p/${size}${backdropPath}`;
}