import { useState } from "react";
import { Link } from "react-router-dom";

import TrailerModal from "./TrailerModal";

import { getPosterUrl } from "../services/tmdb";

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Love",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function TMDBMovieCard({
  movie,
  favorites = [],
  addFavorite,
  removeFavorite,
}) {
  const [showTrailer, setShowTrailer] =
    useState(false);

  const year = movie.release_date
    ? new Date(
        movie.release_date
      ).getFullYear()
    : "N/A";

  let genre = "Movie";

  if (
    movie.genre_names &&
    movie.genre_names.length > 0
  ) {
    genre = movie.genre_names[0];
  } else if (
    movie.genre_ids &&
    movie.genre_ids.length > 0
  ) {
    genre =
      genreMap[movie.genre_ids[0]] ||
      "Movie";
  }

  const isFavorite = favorites.some(
    (item) => item.id === movie.id
  );

  const favoriteMovie = {
    id: movie.id,
    title: movie.title,
    image: getPosterUrl(
      movie.poster_path
    ),
    year: year,
    genre: genre,
    rating: Number(
      movie.vote_average || 0
    ).toFixed(1),
  };

  function handleFavorite() {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(favoriteMovie);
    }
  }

  return (
    <article className="tmdb-movie-card">

      {/* POSTER */}

      <div className="tmdb-movie-poster">

        <img
          src={getPosterUrl(
            movie.poster_path
          )}
          alt={`${movie.title} poster`}
          loading="lazy"
        />

        <div className="tmdb-rating">
          ⭐{" "}
          {Number(
            movie.vote_average || 0
          ).toFixed(1)}
        </div>

      </div>


      {/* INFO */}

      <div className="tmdb-movie-info">

        <h3>
          {movie.title}
        </h3>


        {/* YEAR + CATEGORY */}

        <div className="tmdb-movie-meta">

          <span>
            📅 {year}
          </span>

          <span>
            🎭 {genre}
          </span>

        </div>


        {/* ACTIONS */}

        <div className="tmdb-card-actions">

          {/* WATCH TRAILER */}

          <button
            type="button"
            className="tmdb-trailer-button"
            onClick={() =>
              setShowTrailer(true)
            }
          >
            🎬 Watch Trailer
          </button>


          {/* WATCH */}

          <Link
            to={`/movie/${movie.id}`}
            className="tmdb-watch-button"
          >
            ▶ Watch / Details
          </Link>


          {/* FAVORITE */}

          <button
            type="button"
            className={
              isFavorite
                ? "tmdb-favorite-button active"
                : "tmdb-favorite-button"
            }
            onClick={handleFavorite}
          >
            {isFavorite
              ? "❤️ Favorited"
              : "🤍 Add Favorite"}
          </button>

        </div>

      </div>


      {/* TRAILER MODAL */}

      {showTrailer && (
        <TrailerModal
          movie={movie}
          onClose={() =>
            setShowTrailer(false)
          }
        />
      )}

    </article>
  );
}

export default TMDBMovieCard;