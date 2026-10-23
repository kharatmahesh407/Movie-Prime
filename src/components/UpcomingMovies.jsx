import { useEffect, useRef, useState } from "react";

import TMDBMovieCard from "./TMDBMovieCard";

import {
  getUpcomingMovies,
} from "../services/tmdb";

function UpcomingMovies() {
  const sliderRef = useRef(null);

  const [upcomingMovies, setUpcomingMovies] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUpcomingMovies() {
      try {
        const data =
          await getUpcomingMovies();

        setUpcomingMovies(
          data.results?.slice(0, 10) || []
        );
      } catch (error) {
        console.error(
          "TMDB Upcoming Movies Error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadUpcomingMovies();
  }, []);

  function scrollSlider(direction) {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction * 700,
      behavior: "smooth",
    });
  }

  return (
    <section className="upcoming-section">

      {/* HEADER */}

      <div className="trending-header">

        <div>

          <span className="trending-label">
            UPCOMING
          </span>

          <h2>
            🚀 Upcoming Movies
          </h2>

        </div>


        {/* CONTROLS */}

        <div className="trending-controls">

          <button
            type="button"
            onClick={() => scrollSlider(-1)}
            aria-label="Previous upcoming movies"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scrollSlider(1)}
            aria-label="Next upcoming movies"
          >
            →
          </button>

        </div>

      </div>


      {/* LOADING */}

      {loading && (
        <div className="trending-loading">
          Loading upcoming movies...
        </div>
      )}


      {/* NO MOVIES */}

      {!loading &&
        upcomingMovies.length === 0 && (
          <div className="trending-loading">
            No upcoming movies found.
          </div>
        )}


      {/* MOVIES */}

      <div
        className="trending-slider"
        ref={sliderRef}
      >

        {upcomingMovies.map(
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

export default UpcomingMovies;