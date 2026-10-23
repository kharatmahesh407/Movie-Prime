import { useEffect, useRef, useState } from "react";

import TMDBMovieCard from "./TMDBMovieCard";

import {
  getTrendingMovies,
} from "../services/tmdb";

function TrendingMovies({
  favorites,
  addFavorite,
  removeFavorite,
}) {
  const sliderRef = useRef(null);

  const [tmdbMovies, setTmdbMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrendingMovies() {
      try {
        const data = await getTrendingMovies();

        setTmdbMovies(
          data.results?.slice(0, 10) || []
        );
      } catch (error) {
        console.error(
          "TMDB Trending Movies Error:",
          error
        );

        setTmdbMovies([]);
      } finally {
        setLoading(false);
      }
    }

    loadTrendingMovies();
  }, []);

  function scrollSlider(direction) {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction * 700,
      behavior: "smooth",
    });
  }

  return (
    <section className="trending-section">

      {/* HEADER */}

      <div className="trending-header">

        <div>

          <span className="trending-label">
            TRENDING
          </span>

          <h2>
            🔥 Trending Now
          </h2>

        </div>


        {/* CONTROLS */}

        <div className="trending-controls">

          <button
            type="button"
            onClick={() => scrollSlider(-1)}
            aria-label="Previous trending movies"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scrollSlider(1)}
            aria-label="Next trending movies"
          >
            →
          </button>

        </div>

      </div>


      {/* LOADING */}

      {loading && (
        <div className="trending-loading">
          Loading trending movies...
        </div>
      )}


      {/* NO MOVIES */}

      {!loading &&
        tmdbMovies.length === 0 && (
          <div className="trending-loading">
            No trending movies found.
          </div>
        )}


      {/* MOVIES */}

      <div
        className="trending-slider"
        ref={sliderRef}
      >

        {tmdbMovies.map(
          (movie, index) => (

            <div
              className="trending-card-wrapper"
              key={movie.id}
            >

              {/* NUMBER */}

              <div className="trending-number">
                {index + 1}
              </div>


              {/* MOVIE CARD */}

              <TMDBMovieCard
                movie={movie}
                favorites={favorites}
                addFavorite={addFavorite}
                removeFavorite={removeFavorite}
              />

            </div>

          )
        )}

      </div>

    </section>
  );
}

export default TrendingMovies;