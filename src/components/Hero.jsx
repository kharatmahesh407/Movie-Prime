import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Hero.css";


// =========================================
// NORMAL HERO MOVIES
// =========================================

const normalHeroMovies = [
  {
    id: 157336,
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi",
    rating: "8.7",
    description:
      "A journey beyond space and time to find a new home for humanity.",
    image:
      "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  },

  {
    id: 19995,
    title: "Avatar",
    year: "2009",
    genre: "Sci-Fi",
    rating: "7.9",
    description:
      "Discover a breathtaking world beyond imagination.",
    image:
      "https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg",
  },

  {
    id: 245891,
    title: "John Wick",
    year: "2014",
    genre: "Action",
    rating: "7.4",
    description:
      "An unstoppable action legend returns for one more fight.",
    image:
      "https://image.tmdb.org/t/p/original/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg",
  },
];


// =========================================
// KIDS HERO MOVIES
// =========================================

const kidsHeroMovies = [
  {
    id: 862,
    title: "Toy Story",
    year: "1995",
    genre: "Kids",
    rating: "8.3",
    description:
      "A fun-filled adventure where toys come alive when humans are away.",
    image:
      "https://image.tmdb.org/t/p/original/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
  },

  {
    id: 12,
    title: "Finding Nemo",
    year: "2003",
    genre: "Kids",
    rating: "8.2",
    description:
      "Join Nemo and his friends on an exciting underwater adventure.",
    image:
      "https://image.tmdb.org/t/p/original/eHuGQ10FUzK1mdOY69wF5pGgEf5.jpg",
  },

  {
    id: 8587,
    title: "The Lion King",
    year: "1994",
    genre: "Kids",
    rating: "8.5",
    description:
      "Experience an unforgettable animated adventure in the Pride Lands.",
    image:
      "https://image.tmdb.org/t/p/original/2e853FDVSIso600RqAMunPxiZjq.jpg",
  },

  {
    id: 109445,
    title: "Frozen",
    year: "2013",
    genre: "Kids",
    rating: "7.4",
    description:
      "A magical adventure of friendship, family and an icy kingdom.",
    image:
      "https://image.tmdb.org/t/p/original/zaW0q6q8yVf8YzYf9nR5fKf6gYx.jpg",
  },

  {
    id: 277834,
    title: "Moana",
    year: "2016",
    genre: "Kids",
    rating: "7.6",
    description:
      "A brave young girl sails across the ocean on an incredible adventure.",
    image:
      "https://image.tmdb.org/t/p/original/9tzN8sPbyod2dsa0lwFhQ6hZ8yY.jpg",
  },

  {
    id: 9502,
    title: "Kung Fu Panda",
    year: "2008",
    genre: "Kids",
    rating: "7.6",
    description:
      "Po discovers that anyone can become a hero with courage and determination.",
    image:
      "https://image.tmdb.org/t/p/original/wWt4JYXTg5Wr3xBW2phBrMKgp3x.jpg",
  },
];


// =========================================
// HERO COMPONENT
// =========================================

function Hero({
  favorites = [],
  addFavorite,
  removeFavorite,
  selectedProfile,
}) {

  // Check Kids Profile
  const isKidsProfile =
    selectedProfile?.kids === true;


  // Select correct hero list
  const heroMovies =
    isKidsProfile
      ? kidsHeroMovies
      : normalHeroMovies;


  const [current, setCurrent] =
    useState(0);


  const navigate =
    useNavigate();


  // =========================================
  // RESET SLIDER WHEN PROFILE CHANGES
  // =========================================

  useEffect(() => {

    setCurrent(0);

  }, [isKidsProfile]);


  // =========================================
  // AUTO SLIDER
  // =========================================

  useEffect(() => {

    const timer =
      setInterval(() => {

        setCurrent(
          (prev) =>
            (prev + 1) %
            heroMovies.length
        );

      }, 5000);


    return () =>
      clearInterval(timer);

  }, [heroMovies.length]);


  const movie =
    heroMovies[current];


  // =========================================
  // FAVORITE CHECK
  // =========================================

  const isFavorite =
    favorites?.some(
      (item) =>
        item.id === movie.id
    );


  // =========================================
  // WATCH
  // =========================================

  function handleWatch() {

    navigate(
      `/movie/${movie.id}`
    );

  }


  // =========================================
  // FAVORITE
  // =========================================

  function handleFavorite() {

    if (isFavorite) {

      removeFavorite(
        movie.id
      );

    } else {

      addFavorite(
        movie
      );

    }

  }


  // =========================================
  // UI
  // =========================================

  return (

    <section
      className={
        isKidsProfile
          ? "premium-hero kids-hero"
          : "premium-hero"
      }
      style={{
        backgroundImage:
          `url("${movie.image}")`,
      }}
    >

      {/* =====================================
          DARK OVERLAY
      ===================================== */}

      <div
        className="premium-hero-overlay"
      ></div>


      {/* =====================================
          CONTENT
      ===================================== */}

      <div
        className="premium-hero-content"
      >

        <span
          className="premium-hero-label"
        >

          {isKidsProfile
            ? "🧸 KIDS FEATURED"
            : "FEATURED MOVIE"}

        </span>


        <h1>
          {movie.title}
        </h1>


        <div
          className="premium-hero-meta"
        >

          <span>
            {movie.year}
          </span>

          <span>
            ⭐ {movie.rating}
          </span>

          <span>
            {movie.genre}
          </span>

        </div>


        <p>
          {movie.description}
        </p>


        {/* =====================================
            BUTTONS
        ===================================== */}

        <div
          className="premium-hero-buttons"
        >

          <button
            type="button"
            className="hero-watch-btn"
            onClick={handleWatch}
          >
            ▶ Watch Now
          </button>


          <button
            type="button"
            className={
              isFavorite
                ? "hero-list-btn active"
                : "hero-list-btn"
            }
            onClick={
              handleFavorite
            }
          >

            {isFavorite
              ? "✓ My List"
              : "＋ My List"}

          </button>

        </div>

      </div>


      {/* =====================================
          SLIDER DOTS
      ===================================== */}

      <div
        className="premium-hero-dots"
      >

        {heroMovies.map(
          (item, index) => (

            <button
              type="button"
              key={item.id}
              aria-label={
                `Show ${item.title}`
              }
              className={
                index === current
                  ? "active"
                  : ""
              }
              onClick={() =>
                setCurrent(index)
              }
            />

          )
        )}

      </div>

    </section>

  );

}


export default Hero;