import { useEffect, useRef, useState } from "react";
import TMDBMovieCard from "./TMDBMovieCard";

import {
  getPopularMovies,
} from "../services/tmdb";

function PopularMovies({
  favorites,
  addFavorite,
  removeFavorite,
}) {
  const sliderRef = useRef(null);

  const [popularMovies, setPopularMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadPopularMovies() {
      try {
        const data = await getPopularMovies();

        setPopularMovies(
          data.results?.slice(0, 10) || []
        );
      } catch (error) {
        console.error(
          "TMDB Popular Movies Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadPopularMovies();
  }, []);

  function scrollSlider(direction) {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction * 650,
      behavior: "smooth",
    });
  }

  return (
    <section className="movie-section">

      {/* HEADER */}

      <div className="trending-header">

        <div>

          <span className="trending-label">
            POPULAR
          </span>

          <h2>
            ⭐ Popular Movies
          </h2>

        </div>


        {/* CONTROLS */}

        <div className="trending-controls">

          <button
            type="button"
            onClick={() => scrollSlider(-1)}
            aria-label="Previous popular movies"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scrollSlider(1)}
            aria-label="Next popular movies"
          >
            →
          </button>

        </div>

      </div>


      {/* LOADING */}

      {loading && (
        <div className="trending-loading">
          Loading popular movies...
        </div>
      )}


      {/* MOVIES */}

      <div
        className="trending-slider"
        ref={sliderRef}
      >

        {popularMovies.map(
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

export default PopularMovies;