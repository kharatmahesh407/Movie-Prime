import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TrailerModal from "./TrailerModal";
import {
  getMovieDetails,
  getPosterUrl,
} from "../services/tmdb";

function MovieCard({
  movie,
  favorites = [],
  addFavorite,
  removeFavorite,
}) {
  const [showTrailer, setShowTrailer] = useState(false);
  const [poster, setPoster] = useState(movie.image || "");

  const isFavorite = favorites.some(
    (item) => item.id === movie.id
  );

  // =========================================
  // LOAD ORIGINAL TMDB POSTER
  // =========================================

  useEffect(() => {
    let mounted = true;

    async function loadPoster() {
      // जर TMDB ID असेल तर TMDB वरून original poster आण
      if (movie.tmdbId) {
        try {
          const data = await getMovieDetails(movie.tmdbId);

          if (mounted && data.poster_path) {
            setPoster(
              getPosterUrl(data.poster_path, "w500")
            );
          }
        } catch (error) {
          console.error(
            "Movie Poster Error:",
            error
          );
        }
      }
    }

    loadPoster();

    return () => {
      mounted = false;
    };
  }, [movie.tmdbId]);

  // =========================================
  // FAVORITE
  // =========================================

  function handleFavorite() {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  }

  // =========================================
  // RECENTLY WATCHED
  // =========================================

  function handleWatch() {
    try {
      const saved =
        localStorage.getItem(
          "recentlyWatching"
        );

      let recentlyWatching = [];

      if (saved) {
        recentlyWatching = JSON.parse(saved);

        if (!Array.isArray(recentlyWatching)) {
          recentlyWatching = [];
        }
      }

      recentlyWatching =
        recentlyWatching.filter(
          (item) => item.id !== movie.id
        );

      recentlyWatching.unshift(movie);

      recentlyWatching =
        recentlyWatching.slice(0, 10);

      localStorage.setItem(
        "recentlyWatching",
        JSON.stringify(
          recentlyWatching
        )
      );
    } catch (error) {
      console.error(
        "Recently Watching Error:",
        error
      );
    }
  }

  return (
    <article className="movie-card">

      {/* =========================================
          POSTER
      ========================================= */}

      <div className="movie-poster">

        <img
          src={
            poster ||
            "/placeholder-movie.jpg"
          }
          alt={`${movie.title} poster`}
          loading="lazy"
        />

        {/* HOVER FAVORITE */}

        <div className="movie-hover-overlay">

          <button
            type="button"
            className={
              isFavorite
                ? "quick-favorite active"
                : "quick-favorite"
            }
            onClick={handleFavorite}
            aria-label={
              isFavorite
                ? "Remove from favorites"
                : "Add to favorites"
            }
          >
            {isFavorite
              ? "❤️"
              : "🤍"}
          </button>

        </div>

        {/* RATING */}

        <div className="movie-rating-badge">
          ⭐ {movie.rating}
        </div>

      </div>

      {/* =========================================
          MOVIE INFORMATION
      ========================================= */}

      <div className="movie-info">

        <h2>
          {movie.title}
        </h2>

        {/* YEAR + GENRE */}

        <div className="movie-details-row">

          <span>
            📅 {movie.year}
          </span>

          <span>
            🎭 {movie.genre}
          </span>

        </div>

        {/* =========================================
            TRAILER
        ========================================= */}

        <button
          type="button"
          className="trailer-button"
          onClick={() =>
            setShowTrailer(true)
          }
        >
          🎬 Watch Trailer
        </button>

        {/* =========================================
            WATCH / DETAILS
        ========================================= */}

        <Link
          to={`/movie/${movie.id}`}
          className="details-button"
          onClick={handleWatch}
        >
          ▶ Watch / Details
        </Link>

        {/* =========================================
            FAVORITE
        ========================================= */}

        <button
          type="button"
          className={
            isFavorite
              ? "favorite-button active"
              : "favorite-button"
          }
          onClick={handleFavorite}
        >
          {isFavorite
            ? "❤️ Favorited"
            : "🤍 Add Favorite"}
        </button>

      </div>

      {/* =========================================
          TRAILER MODAL
      ========================================= */}

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

export default MovieCard;