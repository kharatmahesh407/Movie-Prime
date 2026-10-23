import { useEffect, useRef, useState } from "react";

import TMDBMovieCard from "./TMDBMovieCard";

import {
  getTopRatedMovies,
} from "../services/tmdb";

function TopRatedMovies() {
  const sliderRef = useRef(null);

  const [topRatedMovies, setTopRatedMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadTopRatedMovies() {
      try {
        const data =
          await getTopRatedMovies();

        setTopRatedMovies(
          data.results?.slice(0, 10) || []
        );
      } catch (error) {
        console.error(
          "TMDB Top Rated Movies Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadTopRatedMovies();
  }, []);

  function scrollSlider(direction) {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction * 700,
      behavior: "smooth",
    });
  }

  return (
    <section className="top-rated-section">

      {/* HEADER */}

      <div className="trending-header">

        <div>

          <span className="trending-label">
            TOP RATED
          </span>

          <h2>
            🏆 Top Rated Movies
          </h2>

        </div>


        {/* CONTROLS */}

        <div className="trending-controls">

          <button
            type="button"
            onClick={() => scrollSlider(-1)}
            aria-label="Previous top rated movies"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scrollSlider(1)}
            aria-label="Next top rated movies"
          >
            →
          </button>

        </div>

      </div>


      {/* LOADING */}

      {loading && (
        <div className="trending-loading">
          Loading top rated movies...
        </div>
      )}


      {/* NO MOVIES */}

      {!loading &&
        topRatedMovies.length === 0 && (
          <div className="trending-loading">
            No top rated movies found.
          </div>
        )}


      {/* MOVIES */}

      <div
        className="trending-slider"
        ref={sliderRef}
      >

        {topRatedMovies.map(
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
              />

            </div>

          )
        )}

      </div>

    </section>
  );
}

export default TopRatedMovies;