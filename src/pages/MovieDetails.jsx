import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import movies from "../data/movies";
import TrailerModal from "../components/TrailerModal";

import {
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
  getPosterUrl,
} from "../services/tmdb";

function MovieDetails({ addFavorite }) {
  const { id } = useParams();

  const [tmdbMovie, setTmdbMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const [showTrailer, setShowTrailer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================
  // SCROLL TO TOP WHEN MOVIE PAGE OPENS
  // =========================================

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // =========================================
  // LOCAL MOVIE
  // =========================================

  const localMovie = movies.find(
    (item) => item.id === Number(id)
  );

  // =========================================
  // LOAD TMDB DETAILS
  // =========================================

  useEffect(() => {
    async function loadMovieDetails() {
      try {
        setLoading(true);
        setError("");

        const [details, credits, similar] =
          await Promise.all([
            getMovieDetails(id),
            getMovieCredits(id),
            getSimilarMovies(id),
          ]);

        setTmdbMovie(details);

        setCast(
          credits?.cast?.slice(0, 8) || []
        );

        setSimilarMovies(
          similar?.results?.slice(0, 10) || []
        );
      } catch (err) {
        console.error(
          "TMDB Movie Details Error:",
          err
        );

        setError(
          "Unable to load movie details."
        );
      } finally {
        setLoading(false);
      }
    }

    loadMovieDetails();
  }, [id]);

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <main className="movie-details">

        <div className="details-container">

          <div className="details-info">

            <h1>
              Loading movie... 🎬
            </h1>

            <p>
              Please wait while we load the movie
              details.
            </p>

          </div>

        </div>

      </main>
    );
  }

  // =========================================
  // ERROR / MOVIE NOT FOUND
  // =========================================

  if (error || !tmdbMovie) {
    return (
      <main className="movie-details">

        <div className="details-container">

          <div className="details-info">

            <h1>
              Movie not found 😔
            </h1>

            <p>
              {error ||
                "We could not find this movie."}
            </p>

            <Link
              to="/"
              className="details-button"
            >
              ← Back to Movies
            </Link>

          </div>

        </div>

      </main>
    );
  }

  // =========================================
  // MOVIE DATA
  // =========================================

  const poster = getPosterUrl(
    tmdbMovie.poster_path,
    "w500"
  );

  const releaseYear =
    tmdbMovie.release_date
      ? new Date(
          tmdbMovie.release_date
        ).getFullYear()
      : "N/A";

  const genres =
    tmdbMovie.genres
      ?.map((genre) => genre.name)
      .join(", ") || "N/A";

  // =========================================
  // FAVORITE MOVIE
  // =========================================

  const favoriteMovie = {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    image: poster,
    year: releaseYear,
    genre: genres,
    rating:
      tmdbMovie.vote_average?.toFixed(1) ||
      "N/A",
  };

  // =========================================
  // MOVIE DETAILS PAGE
  // =========================================

  return (
    <main className="movie-details">

      {/* =====================================
          BACK BUTTON
      ===================================== */}

      <Link
        to="/"
        className="back-link"
      >
        ← Back to Movies
      </Link>


      {/* =====================================
          MAIN DETAILS
      ===================================== */}

      <div className="details-container">

        {/* POSTER */}

        <div className="details-poster">

          <img
            src={poster}
            alt={`${tmdbMovie.title} poster`}
          />

        </div>


        {/* INFORMATION */}

        <div className="details-info">

          <span className="details-label">
            MOVIE DETAILS
          </span>


          <h1>
            {tmdbMovie.title}
          </h1>


          {/* META */}

          <div className="movie-meta">

            <span>
              📅 {releaseYear}
            </span>

            <span>
              🎭 {genres}
            </span>

            <span>
              ⭐{" "}
              {tmdbMovie.vote_average?.toFixed(1)}
            </span>

            {tmdbMovie.runtime && (
              <span>
                ⏱️ {tmdbMovie.runtime} min
              </span>
            )}

          </div>


          {/* DESCRIPTION */}

          <div className="details-description">

            <h3>
              About the Movie
            </h3>

            <p>
              {tmdbMovie.overview ||
                "No movie overview available."}
            </p>

          </div>


          {/* =====================================
              ACTION BUTTONS
          ===================================== */}

          <div className="details-actions">

            {/* WATCH TRAILER */}

            <button
              type="button"
              className="trailer-button"
              onClick={() =>
                setShowTrailer(true)
              }
            >
              🎬 Watch Trailer
            </button>


            {/* ADD FAVORITE */}

            <button
              type="button"
              className="details-favorite"
              onClick={() =>
                addFavorite(favoriteMovie)
              }
            >
              ❤️ Add to Favorites
            </button>


            {/* BROWSE MORE */}

            <Link
              to="/"
              className="details-button"
            >
              ← Browse More Movies
            </Link>

          </div>

        </div>

      </div>


      {/* =====================================
          TRAILER MODAL
      ===================================== */}

      {showTrailer && (
        <TrailerModal
          movie={{
            ...(localMovie || {}),
            ...favoriteMovie,
          }}
          onClose={() =>
            setShowTrailer(false)
          }
        />
      )}

             {/* =====================================
                  CAST
              ===================================== */}

              {cast.length > 0 && (
                <section className="movie-cast">

                  <div className="trending-header">

                    <div>
                      <span className="trending-label">
                        CAST
                      </span>

                      <h2>
                        🎭 Top Cast
                      </h2>
                    </div>

                  </div>

                  <div className="cast-slider">

                    {cast.map((person) => (

                      <div
                        className="cast-card"
                        key={person.id}
                      >

                        <div className="cast-image-wrapper">

                          <img
                            src={
                              person.profile_path
                                ? getPosterUrl(
                                    person.profile_path,
                                    "w500"
                                  )
                                : "/placeholder-movie.jpg"
                            }
                            alt={person.name}
                            loading="lazy"
                          />

                        </div>

                        <div className="cast-info">

                          <h3>
                            {person.name}
                          </h3>

                          <span>
                            {person.character || "Cast"}
                          </span>

                        </div>

                      </div>

                    ))}

                  </div>

                </section>
              )}

                {/* =====================================
                      SIMILAR MOVIES
                  ===================================== */}

                  {similarMovies.length > 0 && (
                    <section className="similar-movies">

                      <div className="trending-header">

                        <div>

                          <span className="trending-label">
                            YOU MAY ALSO LIKE
                          </span>

                          <h2>
                            🎬 Similar Movies
                          </h2>

                        </div>

                      </div>

                      <div className="similar-movies-slider">

                        {similarMovies.map((movie) => (

                          <Link
                            to={`/movie/${movie.id}`}
                            className="similar-movie-card"
                            key={movie.id}
                          >

                            <div className="similar-movie-poster">

                              <img
                                src={getPosterUrl(
                                  movie.poster_path,
                                  "w500"
                                )}
                                alt={`${movie.title} poster`}
                                loading="lazy"
                              />

                            </div>

                            <div className="similar-movie-info">

                              <h3>
                                {movie.title}
                              </h3>

                              <span>
                                ⭐{" "}
                                {Number(
                                  movie.vote_average || 0
                                ).toFixed(1)}
                              </span>

                            </div>

                          </Link>

                        ))}

                      </div>

                    </section>
                  )}

    </main>
  );
}

export default MovieDetails;