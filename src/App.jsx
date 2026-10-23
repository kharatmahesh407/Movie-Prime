import { useState, useEffect } from "react";

import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Premium from "./pages/Premium";
import ProfileSelection from "./pages/ProfileSelection";
import BackButton from "./components/BackButton";
import Hero from "./components/Hero";
import TrendingMovies from "./components/TrendingMovies";
import PopularMovies from "./components/PopularMovies";
import TopRatedMovies from "./components/TopRatedMovies";
import UpcomingMovies from "./components/UpcomingMovies";

import movies from "./data/movies";


// =========================================
// PROTECTED ROUTE
// =========================================

function ProtectedRoute({
  user,
  children,
}) {
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }

  return children;
}


// =========================================
// PROFILE PROTECTED ROUTE
// =========================================

function ProfileProtectedRoute({
  user,
  selectedProfile,
  children,
}) {
  const location = useLocation();

  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
        }}
        replace
      />
    );
  }

  if (!selectedProfile) {
    return (
      <Navigate
        to="/profiles"
        replace
      />
    );
  }

  return children;
}


// =========================================
// MOVIE SECTION
// =========================================

function MovieSection({
  title,
  moviesList,
  favorites,
  addFavorite,
  removeFavorite,
}) {
  if (!moviesList || moviesList.length === 0) {
    return null;
  }

  return (
    <section className="movie-section">

      <div className="movie-section-header">

        <h2>
          {title}
        </h2>

        <span className="movie-section-count">
          {moviesList.length} movies
        </span>

      </div>


      <div className="movie-row">

        {moviesList.map((movie) => (

          <MovieCard
            key={movie.id}
            movie={movie}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />

        ))}

      </div>

    </section>
  );
}


// =========================================
// HOME
// =========================================

function Home({
  favorites,
  addFavorite,
  removeFavorite,
  search,
  setSearch,
  selectedProfile,
}) {

  const [genre, setGenre] =
    useState("All");

  const [
    recentlyWatching,
    setRecentlyWatching,
  ] = useState([]);


  // =========================================
  // IS KIDS PROFILE?
  // =========================================

  const isKidsProfile =
    selectedProfile?.kids === true;


  // =========================================
  // LOAD RECENTLY WATCHING
  // =========================================

  useEffect(() => {

    function loadRecentlyWatching() {

      try {

        const saved =
          localStorage.getItem(
            "recentlyWatching"
          );

        if (!saved) {

          setRecentlyWatching([]);

          return;
        }

        const parsed =
          JSON.parse(saved);

        if (Array.isArray(parsed)) {

          setRecentlyWatching(
            parsed
          );

        } else {

          setRecentlyWatching([]);

        }

      } catch (error) {

        console.error(
          "Recently Watching Load Error:",
          error
        );

        setRecentlyWatching([]);

      }
    }


    loadRecentlyWatching();


    window.addEventListener(
      "storage",
      loadRecentlyWatching
    );

    window.addEventListener(
      "focus",
      loadRecentlyWatching
    );


    return () => {

      window.removeEventListener(
        "storage",
        loadRecentlyWatching
      );

      window.removeEventListener(
        "focus",
        loadRecentlyWatching
      );

    };

  }, []);


  // =========================================
  // KIDS MOVIES
  // =========================================

  const kidsMovies =
    movies.filter((movie) => {

      const genreName =
        movie.genre
          ?.toLowerCase()
          .trim();

      return (
        genreName === "kids" ||
        genreName === "animation" ||
        genreName === "cartoon" ||
        genreName === "family"
      );

    });


  // =========================================
  // MOVIES AVAILABLE FOR CURRENT PROFILE
  // =========================================

  const profileMovies =
    isKidsProfile
      ? kidsMovies
      : movies;


  // =========================================
  // SEARCH FILTER
  // =========================================

  const searchedMovies =
    profileMovies.filter((movie) => {

      const searchText =
        search.trim().toLowerCase();


      if (!searchText) {
        return true;
      }


      return (
        movie.title
          ?.toLowerCase()
          .includes(searchText)
        ||
        movie.genre
          ?.toLowerCase()
          .includes(searchText)
      );

    });


  // =========================================
  // GENRE FILTER
  // =========================================

  const filteredMovies =
    searchedMovies.filter((movie) => {

      return (
        genre === "All" ||
        movie.genre === genre
      );

    });


  // =========================================
  // NORMAL PROFILE SECTIONS
  // =========================================

  const loveMovies =
    searchedMovies.filter(
      (movie) =>
        movie.genre === "Love" ||
        movie.genre === "Romance"
    );


  const actionMovies =
    searchedMovies.filter(
      (movie) =>
        movie.genre === "Action"
    );


  const thrillerMovies =
    searchedMovies.filter(
      (movie) =>
        movie.genre === "Thriller"
    );


  const sciFiMovies =
    searchedMovies.filter(
      (movie) =>
        movie.genre === "Sci-Fi"
    );


  const comedyMovies =
    searchedMovies.filter(
      (movie) =>
        movie.genre === "Comedy"
    );


  // =========================================
  // ALL MOVIES
  // =========================================

  const showAllMovies =
    genre === "All" &&
    search.trim() === "";


  // =========================================
  // HOME UI
  // =========================================

  return (

    <div className="home-page">

      <main>

        {/* =====================================
            HERO
        ===================================== */}

        <Hero
          favorites={favorites}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          selectedProfile={selectedProfile}
        />


        {/* =====================================
            NORMAL PROFILE TMDB SECTIONS
        ===================================== */}

        {!isKidsProfile && (

          <>

            <TrendingMovies
              favorites={
                favorites
              }
              addFavorite={
                addFavorite
              }
              removeFavorite={
                removeFavorite
              }
            />


            <PopularMovies
              favorites={
                favorites
              }
              addFavorite={
                addFavorite
              }
              removeFavorite={
                removeFavorite
              }
            />


            <TopRatedMovies
              favorites={
                favorites
              }
              addFavorite={
                addFavorite
              }
              removeFavorite={
                removeFavorite
              }
            />


            <UpcomingMovies
              favorites={
                favorites
              }
              addFavorite={
                addFavorite
              }
              removeFavorite={
                removeFavorite
              }
            />

          </>

        )}


        {/* =====================================
            HOME HEADING
        ===================================== */}

        <div className="home-heading">

          <h1>

            {isKidsProfile
              ? "🧸 Kids Movies"
              : "Discover Movies 🎬"}

          </h1>


          <p>

            {isKidsProfile
              ? "Fun movies and cartoons for kids."
              : "Find your next favorite movie."}

          </p>

        </div>


        {/* =====================================
            KIDS PROFILE
        ===================================== */}

        {isKidsProfile ? (

          <>

            {/* KIDS SEARCH */}

            {search.trim() ? (

              <section className="movie-section">

                <div className="movie-section-header">

                  <h2>
                    🔎 Kids Search Results
                  </h2>

                  <span className="movie-section-count">
                    {searchedMovies.length} movies
                  </span>

                </div>


                {searchedMovies.length === 0 ? (

                  <p className="no-results">
                    No kids movies found 😔
                  </p>

                ) : (

                  <div className="movie-row">

                    {searchedMovies.map(
                      (movie) => (

                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          favorites={
                            favorites
                          }
                          addFavorite={
                            addFavorite
                          }
                          removeFavorite={
                            removeFavorite
                          }
                        />

                      )
                    )}

                  </div>

                )}

              </section>

            ) : (

              <MovieSection
                title="🧸 Kids & Cartoons"
                moviesList={
                  kidsMovies
                }
                favorites={
                  favorites
                }
                addFavorite={
                  addFavorite
                }
                removeFavorite={
                  removeFavorite
                }
              />

            )}


            {/* NO KIDS MOVIES */}

            {kidsMovies.length === 0 && (
              <p className="no-results">
                No kids movies available yet 🧸
              </p>
            )}

          </>

        ) : (

          /* =====================================
             NORMAL PROFILE
          ===================================== */

          <>

            {/* =====================================
                GENRE FILTER
            ===================================== */}

            <div className="genre-filter">

              <button
                type="button"
                className={
                  genre === "All"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setGenre("All")
                }
              >
                All
              </button>


              <button
                type="button"
                className={
                  genre === "Love"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setGenre("Love")
                }
              >
                ❤️ Love
              </button>


              <button
                type="button"
                className={
                  genre === "Action"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setGenre("Action")
                }
              >
                🔥 Action
              </button>


              <button
                type="button"
                className={
                  genre === "Thriller"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setGenre("Thriller")
                }
              >
                😱 Thriller
              </button>


              <button
                type="button"
                className={
                  genre === "Sci-Fi"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setGenre("Sci-Fi")
                }
              >
                🚀 Sci-Fi
              </button>

            </div>


            {/* =====================================
                SEARCH / FILTER RESULT
            ===================================== */}

            {!showAllMovies ? (

              <section className="movie-section">

                <div className="movie-section-header">

                  <h2>

                    {search.trim()
                      ? "Search Results"
                      : `${genre} Movies`}

                  </h2>


                  <span className="movie-section-count">

                    {filteredMovies.length}
                    {" "}
                    movies

                  </span>

                </div>


                {filteredMovies.length === 0 ? (

                  <p className="no-results">
                    No movies found 😔
                  </p>

                ) : (

                  <div className="movie-row">

                    {filteredMovies.map(
                      (movie) => (

                        <MovieCard
                          key={
                            movie.id
                          }
                          movie={
                            movie
                          }
                          favorites={
                            favorites
                          }
                          addFavorite={
                            addFavorite
                          }
                          removeFavorite={
                            removeFavorite
                          }
                        />

                      )
                    )}

                  </div>

                )}

              </section>

            ) : (

              <>

                {/* =====================================
                    RECENTLY WATCHING
                ===================================== */}

                <MovieSection
                  title="👀 Recently Watching"
                  moviesList={
                    recentlyWatching
                  }
                  favorites={
                    favorites
                  }
                  addFavorite={
                    addFavorite
                  }
                  removeFavorite={
                    removeFavorite
                  }
                />


                {/* =====================================
                    LOVE
                ===================================== */}

                <MovieSection
                  title="❤️ Love Movies"
                  moviesList={
                    loveMovies
                  }
                  favorites={
                    favorites
                  }
                  addFavorite={
                    addFavorite
                  }
                  removeFavorite={
                    removeFavorite
                  }
                />


                {/* =====================================
                    ACTION
                ===================================== */}

                <MovieSection
                  title="🔥 Action Movies"
                  moviesList={
                    actionMovies
                  }
                  favorites={
                    favorites
                  }
                  addFavorite={
                    addFavorite
                  }
                  removeFavorite={
                    removeFavorite
                  }
                />


                {/* =====================================
                    THRILLER
                ===================================== */}

                <MovieSection
                  title="😱 Thriller Movies"
                  moviesList={
                    thrillerMovies
                  }
                  favorites={
                    favorites
                  }
                  addFavorite={
                    addFavorite
                  }
                  removeFavorite={
                    removeFavorite
                  }
                />


                {/* =====================================
                    SCI-FI
                ===================================== */}

                <MovieSection
                  title="🚀 Sci-Fi Movies"
                  moviesList={
                    sciFiMovies
                  }
                  favorites={
                    favorites
                  }
                  addFavorite={
                    addFavorite
                  }
                  removeFavorite={
                    removeFavorite
                  }
                />


                {/* =====================================
                    COMEDY
                ===================================== */}

                <MovieSection
                  title="😂 Comedy Movies"
                  moviesList={
                    comedyMovies
                  }
                  favorites={
                    favorites
                  }
                  addFavorite={
                    addFavorite
                  }
                  removeFavorite={
                    removeFavorite
                  }
                />


                {/* =====================================
                    ALL MOVIES
                ===================================== */}

                <MovieSection
                  title="🎬 All Movies"
                  moviesList={
                    movies
                  }
                  favorites={
                    favorites
                  }
                  addFavorite={
                    addFavorite
                  }
                  removeFavorite={
                    removeFavorite
                  }
                />

              </>

            )}

          </>

        )}

      </main>

    </div>
  );
}


// =========================================
// APP
// =========================================

function App() {

  const navigate =
    useNavigate();


  // =========================================
  // SEARCH
  // =========================================

  const [search, setSearch] =
    useState("");


  // =========================================
  // THEME
  // =========================================

  const [theme, setTheme] =
    useState(() => {

      return (
        localStorage.getItem(
          "theme"
        ) || "dark"
      );

    });


  // =========================================
  // APPLY THEME
  // =========================================

  useEffect(() => {

    document.body.classList.remove(
      "dark-mode",
      "light-mode"
    );

    document.body.classList.add(
      `${theme}-mode`
    );

  }, [theme]);


  // =========================================
  // FAVORITES
  // =========================================

  const [favorites, setFavorites] =
    useState(() => {

      const savedFavorites =
        localStorage.getItem(
          "favorites"
        );

      if (!savedFavorites) {
        return [];
      }

      try {

        return JSON.parse(
          savedFavorites
        );

      } catch {

        return [];

      }

    });


  // =========================================
  // USER
  // =========================================

  const [user, setUser] =
    useState(() => {

      const savedUser =
        localStorage.getItem(
          "loggedInUser"
        );

      if (!savedUser) {
        return null;
      }

      try {

        return JSON.parse(
          savedUser
        );

      } catch {

        localStorage.removeItem(
          "loggedInUser"
        );

        localStorage.removeItem(
          "isLoggedIn"
        );

        return null;

      }

    });


  // =========================================
  // SELECTED PROFILE
  // =========================================

  const [
    selectedProfile,
    setSelectedProfile,
  ] = useState(() => {

    const savedProfile =
      localStorage.getItem(
        "selectedProfile"
      );

    if (!savedProfile) {
      return null;
    }

    try {

      return JSON.parse(
        savedProfile
      );

    } catch {

      localStorage.removeItem(
        "selectedProfile"
      );

      return null;

    }

  });


  // =========================================
  // LOGIN
  // =========================================

  function handleLogin(userData) {

    console.log(
      "LOGIN SUCCESS:",
      userData
    );

    setUser(userData);

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(
        userData
      )
    );

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );


    setSelectedProfile(
      null
    );

    localStorage.removeItem(
      "selectedProfile"
    );

  }


  // =========================================
  // PROFILE SELECT
  // =========================================

  function handleProfileSelect(
    profile
  ) {

    console.log(
      "PROFILE SELECTED:",
      profile
    );

    setSelectedProfile(
      profile
    );

    localStorage.setItem(
      "selectedProfile",
      JSON.stringify(
        profile
      )
    );

  }


  // =========================================
  // LOGOUT
  // =========================================

  function logout() {

    console.log(
      "LOGOUT"
    );

    setUser(null);

    setSelectedProfile(
      null
    );

    localStorage.removeItem(
      "loggedInUser"
    );

    localStorage.removeItem(
      "isLoggedIn"
    );

    localStorage.removeItem(
      "selectedProfile"
    );

  }


  // =========================================
  // ADD FAVORITE
  // =========================================

  function addFavorite(movie) {

    const alreadyFavorite =
      favorites.some(
        (item) =>
          item.id === movie.id
      );

    if (alreadyFavorite) {
      return;
    }

    const updatedFavorites = [
      ...favorites,
      movie,
    ];

    setFavorites(
      updatedFavorites
    );

    localStorage.setItem(
      "favorites",
      JSON.stringify(
        updatedFavorites
      )
    );

  }


  // =========================================
  // REMOVE FAVORITE
  // =========================================

  function removeFavorite(id) {

    const updatedFavorites =
      favorites.filter(
        (movie) =>
          movie.id !== id
      );

    setFavorites(
      updatedFavorites
    );

    localStorage.setItem(
      "favorites",
      JSON.stringify(
        updatedFavorites
      )
    );

  }


  // =========================================
  // TOGGLE THEME
  // =========================================

  function toggleTheme() {

    const newTheme =
      theme === "dark"
        ? "light"
        : "dark";

    setTheme(
      newTheme
    );

    localStorage.setItem(
      "theme",
      newTheme
    );

  }


  // =========================================
  // CURRENT LOCATION
  // =========================================

  const location =
    useLocation();


  // =========================================
  // HIDE NAVBAR + FOOTER
  // =========================================

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/profiles";


  // =========================================
  // APP UI
  // =========================================

  return (

    <div
      className={
        theme === "dark"
          ? "app dark-theme"
          : "app light-theme"
      }
    >

      {/* =====================================
          NAVBAR
      ===================================== */}

      {!hideLayout && (

        <>

          <Navbar
            search={
              search
            }
            setSearch={
              setSearch
            }
            user={
              user
            }
            logout={
              logout
            }
            theme={
              theme
            }
            toggleTheme={
              toggleTheme
            }
            onProfileClick={() =>
              navigate(
                "/profiles"
              )
            }
          />

          <BackButton />

        </>

      )}


      {/* =====================================
          ROUTES
      ===================================== */}

      <Routes>


        {/* ===================================
            HOME
        =================================== */}

        <Route
          path="/"
          element={

            <ProfileProtectedRoute
              user={
                user
              }
              selectedProfile={
                selectedProfile
              }
            >

              <Home
                favorites={
                  favorites
                }
                addFavorite={
                  addFavorite
                }
                removeFavorite={
                  removeFavorite
                }
                search={
                  search
                }
                setSearch={
                  setSearch
                }
                selectedProfile={
                  selectedProfile
                }
              />

            </ProfileProtectedRoute>

          }
        />


        {/* ===================================
            PROFILE SELECTION
        =================================== */}

        <Route
          path="/profiles"
          element={

            <ProtectedRoute
              user={
                user
              }
            >

              <ProfileSelection
                user={
                  user
                }
                onProfileSelect={
                  handleProfileSelect
                }
              />

            </ProtectedRoute>

          }
        />


        {/* ===================================
            MOVIE DETAILS
        =================================== */}

        <Route
          path="/movie/:id"
          element={

            <ProfileProtectedRoute
              user={
                user
              }
              selectedProfile={
                selectedProfile
              }
            >

              <MovieDetails
                addFavorite={
                  addFavorite
                }
              />

            </ProfileProtectedRoute>

          }
        />


        {/* ===================================
            FAVORITES
        =================================== */}

        <Route
          path="/favorites"
          element={

            <ProfileProtectedRoute
              user={
                user
              }
              selectedProfile={
                selectedProfile
              }
            >

              <Favorites
                favorites={
                  favorites
                }
                removeFavorite={
                  removeFavorite
                }
              />

            </ProfileProtectedRoute>

          }
        />


        {/* ===================================
            PREMIUM
        =================================== */}

        <Route
          path="/premium"
          element={

            <ProfileProtectedRoute
              user={
                user
              }
              selectedProfile={
                selectedProfile
              }
            >

              <Premium />

            </ProfileProtectedRoute>

          }
        />


        {/* ===================================
            LOGIN
        =================================== */}

        <Route
          path="/login"
          element={

            <Login
              onLogin={
                handleLogin
              }
            />

          }
        />


        {/* ===================================
            SIGNUP
        =================================== */}

        <Route
          path="/signup"
          element={

            <Signup
              onLogin={
                handleLogin
              }
            />

          }
        />


        {/* ===================================
            FORGOT PASSWORD
        =================================== */}

        <Route
          path="/forgot-password"
          element={
            <ForgotPassword />
          }
        />


        {/* ===================================
            RESET PASSWORD
        =================================== */}

        <Route
          path="/reset-password"
          element={
            <ResetPassword />
          }
        />


        {/* ===================================
            UNKNOWN ROUTE
        =================================== */}

        <Route
          path="*"
          element={

            <Navigate
              to="/"
              replace
            />

          }
        />

      </Routes>


      {/* =====================================
          FOOTER
      ===================================== */}

      {!hideLayout && (
        <Footer />
      )}

    </div>

  );
}


export default App;