import { Link, useNavigate } from "react-router-dom";


function Navbar({
  search,
  setSearch,
  user,
  logout,
  theme,
  toggleTheme,
  onProfileClick,
}) {

  const navigate = useNavigate();


  // =========================================
  // LOGOUT
  // =========================================

  function handleLogout() {

    logout();

    navigate("/");

  }


  // =========================================
  // PROFILE SELECTION
  // =========================================

  function handleProfileClick() {

    if (onProfileClick) {
      onProfileClick();
      return;
    }

    navigate("/profiles");

  }


  return (

    <nav className="navbar">

      {/* =========================
          LOGO
      ========================= */}

      <div className="logo">

        🎬 Movie Explorer

      </div>


      {/* =========================
          NAVIGATION LINKS
      ========================= */}

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/">
          Movies
        </Link>

        <Link to="/favorites">
          ❤️ Favorites
        </Link>

        <Link to="/premium">
          👑 Premium
        </Link>

      </div>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search movies, actors, genres..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          aria-label="Search movies"
        />

        <button
          type="button"
          aria-label="Search"
        >
          🔍
        </button>

      </div>


      {/* =========================
          AUTH
      ========================= */}

      <div className="auth-nav">


        {/* =========================
            THEME BUTTON
        ========================= */}

        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle dark and light mode"
          title={
            theme === "dark"
              ? "Switch to Light Mode"
              : "Switch to Dark Mode"
          }
        >

          {theme === "dark"
            ? "☀️"
            : "🌙"}

        </button>


        {/* =========================
            USER
        ========================= */}

        {user ? (

          <>

            {/* =========================
                PROFILE SWITCH
            ========================= */}

            <button
              type="button"
              className="navbar-profile-button"
              onClick={handleProfileClick}
              title="Switch Profile"
              aria-label="Switch Profile"
            >

              👤

              <span>
                {user.name || "User"}
              </span>

            </button>


            {/* =========================
                LOGOUT
            ========================= */}

            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
            >

              Logout

            </button>

          </>

        ) : (

          <>

            <Link
              to="/login"
              className="login-button"
            >
              Login
            </Link>


            <Link
              to="/signup"
              className="signup-button"
            >
              Signup
            </Link>

          </>

        )}

      </div>

    </nav>

  );
}


export default Navbar;